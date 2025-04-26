import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { shopifyClient } from "../../config/shopifyClient";

// Async thunks
// export const createCart = createAsyncThunk(
//   "cart/create",
//   async (_, { rejectWithValue }) => {
//     const query = `
//     mutation cartCreate($input: CartInput!) {
//       cartCreate(input: $input) {
//         cart {
//           id
//           checkoutUrl
//         }
//       }
//     }
//   `;
//     const variables = {
//       input: {
//         lines: [],
//         attributes: [
//           {
//             key: "cart_attribute",
//             value: "This is a cart attribute",
//           },
//         ],
//       },
//     };

//     try {
//       // Step 1: Create cart in Shopify
//       const response = await shopifyClient.post("", { query, variables });

//       console.log("Response : ", response)

//       if (response.data.errors) {
//         throw new Error(`GraphQL Error: ${response.data.errors[0].message}`);
//       }

//       const { cart } = response.data.data.cartCreate;
//       if (!cart) {
//         throw new Error("Failed to create a cart.");
//       }
//       localStorage.setItem("checkoutUrl" , cart.checkoutUrl);
//       localStorage.setItem("cartId" , cart.id)
//       console.log("Cart created successfully:", cart);

//       return cart;
//     } catch (error) {
//       console.error("Cart Creation Error:", error.message || error);
//       throw error;
//     }
//   }
// );


