import axios from "axios";

// const API_URL = import.meta.env.VITE_REACT_APP_SHOPIFY_API_URL;
// const API_TOKEN = import.meta.env.VITE_REACT_APP_SHOPIFY_API_TOKEN;
const API_URL = "https://4bz4tg-qg.myshopify.com/api/2024-10/graphql.json";
const API_TOKEN = "aae77a75514b280e61a74cc7ee993635";

export const shopifyClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": API_TOKEN,
  },
});
