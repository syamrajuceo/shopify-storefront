import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { fetchAllProducts  } from "./store/products";
import { router } from "./routes/Router";
import { fetchCart } from "./store/cart";
import { fetchReviews } from "./store/reviews";

const App = () => {
  useEffect(() => {
    const loadData = async () => {
      try {
        const products = await fetchAllProducts();
        const cart = await fetchCart();
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
