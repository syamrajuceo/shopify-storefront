import AddressForm from "./AddressForm";
import { updateUserAddress } from "./ProfileController";
import ToasterContainer from "../Toaster/ToasterContainer";

function EditSettings({ user, address, onSave }) {
  const handleFormSubmit = async (updatedAddress) => {
    const { data, error } = await updateUserAddress(address.id,updatedAddress);
    if (!error) {
      console.log(data);
      onSave(data);
      ToasterContainer("Success", "Address successfully created!", "success");
    } else {
      if (error.includes("Validation failed:")) {
        const errorMessages = JSON.parse(error.replace("Validation failed:", "").trim());
  
        Object.entries(errorMessages).forEach(([field, message]) => {
          ToasterContainer(`Error : ${field}`, message, "error");
        });
      } else {
        ToasterContainer("Error", error, "error");
      }
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
