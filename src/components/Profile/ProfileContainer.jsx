import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SideBar from "./SideBar";
import UserData from "./UserData";
import ViewAddress from "./ViewAddress";
import EditSettings from "./EditSettings";
import MyOrders from "./MyOrders";
import { fetchUserData, deleteUserAddress } from "./ProfileController";
import AddSettings from "./AddSettings";
import AddressList from "./AddressList";

function ProfileContainer() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [pageShow, setPageShow] = useState("Dashboard");
  const [editingAddress, setEditingAddress] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await fetchUserData();
      if (error) {
        setError(error);
      } else {
        setUser(data);
        const addressId = searchParams.get("id");
        if (addressId) {
          const addressToEdit = data.addresses.edges.find((a) => a.node.id === addressId);
          if (addressToEdit) {
            setEditingAddress(addressToEdit.node);
            setPageShow("Edit Settings");
          }
        }
      }
    };

    getUserData();
  }, [searchParams]);

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setPageShow("Edit Settings");
    setSearchParams({ id: address.id });
  };

  const handleDeleteAddress = async (addressId) => {
    const confirm = window.confirm("Are you sure you want to delete this address?");
    if (confirm) {
      const { error } = await deleteUserAddress(addressId);
      if (!error) {
        setUser((prevUser) => ({
          ...prevUser,
          addresses: {
            edges: prevUser.addresses.edges.filter((a) => a.node.id !== addressId),
          },
        }));
      } else {
        alert("Failed to delete address.");
      }
    }
  };

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="h-[80vh] flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <UserData user={user} />
        <SideBar pageShow={pageShow} setPageShow={setPageShow} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
        {pageShow === "Dashboard" && (
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome, {user.firstName}!</h1>
            <p>Manage your profile and preferences here.</p>
          </div>
        )}

        {/* {pageShow === "Address" && (
          <div>
            {user.addresses.edges.length === 0 ? (
              <p className="text-center text-xl text-gray-600">No addresses available</p>
            ) : (
              user.addresses.edges.map((address) => (
                <ViewAddress
                  key={address.node.id}
                  firstName={address.node.firstName}
                  lastName={user.lastName}
                  address1={address.node.address1}
                  address2={address.node.address2}
                  city={address.node.city}
                  country={address.node.country}
                  zip={address.node.zip}
                  phone={address.node.phone}
                  onEdit={() => handleEditAddress(address.node)}
                  onDelete={() => handleDeleteAddress(address.node.id)}
                />
              ))
            )}
          </div>
        )} */}

        {pageShow === "Address" && (
          <AddressList
            addresses={user.addresses.edges}
            onEdit={handleEditAddress}
            onDelete={handleDeleteAddress}
          />
        )}
        {pageShow === "Edit Settings" && (
          <EditSettings
            user={user}
            address={editingAddress}
            onSave={(updatedAddress) => {
              setUser((prevUser) => ({
                ...prevUser,
                addresses: {
                  edges: prevUser.addresses.edges.map((a) =>
                    a.node.id === updatedAddress.id ? { node: updatedAddress } : a
                  ),
                },
              }));
              setEditingAddress(null);
              setPageShow("Address");
              setSearchParams({});
            }}
          />
        )}

        {pageShow === "My Orders" && <MyOrders userId={user.id} />}

        {pageShow === "Add Address" && (
          <AddSettings
            user={user}
            onSave={(updatedAddress) => {
              setUser((prevUser) => ({
                ...prevUser,
                addresses: {
                  edges: prevUser.addresses.edges.map((a) =>
                    a.node.id === updatedAddress.id ? { node: updatedAddress } : a
                  ),
                },
              }));
              setEditingAddress(null);
              setPageShow("Address");
              setSearchParams({});
            }}
          />
        )}

        {pageShow === "Logout" && (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500">You have logged out.</h1>
            <p>Thank you for visiting!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileContainer;
