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
      `https://shopify-backend-1-f8t9.onrender.com/api/customer/cart/delete/${email}`
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

export const updateCart = async (lineItemId, quantity, userEmail = null) => {
  let cartId = localStorage.getItem("cartId");
  console.log("local cartid : ", cartId);
  if (!cartId) {
    console.warn("No cart ID available, creating a new cart...");
  }
  const query = `
    mutation updateCartLineItem($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
  if (!cartId) {
    console.error("No cart ID available.");
    return null;
  }
  const variables = {
    cartId,
    lines: [{ id: lineItemId, quantity }],
  };
  try {
    const response = await shopifyClient.post("", { query, variables });
    console.log("cart update res : ", response);
    const errors = response?.data?.data?.cartLinesUpdate?.userErrors || [];
    if (errors.length > 0) {
      console.error("API User Errors:", errors);
      throw new Error(errors.map((err) => err.message).join(", "));
    }
    const cart = response?.data?.data?.cartLinesUpdate?.cart;
    // Store cart in localStorage and update Zustand
    storeCartInLocalStorage(cart.id, cart.checkoutUrl);
    useShopifyStore.getState().setCart(cart.id, cart.checkoutUrl);
    return cart;
  } catch (error) {
    console.error("Error updating cart:", error.message);
    throw error;
  }
};

export const fetchInitialCart = async (email) => {
  console.log("fetchInitialCart ....", email);
  let cartId = "";
  try {
    const accessToken = localStorage.getItem("accessToken");
    cartId = localStorage.getItem("cartId");
    if (cartId === "" || cartId === null || cartId === undefined) {
      console.log("No cart ID available.");
      return null;
    }
    const query = `
      query fetchCartDetails($cartId: ID!) {
        cart(id: $cartId) {
          id
          checkoutUrl
          createdAt
          updatedAt
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    compareAtPriceV2{
                      amount
                      currencyCode
                    }
                    product {
                      title
                      productType
                      images(first: 1) {
                        edges {
                          node {
                            src
                            altText
                          }
                        }
                      }
                    }
                  }
                }
                attributes {
                  key
                  value
                }
              }
            }
          }
          buyerIdentity {
            email
          }
        }
      }
    `;

    const response = await shopifyClient.post("", {
      query,
      variables: { cartId },
    });
    const cart = response?.data?.data?.cart;

    if (!cart) {
      throw new Error("Cart not found.");
    }

    // Store cart in Zustand state and localStorage
    localStorage.setItem("cartId", cart.id);
    localStorage.setItem("checkoutUrl", cart.checkoutUrl);

    return cart;
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    throw error;
  }
};

export const fetchCart = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const cartId = localStorage.getItem("cartId");

  console.log("Cart Id ...", cartId);
  if (!cartId) {
    console.log("No cart ID available.");
    return null;
  }

  const query = `
    query fetchCartDetails($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
               ... on ProductVariant {
                 id
                 title
                 
                 priceV2 {
                   amount
                   currencyCode
                 }
                compareAtPriceV2 {
                  amount
                  currencyCode
                }
                 product {
                   title
                   productType
                   handle
                   images(first: 1) {
                     edges {
                       node {
                         src
                         altText
                       }
                     }
                   }
                 }
               }
              }
              attributes {
                key
                value
              }
            }
          }
        }
        buyerIdentity {
          email
          phone
          customer {
            id
          }
          countryCode
          deliveryAddressPreferences {
            ... on MailingAddress {
              address1
              address2
              city
              provinceCode
              countryCodeV2
              zip
            }
          }
          preferences {
            delivery {
              deliveryMethod
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyClient.post("", {
      query,
      variables: { cartId },
    });

    const cart = response?.data?.data?.cart;

    console.log("Caaaaart : ", response);

    if (!cart) {
      throw new Error("Cart not found.");
    }
    // Store cart in localStorage and update Zustand
    storeCartInLocalStorage(cart.id, cart.checkoutUrl);
    useShopifyStore.getState().setCart(cart, cart.id, cart.checkoutUrl);
    cart.quantity = cart.lines.edges.length;

    cart.itemquantity = cart.lines.edges.reduce((total, edge) => {
      return total + edge.node.quantity;
    }, 0);

    console.log("getcart:", JSON.stringify(cart));
    return cart;
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    throw error;
  }
};
export const updateCartBuyerIdentity = async (cartId, accessToken) => {
  const query = `
    mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
      cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
        cart {
          id
          checkoutUrl
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
    buyerIdentity: {
      customerAccessToken: accessToken,
    },
  };

  try {
    const response = await shopifyClient.post("", { query, variables });
    const errors =
      response?.data?.data?.cartBuyerIdentityUpdate?.userErrors || [];

    if (errors.length > 0) {
      throw new Error(errors.map((err) => err.message).join(", "));
    }

    const cart = response?.data?.data?.cartBuyerIdentityUpdate?.cart;
    return cart;
  } catch (error) {
    console.error("Error updating cart buyer identity:", error.message);
    throw error;
  }
};
