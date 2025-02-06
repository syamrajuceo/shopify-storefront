import { configureStore } from '@reduxjs/toolkit';
import reviewsReducer from './slices/reviewsSlice';
import cartReducer from "./slices/cartSlice";
// import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
    cart: cartReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});


export default store;
