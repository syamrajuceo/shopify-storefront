import { useEffect } from "react";
import { Cart } from "../components/cart/Cart";
import { useDispatch } from "react-redux";
import { fetchCart } from "../redux/slices/cartSlice";
export const CartPage = () => {
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
