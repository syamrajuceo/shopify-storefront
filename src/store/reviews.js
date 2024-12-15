import axios from "axios";

const apiToken = "D9YSLWoxfXjnUGP8acER5yrY3DE";
const shopDomain = "4bz4tg-qg.myshopify.com";

export const fetchReviews = async (productId = "gid://shopify/Product/9654160621863") => {
    try {
      // Construct the API URL
      const apiUrl = `https://api.judge.me/reviews`;
  
      // Query parameters
      const params = {
        api_token: apiToken,
        shop_domain: shopDomain,
        // product_id: productId,
      };
  
      // Make the GET request using axios
      const response = await axios.get(apiUrl, { params });
  
      // Return the data
      return response.data;
    } catch (error) {
      console.error("Error fetching Judge.me reviews:", error.message);
      throw error;
    }
  };
  