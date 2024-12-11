import logo from "../../assets/logo.png";
import user from "../../assets/user.png";
import cart from "../../assets/cart.png";
import { IoIosSearch } from "react-icons/io";
import { NavLink } from "react-router-dom";
import LinkData from "../../data/Link.data.json";
import tamara from "../../assets/tamara.png";
import tabby from "../../assets/tabby.png";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

function NavabarComponent({ cartnumber = 0, getSearchData }) {
  const [hidden, setHidden] = useState(true);
  const handleSearchInput = (event) => {
    if (getSearchData) {
      getSearchData(event.target.value);
    }
  };

  return (
    <div className="bg-slate-100">
      {/* Top Section */}
      <div className="flex justify-between p-4 items-center text-md lg:text-xl">
        <img src={logo} alt="logo" />
        <div className="hidden sm:flex bg-slate-200 items-center h-[40px] sm:w-[300px] md:w-[400px] lg:w-[600px]">
          <input
            type="search"
            placeholder="Search for products, categories or brands..."
            className="w-full bg-slate-200 h-[40px] px-3"
            onChange={handleSearchInput}
          />
          <button className="w-[40px] p-2">
            <IoIosSearch />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button>Contact</button>
          <button>
            <img src={user} alt="user" />
          </button>
          <button className="relative">
            <img src={cart} alt="cart" />
            <span className="absolute top-[-13px] bg-red-500 rounded-[100%] p-1 text-xs text-slate-50">
              {cartnumber}
            </span>
          </button>
        </div>
      </div>
      <div className="flex sm:hidden  bg-slate-200 items-center h-[40px] w-[90%] mx-auto">
        <input
          type="search"
          placeholder="Search for products, categories or brands..."
          className="w-full bg-slate-200 h-[40px] px-3"
          onChange={handleSearchInput}
        />
        <button className="w-[40px] p-2">
          <IoIosSearch />
        </button>
      </div>
      {/* Bottom Section */}
      <div className="sm:flex items-center justify-between border-t px-4 py-2 relative">
        {/* Navigation Links */}
        <MdClose className={`${hidden ?  'hidden':''} md:hidden text-xl absolute top-0 right-4 `}  onClick={() => setHidden(true)}/>

        <FaBars className={`${hidden ? ' ' : 'hidden'} md:hidden text-xl absolute top-0 right-4 `} onClick={() => setHidden(false)} />

        <div className={`${hidden ? 'hidden ' : ''}md:flex gap-4`}>
          {LinkData.map((linkobj) => (
            <NavLink
              to={linkobj.url === "/home" ? "/" : linkobj.url}
              key={linkobj.name}
              className={({ isActive }) =>
                `block p-2 ${isActive
                  ? "text-blue-500 font-bold border-b-2 border-blue-500"
                  : "text-gray-700"
                }`
              }
            >
              {linkobj.name}
            </NavLink>
          ))}
        </div>



        {/* EMI Section */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Buy on EMI with</span>
          <img src={tamara} alt="Tamara" className="h-6" />
          <img src={tabby} alt="Tabby" className="h-6" />
        </div>
      </div>
    </div>
  );
}

export default NavabarComponent;


