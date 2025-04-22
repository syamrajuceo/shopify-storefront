import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5558/api/products/search";

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async ({ search = "", limit = 50, cursor = null }, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          search,
          limit,
          cursor,
        },
      });

      const uniqueProducts = Array.from(
        new Set(response.data.products.map((p) => p.id))
      ).map((id) => response.data.products.find((p) => p.id === id));

      return {
        products: uniqueProducts,
        pagination: response.data.pagination,
        search, // storing current search term if needed in the UI
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const searchSlice = createSlice({
  name: "searchProducts",
  initialState: {
    products: [],
    status: "idle",
    error: null,
    pagination: {
      nextCursor: null,
      hasNextPage: false,
    },
    search: "",
  },
  reducers: {
    resetSearchProducts: (state) => {
      state.products = [];
      state.pagination = { nextCursor: null, hasNextPage: true };
      state.status = "idle";
      state.error = null;
      state.search = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";

        const allProducts = [...state.products, ...action.payload.products];
        const uniqueProducts = Array.from(
          new Set(allProducts.map((p) => p.id))
        ).map((id) => allProducts.find((p) => p.id === id));

        state.products = uniqueProducts;
        state.pagination = action.payload.pagination;
        state.search = action.payload.search;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetSearchProducts } = searchSlice.actions;
export default searchSlice.reducer;
