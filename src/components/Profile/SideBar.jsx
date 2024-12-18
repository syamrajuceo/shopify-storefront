import { AccountCircle, Settings, Home, ExitToApp, AddLocationAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function SideBar({ pageShow, setPageShow }) {
  // Use navigate to update the URL
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    // Update the page state
    setPageShow(page);

    // Define a mapping of page names to URL query params
    const pageToTabMap = {
      "Dashboard": "dashboard",
      "Address": "address",
      "Edit Settings": "edit-address",
      "Add Address": "add-address",
      "My Orders": "order",
    };

    // Navigate based on the page
    const activeTab = pageToTabMap[page];

    // Navigate if it's not logout, otherwise just redirect
    if (page === "Logout") {
      localStorage.clear();  // Clear local storage before redirecting
      navigate("/");  
      window.location.reload();// Redirect to the homepage ("/")
    } else {
      navigate(`/profile?activetab=${activeTab}`);
    }
  };

  return (
    <div className="md:w-64 bg-white text-black h-[80%] p-6 flex flex-col">
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => handlePageChange("Dashboard")}
            className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "Dashboard" ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white text-black"}`}
          >
            <Home className="mr-3" /> Dashboard
          </button>
        </li>

        <li>
          <button
            onClick={() => handlePageChange("Address")}
            className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "Address" ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white text-black"}`}
          >
            <AccountCircle className="mr-3" /> Address
          </button>
        </li>

        <li>
          <button
            onClick={() => handlePageChange("Add Address")}
            className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "Add Address" ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white text-black"}`}
          >
            <AddLocationAlt className="mr-3" /> Add Address
          </button>
        </li>

        {pageShow === "Edit Settings" && (
          <li>
            <button
              onClick={() => handlePageChange("Edit Settings")}
              className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "Edit Settings" ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white text-black"}`}
            >
              <Settings className="mr-3" /> Edit Settings
            </button>
          </li>
        )}

        <li>
          <button
            onClick={() => handlePageChange("My Orders")}
            className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "My Orders" ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white text-black"}`}
          >
            <Home className="mr-3" /> My Orders
          </button>
        </li>

        <li>
          <button
            onClick={() => handlePageChange("Logout")}
            className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "Logout" ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white text-black"}`}
          >
            <ExitToApp className="mr-3" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
