import toast from "react-hot-toast";
import AddressForm from "./AddressForm";
import { addUserAddress } from "./ProfileController";
import ToasterContainer from "../Toaster/ToasterContainer";

function AddSettings({ user, onSave }) {
  console.log(user)
  const handleFormSubmit = async (newAddress) => {
    const { data, error } = await addUserAddress(newAddress);
  
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
