import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import {
  fetchAllCollections,
  fetchAllProducts,
  fetchCollectionsWithProducts,
} from "./store/products";
import { router } from "./routes/Router";
import { fetchCart } from "./store/cart";
import { fetchReviews } from "./store/review";
import { Loading } from "./components/loading/Loading";

import useShopifyStore from "./store/useShopifyStore";
import { fetchOrders } from "./store/orders";
const App = () => {
  const setLoading = useShopifyStore((state) => state.setLoading);
  const loading = useShopifyStore((state) => state.loading);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const products = await fetchAllProducts();
        const cart = await fetchCart();
        const reviews = await fetchReviews();
        setLoading(false);
        const orders =await fetchOrders()
        const fetchedCart = await fetchCart();
        const fetchedCollections = await fetchCollectionsWithProducts();
      } catch (error) {
        console.error("Error during initial fetch:", error.message);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
