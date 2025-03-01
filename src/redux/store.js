import { configureStore } from "@reduxjs/toolkit";
import reviewsReducer from "./slices/reviewsSlice";
import cartReducer from "./slices/cartSlice";
import productsReducer from "./slices/productSlice";
// import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
    cart: cartReducer,
    products: productsReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
