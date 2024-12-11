import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { fetchAllProducts  } from "./store/products";
import { router } from "./routes/Router";
import { fetchCart } from "./store/cart";

const App = () => {
  useEffect(() => {
    const loadData = async () => {
      try {
        const products = await fetchAllProducts();
        const cart = await fetchCart();
        // console.log("Products :" + JSON.stringify(products));
        // console.log("cart : " + JSON.stringify(cart));
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
