import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchProducts = createAsyncThunk(
  "searchProducts/fetchSearchProducts",
  async ({ search, cursor = null, limit = 100 }, thunkAPI) => {
    const controller = new AbortController();
    try {
      console.time('API Call Duration');
      const response = await axios.get(
        "http://localhost:5558/api/products/search",
        {
          params: { search, cursor, limit },
          signal: controller.signal
        }
      );
      console.timeEnd('API Call Duration');
      console.log("API response data:", response.data);

      // Ensure the response has the expected structure
      const products = Array.isArray(response.data?.products) ? response.data.products : [];
      const pagination = response.data?.pagination || {
        nextCursor: null,
        hasNextPage: false
      };
      
      return { products, pagination };
    } catch (error) {
      console.timeEnd('API Call Duration');
      if (axios.isCancel(error)) {
        return thunkAPI.rejectWithValue("Request canceled");
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      // Cleanup function for thunk cancellation
      thunkAPI.signal.addEventListener('abort', () => {
        controller.abort();
      });
    }
  }
);

const searchProductsSlice = createSlice({
  name: "searchProducts",
  initialState: {
    items: [],
    loading: false,
    error: null,
    cursor: null,
    hasNextPage: false,
    lastSearch: ""
  },
  reducers: {
    clearSearchProducts: (state) => {
      state.items = [];
      state.cursor = null;
      state.hasNextPage = false;
      state.error = null;
      state.lastSearch = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchProducts.pending, (state, action) => {
        const { search } = action.meta.arg;
        state.loading = true;
        state.error = null;
        // Only reset items if this is a new search (not infinite scroll)
        if (state.lastSearch !== search) {
          state.items = [];
          state.cursor = null;
          state.hasNextPage = false;
        }
        state.lastSearch = search;
      })
      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        state.loading = false;
        
        console.log("Full payload:", action.payload);
        console.log("Current state items:", state.items);
        
        const { products, pagination } = action.payload;
        
        // Ensure products is always an array
        const newProducts = Array.isArray(products) ? products : [];
        
        // If this is a subsequent page load, append products
        if (state.cursor && pagination?.nextCursor) {
          state.items = [...state.items, ...newProducts];
        } else {
          // Otherwise replace the products
          state.items = newProducts;
        }
        
        state.cursor = pagination?.nextCursor || null;
        state.hasNextPage = pagination?.hasNextPage || false;
        
        console.log("Updated state items:", state.items);
      })
      .addCase(fetchSearchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Search products error:", action.payload);
      });
  },
});

export const { clearSearchProducts } = searchProductsSlice.actions;
export default searchProductsSlice.reducer;