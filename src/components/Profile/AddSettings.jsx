import AddressForm from "./AddressForm";
import { addUserAddress } from "./ProfileController";

function AddSettings({ user, onSave }) {
  console.log(user)
  const handleFormSubmit = async (newAddress) => {
    const { data, error } = await addUserAddress(newAddress);
    if (!error) {
      onSave(data); 
    } else {
      alert("Failed to update address.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Add Address</h1>
      <AddressForm
        initialValues={{firstName:user?.firstName||"",lastName:user?.lastName||""}}
        onSubmit={handleFormSubmit}
        onCancel={() => window.history.back()} 
      />
    </div>
  );
}

export default AddSettings;
