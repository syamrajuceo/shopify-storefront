import { useState } from "react";
import ViewAddress from "./ViewAddress";

function AddressList({ addresses, onEdit, onDelete }) {
  const [showAllAddresses, setShowAllAddresses] = useState(false);

  const handleShowAllToggle = () => {
    setShowAllAddresses((prev) => !prev);
  };

  const addressesToDisplay = showAllAddresses ? addresses : addresses.slice(0, 1);

  return (
    <div>
      {addressesToDisplay.length === 0 ? (
        <p className="text-center text-xl text-gray-600">No addresses available</p>
      ) : (
        addressesToDisplay.map((address) => (
          <ViewAddress
            key={address.node.id}
            firstName={address.node.firstName}
            lastName={address.node.lastName}
            address1={address.node.address1}
            address2={address.node.address2}
            city={address.node.city}
            country={address.node.country}
            zip={address.node.zip}
            phone={address.node.phone}
            onEdit={() => onEdit(address.node)}
            onDelete={() => onDelete(address.node.id)}
          />
        ))
      )}
      <button
        className="mt-4 px-4 py-2 text-white bg-blue-500 rounded"
        onClick={handleShowAllToggle}
      >
        {showAllAddresses ? "Show Less" : "Show All"}
      </button>
    </div>
  );
}

export default AddressList;
