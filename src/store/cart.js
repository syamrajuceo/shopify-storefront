import { shopifyClient } from "../config/shopifyClient";
import useShopifyStore from "./useShopifyStore";

const accessToken = localStorage.getItem("accessToken");

// Store cart ID and checkout URL in localStorage
const storeCartInLocalStorage = (cartId, checkoutUrl) => {
  localStorage.setItem("cartId", cartId);
  localStorage.setItem("checkoutUrl", checkoutUrl);
};

// Retrieve cart data from localStorage
const getCartFromLocalStorage = () => {
  const cartId = localStorage.getItem("cartId");
  const checkoutUrl = localStorage.getItem("checkoutUrl");

  return cartId && checkoutUrl && accessToken
    ? { cartId, checkoutUrl, accessToken }
    : null;
};

export const createCart = async (accessToken = null) => {
  // Retrieve user details from localStorage
  const user = JSON.parse(localStorage.getItem("user")); 

  // Set default buyer identity if no user details are available
  const buyerIdentity = user
    ? {
        email: user.email,
        countryCode: user.countryCode || "IN", // Default to 'IN' if no country code
        // deliveryAddressPreferences: user.addresses.edges[0].node
        //   ? {
        //       firstName: user.addresses.edges[0].node.firstName, // Adjust fields to match valid fields
        //       lastName: user.addresses.edges[0].node.lastName, // Ensure these are correct
        //       address1: user.addresses.edges[0].node.address1,
        //       address2: user.addresses.edges[0].node.address2,
        //       city: user.addresses.edges[0].node.city,
        //       province: user.addresses.edges[0].node.province,
        //       country: user.addresses.edges[0].node.country,
        //       zip: user.addresses.edges[0].node.zip,
        //       phone: user.addresses.edges[0].node.phone,
        //     }
        //   : [],
        preferences: {
          delivery: {
            deliveryMethod: user.deliveryMethod || "SHIPPING", // Make sure this matches a valid delivery method
          },
        },
      }
    : {};

  // console.log("Buyer identity updated: ", JSON.stringify(buyerIdentity));

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
      lines: [], // Add the products to the cart as needed
      buyerIdentity: buyerIdentity, // Pass the buyer identity from localStorage
      attributes: [
        {
          key: "cart_attribute",
          value: "This is a cart attribute",
        },
      ], // Ensure attributes are in an array if expected
    },
  };

  try {
    const response = await shopifyClient.post("", { query, variables });

    if (response.data.errors) {
      throw new Error(`GraphQL Error: ${response.data.errors[0].message}`);
    }

    const { cart } = response.data.data.cartCreate;
    if (!cart) {
      throw new Error("Failed to create a cart.");
    }

    // If accessToken is provided, update the cart buyer identity
    if (accessToken) {
      const updatedCart = await updateCartBuyerIdentity(cart.id, accessToken);
      if (updatedCart) {
        cart.checkoutUrl = updatedCart.checkoutUrl;
      }
    }

    // Store cart in localStorage and Zustand
    storeCartInLocalStorage(cart.id, cart.checkoutUrl);
    useShopifyStore.getState().setCart(cart.id, cart.checkoutUrl);

    return cart;
  } catch (error) {
    console.error("Cart Creation Error:", error.message || error);
    throw error;
  }
};

export const addToCart = async (variantId, quantity) => {
  let { cartId } = useShopifyStore.getState();

  if (!cartId) {
    // Try to fetch from localStorage if cart ID is not in the state
    cartId = localStorage.getItem("cartId");

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

    // If accessToken is provided, update the cart buyer identity
    if (accessToken) {
      const updatedCart = await updateCartBuyerIdentity(cart.id, accessToken);
      if (updatedCart) {
        cart.checkoutUrl = updatedCart.checkoutUrl;
      }
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

export const updateCart = async (lineItemId, quantity) => {
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

  const { cartId } = getCartFromLocalStorage() || {};
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

    const errors = response?.data?.data?.cartLinesUpdate?.userErrors || [];
    if (errors.length > 0) {
      console.error("API User Errors:", errors);
      throw new Error(errors.map((err) => err.message).join(", "));
    }

    const cart = response?.data?.data?.cartLinesUpdate?.cart;

    // Update cart buyer identity if accessToken is provided
    if (accessToken) {
      const updatedCart = await updateCartBuyerIdentity(cart.id, accessToken);
      if (updatedCart) {
        cart.checkoutUrl = updatedCart.checkoutUrl;
      }
    }

    // Store cart in localStorage and update Zustand
    storeCartInLocalStorage(cart.id, cart.checkoutUrl);
    useShopifyStore.getState().setCart(cart.id, cart.checkoutUrl);

    return cart;
  } catch (error) {
    console.error("Error updating cart:", error.message);
    throw error;
  }
};

export const fetchCart = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const { cartId } = getCartFromLocalStorage() || {};
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

    if (!cart) {
      throw new Error("Cart not found.");
    }

    console.log("Buyer Identity:", cart.buyerIdentity);

    if (accessToken) {
      // Optionally update cart buyer identity if accessToken is provided
      const updatedCart = await updateCartBuyerIdentity(cart.id, accessToken);
      if (updatedCart) {
        cart.checkoutUrl = updatedCart.checkoutUrl;
        // Ensure buyer identity is updated
        cart.buyerIdentity = updatedCart.buyerIdentity || cart.buyerIdentity;
      }
    }

    // Store cart in localStorage and update Zustand
    storeCartInLocalStorage(cart.id, cart.checkoutUrl);
    useShopifyStore.getState().setCart(cart.id, cart.checkoutUrl);

    return cart;
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    throw error;
  }
};


export const createPreAuthenticatedCheckoutUrl = async () => {
  const cartId = localStorage.getItem("cartId");
  const accessToken = localStorage.getItem("accessToken");
  if (!cartId) {
    throw new Error("No cart ID found.");
  }

  if (accessToken) {
    try {
      const cart = await updateCartBuyerIdentity(cartId, accessToken);
      console.log("buyer identity updated.");
      console.log("New cart: ", cart);
    } catch (error) {
      console.error("Error updating cart buyer identity:", error.message);
      throw error;
    }
  }

  const query = `
    mutation checkoutCreate($cartId: ID!, $buyerIdentity: BuyerIdentityInput) {
      checkoutCreate(input: {cartId: $cartId, buyerIdentity: $buyerIdentity}) {
        checkout {
          id
          webUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId: `${cartId}`,
    buyerIdentity: {
      email: "salihkm000@gmail.com",
      accessToken: accessToken,
    },
  };

  try {
    const response = await shopifyClient.post("", { query, variables });
    console.log("Response: " + JSON.stringify(response));

    const errors = response?.data?.data?.checkoutCreate?.userErrors || [];
    if (errors.length > 0) {
      console.error("API User Errors:", errors);
      throw new Error(errors.map((err) => err.message).join(", "));
    }

    const checkout = response?.data?.data?.checkoutCreate?.checkout;

    if (!checkout) {
      throw new Error("Failed to create checkout.");
    }

    return checkout.webUrl;
  } catch (error) {
    console.error(
      "Error creating pre-authenticated checkout URL:",
      error.message
    );
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
