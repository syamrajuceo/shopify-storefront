import axios from "axios";

const API_URL = import.meta.env.REACT_APP_SHOPIFY_API_URL;
const API_TOKEN = import.meta.env.REACT_APP_SHOPIFY_API_TOKEN;


export const shopifyClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": API_TOKEN,
  },
});
