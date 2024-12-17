import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { fetchAllCollections, fetchAllProducts, fetchCollectionsWithProducts } from "./store/products";
import { router } from "./routes/Router";
import { fetchCart } from "./store/cart";
import { fetchReviews } from "./store/review";
import { Loading } from "./components/loading/Loading";

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const products = await fetchAllProducts();
        const cart = await fetchCart();
        const reviews = await fetchReviews();
        console.log(products);
        setLoading(false);
        const fetchedCart = await fetchCart();
        const fetchedCollections = await fetchCollectionsWithProducts();
        console.log("fetchAllCollections : ", fetchedCollections)
      } catch (error) {
        console.error("Error during initial fetch:", error.message);
      }
    };
    loadData();
  }, []);

  return <>{loading ? <Loading /> : <RouterProvider router={router} />}</>;
};

export default App;
