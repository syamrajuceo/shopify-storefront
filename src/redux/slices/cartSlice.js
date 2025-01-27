import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import shopifyClient from '../../config/shopifyClient';

// Async thunks
export const createCart = createAsyncThunk('cart/create', async (_, { rejectWithValue }) => {
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
          key: 'cart_attribute',
          value: 'This is a cart attribute',
        },
      ],
    },
  };

  try {
    const response = await shopifyClient.post('', { query, variables });
    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }
    return response.data.data.cartCreate.cart;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to create a cart');
  }
});

export const deleteCart = createAsyncThunk('cart/delete', async (email, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `https://shopify-backend-1-f8t9.onrender.com/api/customer/cart/delete/${email}`
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || error.message || 'Failed to delete cart'
    );
  }
});

export const addToCart = createAsyncThunk(
  'cart/addItem',
  async ({ variantId, quantity }, { getState, dispatch, rejectWithValue }) => {
    let cartId = getState().cart.id || localStorage.getItem('cartId');
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
      const response = await shopifyClient.post('', { query, variables });
      const errors = response.data.data.cartLinesAdd.userErrors || [];
      if (errors.length) {
        throw new Error(errors.map((err) => err.message).join(', '));
      }
      return response.data.data.cartLinesAdd.cart;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add item to cart');
    }
  }
);

export const updateCart = createAsyncThunk(
  'cart/updateItem',
  async ({ lineItemId, quantity }, { getState, rejectWithValue }) => {
    const cartId = getState().cart.id || localStorage.getItem('cartId');
    if (!cartId) {
      return rejectWithValue('No cart ID available');
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
      const response = await shopifyClient.post('', { query, variables });
      const errors = response.data.data.cartLinesUpdate.userErrors || [];
      if (errors.length) {
        throw new Error(errors.map((err) => err.message).join(', '));
      }
      return response.data.data.cartLinesUpdate.cart;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update cart');
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    id: null,
    checkoutUrl: null,
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    resetCartState(state) {
      state.id = null;
      state.checkoutUrl = null;
      state.items = [];
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
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload || action.error.message;
        }
      );
  },
});

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;
