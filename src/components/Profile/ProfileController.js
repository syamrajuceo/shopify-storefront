import { getUserDetails, updateUserDetails } from "../../store/auth";
import { addAddress, deleteAddress, updateAddress } from "../../store/userAddress";

// Utility function to get access token
const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token is missing.");
  }
  return accessToken;
};

// Fetch user data
const fetchUserData = async () => {
  try {
    const accessToken = getAccessToken();
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
    const updatedUser = await updateUserDetails(accessToken, data);
    return { data: updatedUser, error: null };
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return { data: null, error: error.message };
  }
};

// Update user address
const updateUserAddress = async (Address_id, data) => {
  try {
    const accessToken = getAccessToken();
    if (!Address_id) {
      throw new Error("Editing Address_id is missing.");
    }
    const updatedAddress = await updateAddress(accessToken, Address_id, data);
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
    if (!addressId) {
      throw new Error("Address ID is missing.");
    }
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
