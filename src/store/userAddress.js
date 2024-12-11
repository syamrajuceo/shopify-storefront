import { shopifyClient } from "../config/shopifyClient";
import useShopifyStore from "./useShopifyStore";

export const addAddress = async (accessToken, address) => {
    // First, check if the address already exists for the customer
    const existingAddress = await getExistingAddress(accessToken, address);
    if (existingAddress) {
      console.log("Address already exists for the customer:", existingAddress);
      return existingAddress; 
    }
  
    const query = `
      mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
        customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
          customerAddress {
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
          customerUserErrors {
            field
            message
          }
        }
      }
    `;
  
    const variables = {
      customerAccessToken: accessToken,
      address: {
        firstName: address.firstName,
        lastName: address.lastName,
        company: address.company,
        address1: address.address1,
        address2: address.address2,
        city: address.city,
        province: address.state, // Shopify uses "province" for state
        country: address.country,
        zip: address.zip,
        phone: address.phone,
      },
    };
  
    try {
      const response = await shopifyClient.post("", { query, variables });
      const { customerAddressCreate } = response.data.data;
  
      if (customerAddressCreate.customerUserErrors.length) {
        const errorMessage = customerAddressCreate.customerUserErrors
          .map((error) => error.message)
          .join(", ");
        throw new Error(errorMessage);
      }
  
      return customerAddressCreate.customerAddress;
    } catch (error) {
      console.error("Error adding address:", error.message);
      throw error;
    }
  };
  
  const getExistingAddress = async (accessToken, newAddress) => {
    const query = `
      query customerAddresses($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          addresses {
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
    `;
  
    const variables = {
      customerAccessToken: accessToken,
    };
  
    try {
      const response = await shopifyClient.post("", { query, variables });
      const addresses = response.data.data.customer.addresses;
  
      // Compare the new address with the existing ones
      const existingAddress = addresses.find(
        (address) =>
          address.address1 === newAddress.address1 &&
          address.city === newAddress.city &&
          address.zip === newAddress.zip &&
          address.phone === newAddress.phone
      );
  
      return existingAddress || null;
    } catch (error) {
      console.error("Error checking for existing address:", error.message);
      return null;
    }
  };
  
  

  export const updateAddress = async (accessToken, addressId, address) => {
    const query = `
      mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
        customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
          customerAddress {
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
          customerUserErrors {
            field
            message
          }
        }
      }
    `;
  
    const variables = {
      customerAccessToken: accessToken,
      id: addressId,
      address: {
        firstName: address.firstName,
        lastName: address.lastName,
        company: address.company,
        address1: address.address1,
        address2: address.address2,
        city: address.city,
        province: address.state, // Shopify uses "province" for state
        country: address.country,
        zip: address.zip,
        phone: address.phone,
      },
    };
  
    try {
      const response = await shopifyClient.post("", { query, variables });
      const { customerAddressUpdate } = response.data.data;
  
      if (customerAddressUpdate.customerUserErrors.length) {
        const errorMessage = customerAddressUpdate.customerUserErrors
          .map((error) => error.message)
          .join(", ");
        throw new Error(errorMessage);
      }
  
      return customerAddressUpdate.customerAddress;
    } catch (error) {
      console.error("Error updating address:", error.message);
      throw error;
    }
  };
  
  export const deleteAddress = async (accessToken, addressId) => {
    const query = `
      mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
        customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
          deletedCustomerAddressId
          customerUserErrors {
            field
            message
          }
        }
      }
    `;
  
    const variables = {
      customerAccessToken: accessToken,
      id: addressId,
    };
  
    try {
      const response = await shopifyClient.post("", { query, variables });
      const { customerAddressDelete } = response.data.data;
  
      if (customerAddressDelete.customerUserErrors.length) {
        throw new Error(customerAddressDelete.customerUserErrors[0].message);
      }
  
      return customerAddressDelete.deletedCustomerAddressId;
    } catch (error) {
      console.error("Error deleting address:", error.message);
      throw error;
    }
  };
  