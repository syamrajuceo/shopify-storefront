import axios from 'axios';
import useShopifyStore from './useShopifyStore';
const { setReview } = useShopifyStore.getState();

const API_URL = 'https://shopify-backend-1-f8t9.onrender.com/api';

// Add a review
export const addReview = async (reviewData) => {
  try {
    const response = await axios.post(`${API_URL}/reviews`, reviewData);
    return response;
  } catch (error) {
    console.error("Error adding review:", error.message);
    throw error;
  }
};

// Delete a review
export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`${API_URL}/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error.message);
    throw error;
  }
};

// Fetch all reviews
export const fetchReviews = async () => {
  try {
    const response = await axios.get(`${API_URL}/reviews`);
    setReview(response.data.reviews)
    return response.data.reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    throw error;
  }
};

// Fetch reviews by product
export const fetchReviewsByProduct = async (productHandle) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/product/${productHandle}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews by product:", error.message);
    throw error;
  }
};

// Fetch reviews by user
export const fetchReviewsByUser = async (reviewerEmail) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/user`, {
      params: { reviewer_email: reviewerEmail },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews by user:", error.message);
    throw error;
  }
};

// Update a review
export const updateReview = async (reviewId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/reviews/${reviewId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating review:", error.message);
    throw error;
  }
};
