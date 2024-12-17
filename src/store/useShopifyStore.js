import { create } from "zustand";

const useShopifyStore = create((set) => ({
  cartId: null,
  checkoutUrl: null,
  userToken: null,
  products: [],
  user : null,
  loading: false,
  reviews : [],
  orders:[],

  setReview : (reviews) =>set({reviews}),
  setOrders : (orders) =>set({orders}),
  setUser : (user) => set({ user}),
  setCart: (cartId, checkoutUrl) => set({ cartId, checkoutUrl }),
  setUserToken: (token) => set({ userToken: token }),
  setProducts: (products) => set({ products }),
  resetCart: () => set({ cartId: null, checkoutUrl: null }),
}));

export default useShopifyStore;
