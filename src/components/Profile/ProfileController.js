import { getUserDetails, updateUserDetails } from "../../store/auth";
import { addAddress, deleteAddress, updateAddress } from "../../store/userAddress";
import validateFormFields from "./validateFormFields";

// Utility function to get access token
const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    console.error("Access token is missing or expired. Please log in again.");
    return null;
  }
  return accessToken;
};

// Fetch user data
const fetchUserData = async () => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) return { data: null, error: "Token expired or invalid credentials" };

    const userData = await getUserDetails(accessToken);
    return { data: userData, error: null };
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return { data: null, error: error.message };
  }
};

// Update user profile details
const updateUserProfileDetails = async (data) => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) return { data: null, error: "Token expired or invalid credentials" };

    const updatedUser = await updateUserDetails(accessToken, data);
    return { data: updatedUser, error: null };
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return { data: null, error: error.message };
  }
};

// Update user address
const updateUserAddress = async (addressId, data) => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) return { data: null, error: "Token expired or invalid credentials" };
    if (!addressId) return { data: null, error: "Address ID is missing." };

    // Validate form fields
    const validationErrors = validateFormFields(data);
    if (Object.keys(validationErrors).length > 0) {
      return { data: null, error: "Validation failed: " + JSON.stringify(validationErrors) };
    }

    const updatedAddress = await updateAddress(accessToken, addressId, data);
    return { data: updatedAddress, error: null };
  } catch (error) {
    console.error("Error updating address:", error.message);
    return { data: null, error: error.message };
  }
};

// Delete user address
const deleteUserAddress = async (addressId) => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) return { data: null, error: "Token expired or invalid credentials" };
    if (!addressId) return { data: null, error: "Address ID is required." };

    const deletedAddress = await deleteAddress(accessToken, addressId);
    return { data: deletedAddress, error: null };
  } catch (error) {
    console.error("Error deleting address:", error.message);
    return { data: null, error: error.message };
  }
};

// Add user address
const addUserAddress = async (data) => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) return { data: null, error: "Token expired or invalid credentials" };

    // Validate form fields
    const validationErrors = validateFormFields(data);
    if (Object.keys(validationErrors).length > 0) {
      return { data: null, error: "Validation failed: " + JSON.stringify(validationErrors) };
    }

    const addedAddress = await addAddress(accessToken, data);
    return { data: addedAddress, error: null };
  } catch (error) {
    console.error("Error adding address:", error.message);
    return { data: null, error: error.message };
  }
};

export {
  fetchUserData,
  updateUserProfileDetails,
  updateUserAddress,
  deleteUserAddress,
  addUserAddress,
};
