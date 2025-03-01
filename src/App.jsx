import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
// import {
//   fetchAllCollections,
//   // fetchAllProducts,
//   fetchCollectionsWithProducts
// } from "./store/products";
import { router } from "./routes/Router";
// import { Loading } from "./components/loading/Loading";

import useShopifyStore from "./store/useShopifyStore";
import { fetchOrders } from "./store/orders";
import PopupModal from "./components/testPopup/EyeTest";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "./redux/slices/reviewsSlice";
import { fetchCart } from "./redux/slices/cartSlice";
import { fetchProducts } from "./redux/slices/productSlice";
// import { fetchAllProducts } from "./redux/slices/productSlice";


const App = () => {
  const setLoading = useShopifyStore((state) => state.setLoading);
  const loading = useShopifyStore((state) => state.loading);
  const [showPopup, setShowPopup] = useState(false);
  const { id, items, status, error } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchReviews());
    dispatch(fetchCart());
  }, [dispatch]);

  console.log("items : ",items)
  console.log("products : ",products)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // const products = await fetchAllProducts();
        // const TopSellingProducts = await fetchTopSellingProducts();
        // console.log("TopSellingProducts.............. :" ,TopSellingProducts)
        setLoading(false);
        // const cart = await fetchCart();

        // const orders = await fetchOrders();
        const fetchedCart = await fetchCart();
        // const fetchedCollections = await fetchCollectionsWithProducts();
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
    <HelmetProvider>
      <Helmet>
        <title>
          Shop High-Quality Eyewear | Sunglasses, Eyeglasses & Contact Lenses
        </title>
        <meta
          name="description"
          content="Explore a wide range of sunglasses, eyeglasses, contact lenses,
          and prescription glasses. Find stylish eyewear options to match your needs and comfort.
          Shop now for the best prices!"
        />
        <meta
          name="keywords"
          content="Sunglasses, Eyeglasses, Contact Lenses, Prescription Glasses,
           Fashion Eyewear, Stylish Sunglasses, Polarized Glasses, UV Protection,
           Blue Light Glasses, Vision Accessories, Designer Eyewear,Lightweight Frames,
           Durable Frames, Eye Care Products, Online Specs Store, Affordable Eyewear,
           Visible Frames ,eye store, Eye Care Products Dubai,Eye Care Products UAE"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://shopify-storefront-7ct7u6sbc-salih-kms-projects.vercel.app" />
      </Helmet>
      {showPopup && <PopupModal closeModal={closeModal} />}
      <RouterProvider router={router} />
    </HelmetProvider>
  );
};

export default App;
