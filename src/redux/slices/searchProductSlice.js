import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for searching products
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async ({ limit = 5, cursor = null, search }, { rejectWithValue }) => {
    try {
      const query = `
        query ($first: Int!, $after: String, $query: String) {
          products(first: $first, after: $after, query: $query) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                title
                descriptionHtml
                description
                vendor
                handle
                productType
                options {
                  name
                  values
                }
                variants(first: 100) {
                  edges {
                    node {
                      id
                      priceV2 {
                        amount
                        currencyCode
                      }
                      compareAtPriceV2 {
                        amount
                        currencyCode
                      }
                      availableForSale
                      sku
                      quantityAvailable
                      selectedOptions {
                        name
                        value
                      }
                    }
                  }
                }
                images(first: 100) {
                  edges {
                    node {
                      id
                      url
                      altText
                    }
                  }
                }
                metafields(identifiers: [
                  {namespace: "shopify", key: "color-pattern"},
                  {namespace: "shopify", key: "age-group"},
                  {namespace: "shopify", key: "eyewear-frame-design"},
                  {namespace: "shopify", key: "target-gender"},
                  {namespace: "shopify", key: "fabric"},
                  {namespace: "shopify", key: "lens_polarization"},
                  {namespace: "custom", key: "express_delivery"},
                  {namespace: "custom", key: "free_delivery"},
                  {namespace: "custom", key: "brand"},
                  {namespace: "shopify", key: "lens-color"},
                  {namespace: "shopify", key: "temple-color"},
                  {namespace: "shopify", key: "eyewear-frame-color"},
                ]) {
                  namespace
                  key
                  value
                  type
                  description
                }
              }
            }
          }
        }
      `;

      const filters = [];

      // Only search filter
      if (search) {
        const searchQuery = `(${[
          `title:*${search}*`,
          `product_type:*${search}*`,
          `vendor:*${search}*`,
          `metafield:custom.brand:*${search}*`,
          `metafield:shopify.target-gender:*${search}*`
        ].join(" OR ")})`;
        filters.push(searchQuery);
      }

      const queryString = filters.length > 0 ? filters.join(" AND ") : null;

      const variables = {
        first: parseInt(limit),
        after: cursor,
        query: queryString
      };

      const response = await axios.post(
        process.env.REACT_APP_SHOPIFY_API_URL,
        { query, variables },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": process.env.REACT_APP_SHOPIFY_API_TOKEN,
          },
        }
      );

      const { products } = response.data.data;

      const processedProducts = products.edges.map((edge) => {
        const product = edge.node;
        const metafields = product.metafields
          ? product.metafields
              .filter((mf) => mf !== null)
              .map((mf) => ({
                key: mf.key,
                value: mf.value,
                namespace: mf.namespace,
                type: mf.type,
                description: mf.description,
              }))
          : [];

        return { ...product, metafields };
      });

      // Assuming MetaController is imported or defined elsewhere
      const metaAllProduct = await MetaController(processedProducts);

      return {
        products: metaAllProduct,
        pagination: {
          hasNextPage: products.pageInfo.hasNextPage,
          nextCursor: products.pageInfo.endCursor,
        },
        searchQuery: search,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
  pagination: {
    hasNextPage: false,
    nextCursor: null,
  },
  searchQuery: '',
};

const productSearchSlice = createSlice({
  name: 'productSearch',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.products = [];
      state.pagination = {
        hasNextPage: false,
        nextCursor: null,
      };
      state.searchQuery = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
        state.searchQuery = action.payload.searchQuery;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.products = [];
        state.pagination = {
          hasNextPage: false,
          nextCursor: null,
        };
      });
  },
});

export const { clearSearchResults } = productSearchSlice.actions;
export default productSearchSlice.reducer;