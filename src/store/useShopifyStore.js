import { create } from "zustand";

const useShopifyStore = create((set) => ({
  cartId: null,
  checkoutUrl: null,
  userToken: null,
  products: [],

  setCart: (cartId, checkoutUrl) => set({ cartId, checkoutUrl }),
  setUserToken: (token) => set({ userToken: token }),
  setProducts: (products) => set({ products }),
  resetCart: () => set({ cartId: null, checkoutUrl: null }),
}));

export default useShopifyStore;
