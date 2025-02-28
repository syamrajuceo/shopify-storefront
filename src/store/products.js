import axios from "axios";
import { shopifyClient } from "../config/shopifyClient";
import { MetaSingleController, Metacontroller } from "../utils/Metacontroller";
import useShopifyStore from "./useShopifyStore";

export const fetchAllProducts = async () => {
  const query = `
    query ($first: Int!, $after: String) {
      products(first: $first, after: $after) {
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

  let allProducts = [];
  let hasNextPage = true;
  let endCursor = null;

  try {
    while (hasNextPage) {
      const variables = {
        first: 250,
        after: endCursor,
      };

      const response = await shopifyClient.post("", { query, variables });
      const { products } = response.data.data;

      // Map and process the products
      const processedProducts = products.edges.map((edge) => {
        const product = edge.node;

        // Safely map metafields if they exist and are not null
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
        return {
          ...product,
          metafields,
        };
      });

      // Add the processed products to the allProducts array
      allProducts = [...allProducts, ...processedProducts];

      // Update pagination variables
      hasNextPage = products.pageInfo.hasNextPage;
      endCursor = products.pageInfo.endCursor;
    }

    // Process all products with Metacontroller
    const newProduct = await Metacontroller(allProducts);

    // Store products in Zustand
    useShopifyStore.getState().setProducts(newProduct);

    console.log("Products processed :", newProduct)

    return newProduct;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};

export const fetchProductByHandle = async (handle) => {
  try {
    const response = await fetch(
      "https://4bz4tg-qg.myshopify.com/api/2024-10/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            "aae77a75514b280e61a74cc7ee993635",
        },
        body: JSON.stringify({
          query: `
            query getProductVariants($handle: String!) {
              productByHandle(handle: $handle) {
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
                variants(first: 200) {
                  edges {
                    node {
                      id
                      title
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
                      image {
                        id
                        url
                        altText
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
                media(first: 10) {
                  edges {
                    node {
                      ... on Video {
                        id
                        sources {
                          url
                          format
                        }
                      }
                      ... on MediaImage {
                        id
                        image {
                          url
                          altText
                        }
                      }
                      ... on ExternalVideo {
                        id
                        embedUrl
                        host
                      }
                      ... on Model3d {
                        id
                        alt
                        sources {
                          url
                        }
                      }
                    }
                  }
                }
                metafields(identifiers: [
                  {namespace: "custom", key: "express_delivery"},
                  {namespace: "custom", key: "free_delivery"}
                  {namespace: "custom", key: "warranty_service"}
                  {namespace: "custom", key: "uv_filter"}
                  {namespace: "custom", key: "shipping_to"}
                  {namespace: "custom", key: "lens_effect"}
                  {namespace: "custom", key: "brand"}
                  {namespace: "custom", key: "manufacturer"}
                  {namespace: "custom", key: "upc_barcode_"}
                  {namespace: "custom", key: "frame_size"}
                  {namespace: "custom", key: "lens_replacement"}
                  {namespace: "custom", key: "lens_type"}
                  {namespace: "custom", key: "pack_size"}
                  {namespace: "custom", key: "base_curve"}
                  {namespace: "custom", key: "diameter"}
                  {namespace: "custom", key: "volume"}
                  {namespace: "custom", key: "oxygen_permeability"}
                  {namespace: "custom", key: "water_content"}
                  {namespace: "custom", key: "power_range"}
                  {namespace: "custom", key: "usability_after_opening"}
                  {namespace: "custom", key: "package_contains"}
                  {namespace: "custom", key: "arabic_name"}
                  
                  {namespace: "shopify", key: "lens-color"},
                  {namespace: "shopify", key: "temple-color"},
                  {namespace: "shopify", key: "eyewear-frame-color"},
                  {namespace: "shopify", key: "eyewear-frame-design"},
                  {namespace: "shopify", key: "optical-frame-design"},
                  {namespace: "shopify", key: "eyewear-lens-material"},
                  {namespace: "shopify", key: "eyewear-frame-material"},
                  {namespace: "shopify", key: "target-gender"},
                  {namespace: "shopify", key: "lens_polarization"},
                  {namespace: "shopify", key: "country-of-origin"}
                ]) {
                  namespace
                  key
                  value
                  type
                  description
                }
              }
            }
          `,
          variables: { handle },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    const productData = data.data?.productByHandle;
    if (!productData) {
      throw new Error("Product not found or invalid response structure.");
    }

    // Extract media data (including videos)
    const media = productData.media?.edges.map(({ node }) => {
      if (node.sources) {
        return {
          type: "video",
          id: node.id,
          sources: node.sources.map((source) => ({
            url: source.url,
            format: source.format,
          })),
        };
      } else if (node.image) {
        return {
          type: "image",
          id: node.id,
          url: node.image.url,
          altText: node.image.altText,
        };
      } else if (node.embedUrl) {
        return {
          type: "externalVideo",
          id: node.id,
          embedUrl: node.embedUrl,
          host: node.host,
        };
      } else if (node.alt && node.sources) {
        return {
          type: "3dModel",
          id: node.id,
          sources: node.sources.map((source) => ({
            url: source.url,
          })),
        };
      }
      return null;
    });

    // Safely map metafields if they exist and are not null
    const metafields = productData.metafields
      ? productData.metafields
          .filter((mf) => mf !== null)
          .map((mf) => ({
            key: mf.key,
            value: mf.value,
            namespace: mf.namespace,
            type: mf.type,
            description: mf.description,
          }))
      : [];

    // Add media and metafields to the product data
    const productWithMediaAndMetafields = {
      ...productData,
      media,
      metafields,
    };

    // Initialize selected options with the first available value for each option
    const initialOptions = {};
    productData.options.forEach((option) => {
      initialOptions[option.name] = option.values[0];
    });

    const newProduct = await MetaSingleController(productData);

    // Return product data, media, and initial options
    return { productData: newProduct, initialOptions };
  } catch (error) {
    console.error("Error fetching product variants:", error);
    throw error; // Re-throw error to allow handling at the call site
  }
};

export const fetchVariantsByProductId = async (productId) => {
  const query = `
    query fetchVariants($id: ID!) {
      product(id: $id) {
        variants(first: 10) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyClient.post("", {
      query,
      variables: { id: productId },
    });

    const variants = response.data.data.product.variants.edges;
    return variants.map((variant) => variant.node);
  } catch (error) {
    console.error("Error fetching variants:", error.message);
    throw error;
  }
};

export const fetchAllCollections = async () => {
  const query = `
    query {
      collections(first: 100) {
        edges {
          node {
            id
            title
            description
            handle
            updatedAt
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyClient.post("", { query });
    const collections = response.data.data.collections.edges.map(
      (edge) => edge.node
    );
    return collections;
  } catch (error) {
    console.error("Error fetching collections:", error.message);
    throw error;
  }
};

export const fetchCollectionByHandle = async (collectionHandle) => {
  const query = `
    query FetchCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        description
        handle
        updatedAt
        image {
          src
          altText
        }
      }
    }
  `;

  try {
    const response = await shopifyClient.post("", {
      query,
      variables: { handle: collectionHandle },
    });

    const collection = response.data.data.collection;
    if (!collection) {
      throw new Error(
        `Collection with handle "${collectionHandle}" not found.`
      );
    }
    return collection;
  } catch (error) {
    console.error("Error fetching collection:", error.message);
    throw error;
  }
};

export const fetchCollectionsWithProducts = async () => {
  const query = `
    query {
      collections(first: 100) {
        edges {
          node {
            id
            title
            description
            handle
            products(first: 250) {
              edges {
                node {
                  id
                  title
                  description
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyClient.post("", { query });
    console.log("response: ", response);
    if (
      !response.data ||
      !response.data.data ||
      !response.data.data.collections
    ) {
      throw new Error("Collections data is not available.");
    }
    const collections = response.data.data.collections.edges.map((edge) => ({
      ...edge.node,
      products: edge.node.products.edges.map((productEdge) => productEdge.node),
    }));
    return collections;
  } catch (error) {
    console.error("Error fetching collections with products:", error.message);
    throw error;
  }
};

export const fetchCollectionsWithMetafields = async () => {
  const query = `
    query {
      collections(first: 100) {
        edges {
          node {
            id
            title
            handle
            metafields(identifiers: [
              { namespace: "custom", key: "collection_type" },
              { namespace: "custom", key: "theme" }
            ]) {
              namespace
              key
              value
              type
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyClient.post("", { query });
    const collections = response.data.data.collections.edges.map((edge) => ({
      ...edge.node,
      metafields: edge.node.metafields || [],
    }));
    return collections;
  } catch (error) {
    console.error("Error fetching collections with metafields:", error.message);
    throw error;
  }
};

// export const fetchTopSellingProducts = async () => {
//   const query = `
//     query {
//       products(first: 100, query: "tag:top-selling") {
//         edges {
//           node {
//             id
//             title
//             descriptionHtml
//             description
//             vendor
//             handle
//             productType
//             options {
//               name
//               values
//             }
//             variants(first: 100) {
//               edges {
//                 node {
//                   id
//                   priceV2 {
//                     amount
//                     currencyCode
//                   }
//                   compareAtPriceV2 {
//                     amount
//                     currencyCode
//                   }
//                   availableForSale
//                   sku
//                   quantityAvailable
//                   selectedOptions {
//                     name
//                     value
//                   }
//                 }
//               }
//             }
//             images(first: 100) {
//               edges {
//                 node {
//                   id
//                   url
//                   altText
//                 }
//               }
//             }
//             metafields(identifiers: [
//               {namespace: "shopify", key: "color-pattern"},
//               {namespace: "shopify", key: "age-group"},
//               {namespace: "shopify", key: "eyewear-frame-design"},
//               {namespace: "shopify", key: "target-gender"},
//               {namespace: "shopify", key: "fabric"},
//               {namespace: "shopify", key: "lens_polarization"},
//               {namespace: "custom", key: "express_delivery"},
//               {namespace: "custom", key: "free_delivery"}
//             ]) {
//               namespace
//               key
//               value
//               type
//               description
//             }
//           }
//         }
//       }
//     }
//   `;

//   try {
//     const response = await shopifyClient.post("", { query });
//     console.log("response: ......................" + JSON.stringify(response));
//     const products = response.data.data.products.edges.map((edge) => {
//       const product = edge.node;

//       // Safely map metafields if they exist and are not null
//       const metafields = product.metafields
//         ? product.metafields
//             .filter((mf) => mf !== null)
//             .map((mf) => ({
//               key: mf.key,
//               value: mf.value,
//               namespace: mf.namespace,
//               type: mf.type,
//               description: mf.description,
//             }))
//         : [];
//       return {
//         ...product,
//         metafields,
//       };
//     });

//     const newProduct = await Metacontroller(products);

//     // Store products in Zustand
//     useShopifyStore.getState().setTopSellingProducts(newProduct);
//     return newProduct;
//   } catch (error) {
//     console.error("Error fetching top-selling products:", error.message);
//     throw error;
//   }
// };

// const SHOPIFY_API_URL = 'https://4bz4tg-qg.myshopify.com/admin/api/2024-10/graphql.json';
// const SHOPIFY_ACCESS_TOKEN = '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';

// Function to fetch top-selling products based on order data
// export const fetchTopSellingProducts = async () => {
//   const productQuery = `
//     query {
//       products(first: 100) {
//         edges {
//           node {
//             id
//             title
//             descriptionHtml
//             description
//             vendor
//             handle
//             productType
//             options {
//               name
//               values
//             }
//             variants(first: 100) {
//               edges {
//                 node {
//                   id
//                   priceV2 {
//                     amount
//                     currencyCode
//                   }
//                   compareAtPriceV2 {
//                     amount
//                     currencyCode
//                   }
//                   availableForSale
//                   sku
//                   quantityAvailable
//                   selectedOptions {
//                     name
//                     value
//                   }
//                 }
//               }
//             }
//             images(first: 100) {
//               edges {
//                 node {
//                   id
//                   url
//                   altText
//                 }
//               }
//             }
//             metafields(identifiers: [
//               {namespace: "shopify", key: "color-pattern"},
//               {namespace: "shopify", key: "age-group"},
//               {namespace: "shopify", key: "eyewear-frame-design"},
//               {namespace: "shopify", key: "target-gender"},
//               {namespace: "shopify", key: "fabric"},
//               {namespace: "shopify", key: "lens_polarization"},
//               {namespace: "custom", key: "express_delivery"},
//               {namespace: "custom", key: "free_delivery"}
//             ]) {
//               namespace
//               key
//               value
//               type
//               description
//             }
//           }
//         }
//       }
//     }
//   `;

//   const orderQuery = `
//     query {
//       orders(first: 100, query: "financialStatus:paid") {
//         edges {
//           node {
//             id
//             lineItems(first: 100) {
//               edges {
//                 node {
//                   title
//                   quantity
//                   product {
//                     id
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `;

//   try {
//     // Fetch all products
//     const productResponse = await shopifyClient.post('', { query: productQuery });
//     console.log("productResponse : ", productResponse)
//     const products = productResponse.data.data.products.edges.map((edge) => edge.node);

//     // Fetch all orders
//     // Fetch all orders from the Admin API (use the appropriate endpoint)
//     const orderResponse = await axios.post(SHOPIFY_API_URL, {
//       query: orderQuery,
//     }, {
//       headers: {
//         'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
//         'Content-Type': 'application/json',
//       },
//     });

//     const orders = orderResponse.data.data.orders.edges;

//     // Create a map to track sales count for each product
//     const salesCount = {};

//     // Calculate sales count based on line items in orders
//     orders.forEach((order) => {
//       order.node.lineItems.edges.forEach((item) => {
//         const productId = item.node.product.id;
//         const quantitySold = item.node.quantity;
//         salesCount[productId] = (salesCount[productId] || 0) + quantitySold;
//       });
//     });

//     // Add sales count to products
//     const productsWithSalesCount = products.map((product) => {
//       const sales = salesCount[product.id] || 0;
//       return {
//         ...product,
//         salesCount: sales,
//       };
//     });

//     // Sort products by sales count in descending order
//     const sortedProducts = productsWithSalesCount.sort((a, b) => b.salesCount - a.salesCount);

//     // Select top-selling products (e.g., top 10)
//     const topSellingProducts = sortedProducts.slice(0, 10);

//     // Store products in Zustand
//     useShopifyStore.getState().setProducts(topSellingProducts);

//     return topSellingProducts;
//   } catch (error) {
//     console.error("Error fetching top-selling products:", error.message);
//     throw error;
//   }
// };
