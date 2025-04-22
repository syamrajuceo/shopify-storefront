import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5558/api/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    {
      limit = 100,
      cursor = null,
      minPrice,
      maxPrice,
      gender,
      color,
      brand,
      available,
      category,
      shape,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          limit,
          cursor,
          minPrice,
          maxPrice,
          gender,
          color,
          brand,
          available,
          category,
          shape,
        },
      });

      console.log("product res : ", response);

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
          color,
          brand,
          available,
          category,
          shape,
        },
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
    filters: {
      minPrice: 0,
      maxPrice: 6000,
      gender: null,
      color: null,
      brand: null,
      available: null,
      category: null,
      shape: null,
    },
  },
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.pagination = { nextCursor: null, hasNextPage: true };
      state.status = "idle";
      state.error = null;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        minPrice: 0,
        maxPrice: 6000,
        gender: null,
        color: null,
        brand: null,
        available: null,
        category: null,
        shape: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
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

export const { resetProducts, updateFilters, resetFilters } =
  productsSlice.actions;
export default productsSlice.reducer;
