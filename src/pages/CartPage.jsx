import { useEffect } from "react";
import { Cart } from "../components/cart/Cart";
import { useDispatch } from "react-redux";
import { fetchCart } from "../redux/slices/cartSlice";
import ScrollToTop from "../utils/ScrollToTop";
export const CartPage = () => {
  ScrollToTop()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <>
      <Cart />
    </>
  );
};
