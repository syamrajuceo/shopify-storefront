// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5558/api/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ filters, loadMore = false }, { rejectWithValue, getState }) => {
    try {
      // Clean up filters before sending
      const cleanedFilters = {};
      Object.keys(filters).forEach((key) => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== "") {
          cleanedFilters[key] = filters[key];
        }
      });

      const state = getState();
      const cursor = loadMore ? state.products.pagination.nextCursor : null;

      const response = await axios.get(API_BASE_URL, {
        params: {
          limit: 12, // Reduced limit for better pagination
          cursor,
          ...cleanedFilters,
          category: filters.category?.toLowerCase(),
        },
      });

      return {
        products: response.data.products,
        pagination: response.data.pagination,
        filters: cleanedFilters,
        loadMore,
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
      minPrice: null,
      maxPrice: null,
      gender: null,
      color: null,
      brand: null,
      available: null,
      category: null,
      shape: null,
      priceRanges: [],
    },
  },
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.pagination = { nextCursor: null, hasNextPage: false };
      state.status = "idle";
      state.error = null;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      // Reset pagination when filters change
      state.pagination = { nextCursor: null, hasNextPage: false };
    },
    resetFilters: (state) => {
      state.filters = {
        minPrice: null,
        maxPrice: null,
        gender: null,
        color: null,
        brand: null,
        available: null,
        category: null,
        shape: null,
        priceRanges: [],
      };
      state.pagination = { nextCursor: null, hasNextPage: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = action.meta.arg.loadMore ? "loadingMore" : "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.loadMore
          ? [...state.products, ...action.payload.products]
          : action.payload.products;
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