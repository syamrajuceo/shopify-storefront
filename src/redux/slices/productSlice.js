import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5558/api/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ 
    limit = 20, 
    cursor = null,
    category = null,
    minPrice,
    maxPrice,
    gender,
    frameColor,
    brand,
    available
  }, { rejectWithValue, getState }) => {
    try {
      const currentCategory = category ?? getState().products.currentCategory;
      
      const params = {
        limit, 
        cursor,
        minPrice,
        maxPrice
      };

      // Add category filter if specified
      if (currentCategory) {
        params.category = currentCategory;
      }

      // Add optional filters if they exist
      if (gender?.length) params.gender = gender.join(',');
      if (frameColor?.length) params.frameColor = frameColor.join(',');
      if (brand?.length) params.brand = brand.join(',');
      if (available) params.available = true;

      const response = await axios.get(API_BASE_URL, { params });

      return {
        products: response.data.products,
        pagination: response.data.pagination,
        currentCategory,
        filterParams: { minPrice, maxPrice, gender, frameColor, brand, available }
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
    currentCategory: null,
    currentFilters: {},
    pagination: {
      nextCursor: null,
      hasNextPage: false,
    },
  },
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.pagination = { nextCursor: null, hasNextPage: false };
      state.status = "idle";
      state.error = null;
      state.currentFilters = {};
    },
    setCategory: (state, action) => {
      if (state.currentCategory !== action.payload) {
        state.currentCategory = action.payload;
        state.products = [];
        state.pagination = { nextCursor: null, hasNextPage: true };
        state.currentFilters = {};
      }
    },
    setFilters: (state, action) => {
      state.currentFilters = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        
        if (action.payload.currentCategory === state.currentCategory) {
          if (action.meta.arg.cursor) {
            state.products = [...state.products, ...action.payload.products];
          } else {
            state.products = action.payload.products;
          }
          state.pagination = action.payload.pagination;
          state.currentFilters = action.payload.filterParams;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetProducts, setCategory, setFilters } = productsSlice.actions;
export default productsSlice.reducer;