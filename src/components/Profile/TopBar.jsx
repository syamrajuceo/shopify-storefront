import { AccountCircle, Settings, Home, ExitToApp, AddLocationAlt, Menu, Close } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TopBar({ pageShow, setPageShow, user }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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

    const activeTab = pageToTabMap[page];

    if (page === "Logout") {
      localStorage.clear();
      navigate("/");  // Redirect to the homepage
    } else {
      navigate(`/profile?activetab=${activeTab}`);
    }

    // Close the menu on page change
    setMenuOpen(false);
  };

  return (
    <div className="block md:hidden bg-white text-black p-6 fixed top-0 left-0 right-0 z-50">
      {/* Hamburger Menu Button */}
      <div className="flex justify-between items-center">
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="text-black p-2 rounded-md focus:outline-none"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <Close /> : <Menu />} {/* Toggle between Menu and Close icon */}
        </button>
        
        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <img
            className="w-12 h-12 rounded-full border-2 border-white"
            src={user.profilePicture || "https://randomuser.me/api/portraits/men/1.jpg"}
            alt="User Avatar"
            loading="lazy"
          />
          <div>
            <h2 className="text-lg font-semibold">{`${user.firstName || "Unknown"} ${user.lastName || "User"}`}</h2>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      {menuOpen && (
        <ul className="mt-4 space-y-4">
          {/* Dashboard Link */}
          <li>
            <button
              onClick={() => handlePageChange("Dashboard")}
              className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "Dashboard" ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white text-black"}`}
            >
              <Home className="mr-3" /> Dashboard
            </button>
          </li>

          {/* Address Link */}
          <li>
            <button
              onClick={() => handlePageChange("Address")}
              className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "Address" ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white text-black"}`}
            >
              <AccountCircle className="mr-3" /> Address
            </button>
          </li>

          {/* Add Address Link */}
          <li>
            <button
              onClick={() => handlePageChange("Add Address")}
              className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "Add Address" ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white text-black"}`}
            >
              <AddLocationAlt className="mr-3" /> Add Address
            </button>
          </li>

          {/* Edit Settings Link - Conditional */}
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

          {/* My Orders Link */}
          <li>
            <button
              onClick={() => handlePageChange("My Orders")}
              className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "My Orders" ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white text-black"}`}
            >
              <Home className="mr-3" /> My Orders
            </button>
          </li>

          {/* Logout Link */}
          <li>
            <button
              onClick={() => handlePageChange("Logout")}
              className={`flex items-center px-4 py-2 rounded-lg transition-all w-full ${pageShow === "Logout" ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white text-black"}`}
            >
              <ExitToApp className="mr-3" /> Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default TopBar;
