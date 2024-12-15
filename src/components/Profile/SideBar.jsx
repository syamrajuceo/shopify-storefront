import { AccountCircle, Settings, Home, ExitToApp, AddLocationAlt } from "@mui/icons-material";

function SideBar({ pageShow, setPageShow }) {
  const handlePageChange = (page) => {
    setPageShow(page);
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-[80%] p-6 flex flex-col">
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => handlePageChange("Dashboard")}
            className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "Dashboard" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
          >
            <Home className="mr-3" /> Dashboard
          </button>
        </li>

        <li>
          <button
            onClick={() => handlePageChange("Address")}
            className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "Address" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
          >
            <AccountCircle className="mr-3" /> Address
          </button>
        </li>

        <li>
          <button
            onClick={() => handlePageChange("Add Address")}
            className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "Add Address" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
          >
            <AddLocationAlt className="mr-3" /> Add Address
          </button>
        </li>
        {pageShow === "Edit Settings"&&<li>
          <button
            onClick={() => handlePageChange("Edit Settings")}
            className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "Edit Settings" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
          >
            <Settings className="mr-3" /> Edit Settings
          </button>
        </li>}

        <li>
          <button
            onClick={() => handlePageChange("My Orders")}
            className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "My Orders" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
          >
            <Home className="mr-3" /> My Orders
          </button>
        </li>

        <li>
          <button
            onClick={() => handlePageChange("Logout")}
            className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "Logout" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
          >
            <ExitToApp className="mr-3" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
