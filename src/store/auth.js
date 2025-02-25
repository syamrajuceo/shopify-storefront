import { shopifyClient } from "../config/shopifyClient";
import { createCart, updateCartBuyerIdentity } from "../redux/slices/cartSlice";
// import {
//   createCart,
//   fetchCart,
//   updateCartBuyerIdentity,
// } from "./cart";
import useShopifyStore from "./useShopifyStore";

const { setUser } = useShopifyStore.getState();
//  --------------------- user sign in----------------------------
export const signIn = async (email, password) => {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = { input: { email, password } };

  try {
    // Step 1: Send the request to create the access token
    const response = await shopifyClient.post("", { query, variables });
    const errors =
      response.data.data.customerAccessTokenCreate.customerUserErrors;

    // Step 2: Handle any errors returned by Shopify
    if (errors.length) {
      throw new Error(errors[0].message || "An unknown error occurred.");
    }

    // Step 3: Extract the access token and save it in localStorage
    const accessToken =
      response.data.data.customerAccessTokenCreate.customerAccessToken
        .accessToken;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem(
        "accessTokenExpiresAt",
        response.data.data.customerAccessTokenCreate.customerAccessToken
          .expiresAt
      );

      // Update the state with the new user token (using Zustand)
      useShopifyStore.getState().setUserToken(accessToken);

      // Fetch user details
      const userQuery = `
            query {
              customer(customerAccessToken: "${accessToken}") {
                email
                firstName
                lastName
              }
            }
          `;

      const userResponse = await shopifyClient.post("", { query: userQuery });
      const user = userResponse.data.data.customer;

      if (user) {
        setUser({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      }

      const localUser = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      localStorage.setItem("user", JSON.stringify(localUser));
      console.log("No existing cart found, creating a new cart...");
      const newCart = await createCart();
      await updateCartBuyerIdentity(newCart.id, accessToken);

      return accessToken;
    } else {
      throw new Error("Access token not found in the response");
    }
  } catch (error) {
    console.error("Sign-In Error:", error.message);
    throw error;
  }
};

//  --------------------- user sign up----------------------------

export const signUp = async (firstName, lastName, email, password) => {
  const customerCreateQuery = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const customerAccessTokenQuery = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    // Step 1: Create customer
    const variables = { input: { email, password, firstName, lastName } };
    const response = await shopifyClient.post("", {
      query: customerCreateQuery,
      variables,
    });

    const { customerCreate } = response.data.data;

    if (customerCreate.userErrors.length) {
      throw new Error(customerCreate.userErrors[0].message);
    }

    console.log("Customer created successfully:", customerCreate.customer);

    // Step 2: Get access token for the new customer
    const tokenVariables = { input: { email, password } };
    const tokenResponse = await shopifyClient.post("", {
      query: customerAccessTokenQuery,
      variables: tokenVariables,
    });

    const { customerAccessTokenCreate } = tokenResponse.data?.data;

    if (customerAccessTokenCreate?.userErrors?.length) {
      throw new Error(customerAccessTokenCreate.userErrors[0]?.message);
    }

    localStorage.setItem("user", JSON.stringify(customerCreate.customer));

    const accessToken =
      customerAccessTokenCreate.customerAccessToken?.accessToken;
    console.log("Access token obtained:", accessToken);

    // Optionally, create a cart for the new user
    const cart = await createCart();
    console.log("Cart created for new user:", cart);

    return { customer: customerCreate.customer, accessToken };
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

//  --------------------- user update----------------------------

export const updateUserDetails = async (accessToken, updatedData) => {
  const query = `
    mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customer {
          id
          email
          firstName
          lastName
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    customerAccessToken: accessToken,
    customer: updatedData,
  };

  try {
    const response = await shopifyClient.post("", { query, variables });

    // console.log("response:", response);

    // Ensure response.data exists
    if (!response.data || !response.data.data) {
      throw new Error("Invalid response structure");
    }

    const { customerUpdate } = response.data.data;

    // Check for user errors
    if (customerUpdate.customerUserErrors.length) {
      throw new Error(customerUpdate.customerUserErrors[0].message);
    }

    // Return updated customer data
    return customerUpdate.customer;
  } catch (error) {
    console.error("Error updating user details:", error.message);
    throw error;
  }
};

//  --------------------- forgot password----------------------------

export const forgotPassword = async (email) => {
  const query = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    email,
  };

  try {
    const response = await shopifyClient.post("", { query, variables });
    const { customerRecover } = response.data.data;

    if (customerRecover.userErrors.length) {
      throw new Error(customerRecover.userErrors[0].message);
    }

    // Return success message (e.g., password reset link sent)
    console.log("Password recovery email sent.");
  } catch (error) {
    console.error("Error sending password recovery email:", error.message);
    throw error;
  }
};

export const getUserDetails = async (accessToken) => {
  const query = `
    query {
      customer(customerAccessToken: "${accessToken}") {
        id
        email
        firstName
        lastName
        phone
        addresses(first: 10) {
          edges {
            node {
              id
              firstName
              lastName
              company
              address1
              address2
              city
              province
              country
              zip
              phone
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyClient.post("", { query });
    const user = response.data.data.customer;
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    throw error;
  }
};
