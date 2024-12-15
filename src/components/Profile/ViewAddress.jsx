function ViewAddress({ firstName, lastName, address1, address2, city, country, zip, phone, onEdit, onDelete }) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-6">
      <div className="flex justify-center mb-4">
        <img
          className="w-[200px] h-[200px] rounded-full border-4 border-gray-300"
          src={"https://randomuser.me/api/portraits/men/1.jpg"}
          alt="User Avatar"
        />
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center">{`${firstName} ${lastName}`}</h2>
        <p className="mt-4 text-lg text-gray-600">{`${address1}, ${address2}`}</p>
        <p className="text-lg text-gray-600">{`${city}, ${country} - ${zip}`}</p>
        <p className="mt-2 text-lg text-gray-600">Phone: {phone}</p>

        <div className="flex justify-between mt-6">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewAddress;
