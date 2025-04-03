import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5558/api/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ 
    limit = 50, 
    cursor = null, 
    minPrice = 100,
    maxPrice = 200,
    gender = "men",
    frameColor ,
    brand,
    available,
    category
  }, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: { 
          limit, 
          cursor,
          minPrice,
          maxPrice,
          gender,
          frameColor,
          brand,
          available,
          category
        },
      });

      const uniqueProducts = Array.from(
        new Set(response.data.products.map((p) => p.id))
      ).map((id) => response.data.products.find((p) => p.id === id));

      return {
        products: uniqueProducts,
        pagination: response.data.pagination,
        filters: {
          minPrice,
          maxPrice,
          gender,
          frameColor,
          brand,
          available,
          category
        }
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
    pagination: {
      nextCursor: null,
      hasNextPage: false,
    },
  },
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.pagination = { nextCursor: null, hasNextPage: true };
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Combine existing and new products, then remove duplicates
        const allProducts = [...state.products, ...action.payload.products];
        const uniqueProducts = Array.from(
          new Set(allProducts.map((p) => p.id))
        ).map((id) => allProducts.find((p) => p.id === id));

        state.products = uniqueProducts;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetProducts } = productsSlice.actions;
export default productsSlice.reducer;
