import { configureStore } from "@reduxjs/toolkit";
import reviewsReducer from "./slices/reviewsSlice";
import cartReducer from "./slices/cartSlice";
import productsReducer from "./slices/productSlice";
import searchProductsReducer from "./slices/searchProductsSlice";
// import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
    cart: cartReducer,
    products: productsReducer,
    searchProducts: searchProductsReducer,
  },
})

export default store;
