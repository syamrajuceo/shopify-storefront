import axios from "axios";
import { shopifyClient } from "../config/shopifyClient";
import useShopifyStore from "./useShopifyStore";

const accessToken = localStorage.getItem("accessToken");
const cartId = localStorage.getItem("cartId");

// Store cart ID and checkout URL in localStorage
const storeCartInLocalStorage = (cartId, checkoutUrl) => {
  localStorage.setItem("cartId", cartId);
  localStorage.setItem("checkoutUrl", checkoutUrl);
};

export const createCart = async (accessToken = null) => {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: [],
      attributes: [
        {
          key: "cart_attribute",
          value: "This is a cart attribute",
        },
      ],
    },
  };

  try {
    // Step 1: Create cart in Shopify
    const response = await shopifyClient.post("", { query, variables });

    if (response.data.errors) {
      throw new Error(`GraphQL Error: ${response.data.errors[0].message}`);
    }

    const { cart } = response.data.data.cartCreate;
    if (!cart) {
      throw new Error("Failed to create a cart.");
    }

    // Store cart in localStorage and Zustand
    storeCartInLocalStorage(cart.id, cart.checkoutUrl);
    useShopifyStore.getState().setCart(cart.id, cart.checkoutUrl);

    console.log("Cart created successfully:", cart);

    return cart;
  } catch (error) {
    console.error("Cart Creation Error:", error.message || error);
    throw error;
  }
};



export const deleteCart = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user.email;

  try {
    const response = await axios.delete(
      `https://shopify-backend-93434035859.us-central1.run.app/api/customer/cart/delete/${email}`
    );
    console.log("Cart deleted successfully in backend:", response.data);
  } catch (error) {
    if (error.response && error.response.data) {
      // Handle error response from server
      console.error(
        "Error deleting cart in backend:",
        error.response.data.message
      );
      throw new Error(
        error.response.data.message || "Failed to delete cart in backend."
      );
    } else {
      // Handle network or other errors
      console.error("Error deleting cart in backend:", error.message);
      throw new Error(error.message || "An unknown error occurred.");
    }
  }
};

export const addToCart = async (variantId, quantity, userEmail = null) => {
  let cartId = localStorage.getItem("cartId");
  // If no cart ID, create a new one
  if (!cartId) {
    console.warn("No cart ID available, creating a new cart...");
    try {
      const cart = await createCart(accessToken);
      cartId = cart?.id;
      if (!cartId) {
        throw new Error("Cart creation failed.");
      }
    } catch (error) {
      console.error("Error creating cart:", error.message);
      throw error;
    }
  }
  const query = `
    mutation addLineItem($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [{ quantity, merchandiseId: variantId }],
  };
  try {
    const response = await shopifyClient.post("", { query, variables });
    console.log("cart res : ", response);
    const errors = response?.data?.data?.cartLinesAdd?.userErrors || [];
    if (errors.length > 0) {
      console.error("API User Errors:", errors);
      throw new Error(errors.map((err) => err.message).join(", "));
    }
    const cart = response?.data?.data?.cartLinesAdd?.cart;
    if (!cart) {
      console.error("Failed to update cart: No cart returned.");
      throw new Error("Failed to update cart.");
    }
    // Update Zustand and localStorage with new cart data
    useShopifyStore.getState().setCart(cart.id, cart.checkoutUrl);
    localStorage.setItem("cartId", cart.id);
    localStorage.setItem("checkoutUrl", cart.checkoutUrl);
    return cart;
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
    throw error;
  }
};