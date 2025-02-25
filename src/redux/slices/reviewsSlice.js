import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "http://localhost:5558/api";
const API_URL = 'https://shopify-backend-1-f8t9.onrender.com/api';

// Thunks for API calls
export const fetchReviews = createAsyncThunk(
  "reviews/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/reviews`);
      // console.log("Fetched reviews response: ", response.data);
      return response.data.reviews; // Ensure this structure matches the backend response
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch reviews"
      );
    }
  }
);

export const addReview = createAsyncThunk(
  "reviews/add",
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      console.error("Error adding review:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/reviews/${reviewId}`);
      return { reviewId };
    } catch (error) {
      console.error("Error deleting review:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateReview = createAsyncThunk(
  "reviews/update",
  async ({ reviewId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/reviews/${reviewId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating review:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Reviews
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Review
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })

      // Delete Review
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload.reviewId
        );
      })

      // Update Review
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          (review) => review.id === action.payload.id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      });
  },
});

export default reviewsSlice.reducer;