export const createCart = createAsyncThunk(
  "cart/create",
  async (_, { rejectWithValue }) => {
    try {
      const query = `
        mutation cartCreate($input: CartInput!) {
          cartCreate(input: $input) {
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
                        product {
                          id
                          title
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const variables = {
        input: {
          lines: [],
          attributes: [],
        },
      };

      const response = await shopifyClient.post("", { query, variables });

      if (response.data.errors) {
        return rejectWithValue(response.data.errors[0].message);
      }

      const cart = response.data.data.cartCreate.cart;
      if (!cart) {
        return rejectWithValue("Failed to create cart");
      }

      localStorage.setItem("cartId", cart.id);
      localStorage.setItem("checkoutUrl", cart.checkoutUrl);
      return cart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/delete",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://shopify-backend-93434035859.us-central1.run.app/api/customer/cart/delete/${email}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addItem",
  async ({ variantId, quantity }, { getState, dispatch, rejectWithValue }) => {
    let cartId = getState().cart.id || localStorage.getItem("cartId");
    if (!cartId) {
      const cart = await dispatch(createCart()).unwrap();
      cartId = cart.id;
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
      localStorage.setItem("cartId", cart.id);
      localStorage.setItem("checkoutUrl", cart.checkoutUrl);
      return cart;
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
      throw error;
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateItem",
  async ({ lineItemId, quantity }, { getState, rejectWithValue }) => {
    const cartId = getState().cart.id || localStorage.getItem("cartId");
    if (!cartId) {
      return rejectWithValue("No cart ID available");
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

    const variables = {
      cartId,
      lines: [{ id: lineItemId, quantity }],
    };

    try {
      const response = await shopifyClient.post("", { query, variables });
      // console.log(
      //   "updateCart response : ", response
      // )
      const errors = response.data.data.cartLinesUpdate.userErrors || [];
      if (errors.length) {
        throw new Error(errors.map((err) => err.message).join(", "));
      }
      return response.data.data.cartLinesUpdate.cart;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update cart");
    }
  }
);

// export const fetchInitialCart = createAsyncThunk(
//   "cart/fetchInitial",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const cartId = localStorage.getItem("cartId");
//       if (!cartId) {
//         console.log("No cart ID available.");
//         return null;
//       }

//       const query = `
//         query fetchCartDetails($cartId: ID!) {
//           cart(id: $cartId) {
//             id
//             checkoutUrl
//             createdAt
//             updatedAt
//             lines(first: 10) {
//               edges {
//                 node {
//                   id
//                   quantity
//                   merchandise {
//                     ... on ProductVariant {
//                       id
//                       title
//                       priceV2 {
//                         amount
//                         currencyCode
//                       }
//                       compareAtPriceV2 {
//                         amount
//                         currencyCode
//                       }
//                       product {
//                         title
//                         productType
//                         images(first: 1) {
//                           edges {
//                             node {
//                               src
//                               altText
//                             }
//                           }
//                         }
//                       }
//                     }
//                   }
//                   attributes {
//                     key
//                     value
//                   }
//                 }
//               }
//             }
//             buyerIdentity {
//               email
//             }
//           }
//         }
//       `;

//       const response = await shopifyClient.post("", {
//         query,
//         variables: { cartId },
//       });
//       const cart = response?.data?.data?.cart;
//       if (!cart) throw new Error("Cart not found.");

//       localStorage.setItem("cartId", cart.id);
//       localStorage.setItem("checkoutUrl", cart.checkoutUrl);
//       return cart;
//     } catch (error) {
//       return rejectWithValue(error.message || "Failed to fetch cart");
//     }
//   }
// );

export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const cartId = localStorage.getItem("cartId");
      if (!cartId) return null;

      const query = `
        query fetchCartDetails($cartId: ID!) {
          cart(id: $cartId) {
            id
            checkoutUrl
            createdAt
            updatedAt
            lines(first: 20) {
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
                      quantityAvailable
                      availableForSale
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

      const response = await shopifyClient.post("", {
        query,
        variables: { cartId },
      });

      console.log("response ....", response);

      const cart = response?.data?.data?.cart;
      if (!cart) throw new Error("Cart not found.");

      localStorage.setItem("cartId", cart.id);
      localStorage.setItem("checkoutUrl", cart.checkoutUrl);
      return cart;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cart");
    }
  }
);

// export const updateCartBuyerIdentity = createAsyncThunk(
//   "cart/updateBuyerIdentity",
//   async ({ cartId, accessToken }, { rejectWithValue }) => {
//     const query = `
//       mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
//         cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
//           cart {
//             id
//             checkoutUrl
//           }
//           userErrors {
//             field
//             message
//           }
//         }
//       }
//     `;

//     const variables = {
//       cartId,
//       buyerIdentity: {
//         customerAccessToken: accessToken,
//       },
//     };

//     try {
//       const response = await shopifyClient.post("", { query, variables });
//       const errors =
//         response?.data?.data?.cartBuyerIdentityUpdate?.userErrors || [];

//       if (errors.length > 0) {
//         return rejectWithValue(errors.map((err) => err.message).join(", "));
//       }

//       const cart = response?.data?.data?.cartBuyerIdentityUpdate?.cart;
//       return cart;
//     } catch (error) {
//       return rejectWithValue(
//         error.message || "Failed to update buyer identity"
//       );
//     }
//   }
// );

export const updateCartBuyerIdentity = createAsyncThunk(
  "cart/updateBuyerIdentity",
  async ({ cartId, accessToken }, { rejectWithValue }) => {
    const query = `
      mutation cartBuyerIdentityUpdate(
        $cartId: ID!
        $buyerIdentity: CartBuyerIdentityInput!
      ) {
        cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
          cart {
            id
            checkoutUrl
            buyerIdentity {
              email
              customer {
                id
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
      buyerIdentity: {
        customerAccessToken: accessToken
      }
    };

    try {
      const response = await shopifyClient.post("", { query, variables });
      
      if (response.data.errors) {
        return rejectWithValue(response.data.errors[0].message);
      }
      
      const updatedCart = response.data.data.cartBuyerIdentityUpdate.cart;
      localStorage.setItem("checkoutUrl", updatedCart.checkoutUrl);
      return updatedCart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    id: null,
    checkoutUrl: null,
    items: [],
    buyerIdentity: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetCartState(state) {
      state.id = null;
      state.checkoutUrl = null;
      state.items = [];
      state.buyerIdentity = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.checkoutUrl = action.payload.checkoutUrl;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.checkoutUrl = action.payload.checkoutUrl;
        state.items = action.payload.lines.edges.map((edge) => edge.node);
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.items = action.payload.lines.edges.map((edge) => edge.node);
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.id = null;
        state.checkoutUrl = null;
        state.items = [];
        state.buyerIdentity = null;
      })
      // .addCase(fetchInitialCart.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchInitialCart.fulfilled, (state, action) => {
      //   if (action.payload) {
      //     state.id = action.payload.id;
      //     state.checkoutUrl = action.payload.checkoutUrl;
      //     state.items = action.payload.lines.edges.map((edge) => edge.node);
      //     state.buyerIdentity = action.payload.buyerIdentity;
      //   }
      //   state.status = "succeeded";
      // })
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.id = action.payload.id;
          state.checkoutUrl = action.payload.checkoutUrl;
          state.items = action.payload.lines.edges.map((edge) => edge.node);
          state.buyerIdentity = action.payload.buyerIdentity;
        }
        state.status = "succeeded";
      })

      .addCase(updateCartBuyerIdentity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartBuyerIdentity.fulfilled, (state, action) => {
        if (action.payload) {
          state.id = action.payload.id;
          state.checkoutUrl = action.payload.checkoutUrl;
        }
        state.status = "succeeded";
      })
      .addCase(updateCartBuyerIdentity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update buyer identity";
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload || action.error.message;
        }
      );
  },
});

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;
