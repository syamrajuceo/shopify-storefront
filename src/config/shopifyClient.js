import axios from "axios";

// const API_URL = import.meta.env.VITE_REACT_APP_SHOPIFY_API_URL;
// const API_TOKEN = import.meta.env.VITE_REACT_APP_SHOPIFY_API_TOKEN;
const API_URL = "https://4bz4tg-qg.myshopify.com/api/2025-04/graphql.json";
const API_TOKEN = "80a45abbc99fa8d887c693c5aae5996e";

export const shopifyClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": API_TOKEN,
  },
});
