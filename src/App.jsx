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
import PopupModal from "./components/testPopup/EyeTest";
const App = () => {
  const setLoading = useShopifyStore((state) => state.setLoading);
  const loading = useShopifyStore((state) => state.loading);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const products = await fetchAllProducts();
        setLoading(false);
        const cart = await fetchCart();
        const reviews = await fetchReviews();
        const orders = await fetchOrders();
        const fetchedCart = await fetchCart();
        const fetchedCollections = await fetchCollectionsWithProducts();
      } catch (error) {
        console.error("Error during initial fetch:", error.message);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const isPopupShown = localStorage.getItem("popupShown");
    if (!isPopupShown) {
      setShowPopup(true);
      localStorage.setItem("popupShown", "true");
    }
  }, []);

  const closeModal = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && <PopupModal closeModal={closeModal} />}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
