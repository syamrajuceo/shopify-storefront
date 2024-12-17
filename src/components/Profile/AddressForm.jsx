import { useState } from "react";

function AddressForm({ initialValues = {}, onSubmit, onCancel }) {
  const [formValues, setFormValues] = useState({
    firstName: initialValues?.firstName || "",
    lastName: initialValues?.lastName || "",
    address1: initialValues?.address1 || "",
    address2: initialValues?.address2 || "",
    city: initialValues?.city || "",
    country: initialValues?.country || "",
    zip: initialValues?.zip || "",
    phone: initialValues?.phone || "",
  });

  // Declare isEditing to check if we are editing an existing address
  const isEditing = initialValues ? Object.keys(initialValues)?.length > 0 : false;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <div>
      {!isEditing && (
        <div className="text-center p-4 bg-yellow-200 mb-4">
          <p className="font-semibold">It looks like you're trying to edit an existing address.</p>
          <p>It seems you're attempting to use this form while editing an address in another tab. Please close all tabs related to this form, return to the website, and try again from the waiting page.</p>
        </div>
      )}


      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 border"
        />
        <input
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-2 border"
        />
        <input
          name="address1"
          value={formValues.address1}
          onChange={handleChange}
          placeholder="Address Line 1"
          className="w-full p-2 border"
        />
        <input
          name="address2"
          value={formValues.address2}
          onChange={handleChange}
          placeholder="Address Line 2"
          className="w-full p-2 border"
        />
        <input
          name="city"
          value={formValues.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-2 border"
        />
        <input
          name="country"
          value={formValues.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full p-2 border"
        />
        <input
          name="zip"
          value={formValues.zip}
          onChange={handleChange}
          placeholder="ZIP Code"
          className="w-full p-2 border"
        />
        <input
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-2 border"
        />
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onCancel} className="p-2 bg-gray-300">
            Cancel
          </button>
          <button type="submit" className="p-2 bg-blue-500 text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddressForm;
