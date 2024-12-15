import { useForm } from "react-hook-form";
import { getUserDetails, updateUserDetails } from "../store/auth";
import { addAddress, deleteAddress, updateAddress } from "../store/userAddress";

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null); 

  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    reset: resetProfileForm,
  } = useForm();

  const {
    register: addressRegister,
    handleSubmit: handleAddressSubmit,
    reset: resetAddressForm,
  } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const userData = await getUserDetails(accessToken);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileSave = async (data) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const updatedUser = await updateUserDetails(accessToken, data);
      setUser(updatedUser);
      setEditingProfile(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const handleAddressSave = async (data) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (editingAddress) {
        await updateAddress(accessToken, editingAddress, data);
      } else {
        await addAddress(accessToken, data);
      }
      const userData = await getUserDetails(accessToken);
      setUser(userData);
      resetAddressForm();
      setEditingAddress(null);
    } catch (error) {
      console.error("Error saving address:", error.message);
    }
  };

  const handleAddressDelete = async (addressId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await deleteAddress(accessToken, addressId);
      const userData = await getUserDetails(accessToken);
      setUser(userData);
    } catch (error) {
      console.error("Error deleting address:", error.message);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <h2>Profile Details</h2>
        {editingProfile ? (
          <form onSubmit={handleProfileSubmit(handleProfileSave)}>
            <input
              {...profileRegister("firstName")}
              defaultValue={user.firstName}
              placeholder="First Name"
            />
            <input
              {...profileRegister("lastName")}
              defaultValue={user.lastName}
              placeholder="Last Name"
            />
            <input
              {...profileRegister("email")}
              defaultValue={user.email}
              placeholder="Email"
            />
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => {
                resetProfileForm();
                setEditingProfile(false);
              }}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => setEditingProfile(true)}>
              Edit Profile
            </button>
          </div>
        )}
      </div>
      <div>
        <h2>Addresses</h2>

        {user.addresses &&
        user.addresses.edges &&
        user.addresses.edges.length > 0 ? (
          user.addresses.edges.map(({ node }) => (
            <div key={node.id}>
              <p>
                {node.firstName} {node.lastName}
              </p>
              <p>{node.company}</p>
              <p>{node.address1}</p>
              <p>{node.address2}</p>
              <p>
                {node.city}, {node.province}, {node.country} - {node.zip}
              </p>
              <p>Phone: {node.phone}</p>
              <button
                onClick={() => {
                  resetAddressForm({
                    firstName: node.firstName,
                    lastName: node.lastName,
                    company: node.company,
                    address1: node.address1,
                    address2: node.address2,
                    city: node.city,
                    province: node.province,
                    country: node.country,
                    zip: node.zip,
                    phone: node.phone,
                  });
                  setEditingAddress(node.id);
                }}
              >
                Edit Address
              </button>
              <button onClick={() => handleAddressDelete(node.id)}>
                Delete Address
              </button>
            </div>
          ))
        ) : (
          <p>No addresses found. Add one!</p>
        )}

        <h3>{editingAddress ? "Edit Address" : "Add New Address"}</h3>
        <form onSubmit={handleAddressSubmit(handleAddressSave)}>
          <input
            {...addressRegister("firstName")}
            defaultValue={user.firstName}
            placeholder="First Name"
          />
          <input
            {...addressRegister("lastName")}
            defaultValue={user.lastName}
            placeholder="Last Name"
          />
          <input {...addressRegister("company")} placeholder="Company" />
          <input
            {...addressRegister("address1")}
            placeholder="Address Line 1"
          />
          <input
            {...addressRegister("address2")}
            placeholder="Apartment, suite, etc."
          />
          <input {...addressRegister("city")} placeholder="City" />
          <input {...addressRegister("province")} placeholder="State" />
          <input {...addressRegister("country")} placeholder="Country/Region" />
          <input {...addressRegister("zip")} placeholder="PIN Code" />
          <input {...addressRegister("phone")} placeholder="Phone" />
          <button type="submit">
            {editingAddress ? "Update Address" : "Add Address"}
          </button>
          <button
            type="button"
            onClick={() => {
              resetAddressForm();
              setEditingAddress(null);
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};


