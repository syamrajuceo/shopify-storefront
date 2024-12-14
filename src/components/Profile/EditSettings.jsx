import AddressForm from "./AddressForm";
import { updateUserAddress } from "./ProfileController";

function EditSettings({ user, address, onSave }) {
  const handleFormSubmit = async (updatedAddress) => {
    const { data, error } = await updateUserAddress(address.id,updatedAddress);
    if (!error) {
      onSave(data); 
    } else {
      alert("Failed to update address.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Address</h1>
      <AddressForm
        initialValues={address}
        onSubmit={handleFormSubmit}
        onCancel={() => window.history.back()}
      />
    </div>
  );
}

export default EditSettings;
