import { configureStore } from '@reduxjs/toolkit';
import reviewsReducer from './slices/reviewsSlice';

const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
  },
});

export default store;
