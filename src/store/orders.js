import axios from 'axios';
import useShopifyStore from './useShopifyStore';

const { setOrders } = useShopifyStore.getState();

const API_URL = "https://shopify-backend-93434035859.us-central1.run.app/api/orders";


const customerAccessToken = localStorage.getItem("accessToken")


export const  fetchOrders = async () => {
  try {
    const response = await axios.post(
      "https://shopify-backend-93434035859.us-central1.run.app/api/orders",
      { customerAccessToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching orders: ", error.response?.data || error.message);
    return [];
  }
};

