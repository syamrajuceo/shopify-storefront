import { create } from "zustand";

const useShopifyStore = create((set) => ({
  cartId: null,
  checkoutUrl: null,
  userToken: null,
  products: [],
  // topSellingProducts : [],
  user: null,
  loading: false,
  reviews: [],
  cart : [],

  setReview: (reviews) => set({ reviews }),
  setUser: (user) => set({ user }),
  setCart: (cart ,cartId, checkoutUrl) => set({cart, cartId, checkoutUrl }),
  setUserToken: (token) => set({ userToken: token }),
  setProducts: (products) => set({ products }),
  // setTopSellingProducts: (topSellingProducts) => set({ topSellingProducts }),
  resetCart: () => set({ cartId: null, checkoutUrl: null }),
  
  // Loading state setters
  setLoading: (isLoading) => set({ loading: isLoading }),
}));

export default useShopifyStore;

