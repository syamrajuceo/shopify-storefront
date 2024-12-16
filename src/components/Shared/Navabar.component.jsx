import logo from "../../assets/logo.png";
import user from "../../assets/user.png";
import cart from "../../assets/cart.png";
import { IoIosSearch } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import LinkData from "../../data/Link.data.json";
import tamara from "../../assets/tamara.png";
import tabby from "../../assets/tabby.png";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import MobileLinkData from "../../data/Moblielink.data.json";
import { useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { BiSolidTagAlt } from "react-icons/bi";
import ProductSearchList from "./ProductSeatchlist";
const iconMapping = {
  FaHome: <FaHome className="text-yellow-500 text-2xl" />,
  FaOffer: <BiSolidOffer className="text-red-600 text-2xl" />,
  FaTag: (
    <BiSolidTagAlt
      className="text-blue-600 text-2xl"
      style={{ transform: "rotate(270deg)" }}
    />
  ),
  FaShoppingCart: <FaShoppingCart className="text-blue-500 text-2xl" />
};



function NavabarComponent({ cartnumber = 0, searchResult, setSearchQuery, searchQuery }) {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);


  return (
    <div className="bg-slate-100">
      {/* Top Section */}
      <div className="flex justify-between p-4 items-center text-md lg:text-xl">
        <img src={logo} alt="logo" className="cursor-pointer" onClick={() => navigate('/')}
        />
        <div className="hidden sm:flex bg-slate-200 items-center h-[40px] sm:w-[300px] md:w-[400px] lg:w-[600px] relative">
          <input
            type="search"
            placeholder="Search for products, categories or brands..."
            className="w-full bg-slate-200 h-[40px] px-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link className="w-[40px] p-2" to={`/query?query=${searchQuery}`} onClick={() => setSearchQuery('')}>
            <IoIosSearch />
          </Link>

          <ProductSearchList searchQuery={searchQuery} searchResult={searchResult} />
        </div>
        <div className="flex items-center gap-2">
          <Link className="hidden md:block" to={"/contact"}>Contact</Link>
          <Link to={"/login"}>
            <img src={user} alt="user" />
          </Link>
          <Link className="relative" to={"/cart"}>
            <img src={cart} alt="cart" />
            <span className="absolute top-[-13px] bg-red-500 rounded-[100%] p-1 text-xs text-slate-50">
              {cartnumber}
            </span>
          </Link>
        </div>
      </div>
      <div className="flex sm:hidden  bg-slate-200 items-center h-[40px] w-[90%] mx-auto my-3 relative">
        <input
          type="search"
          placeholder="Search for products, categories or brands..."
          className="w-full bg-slate-200 h-[40px] px-3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link className="w-[40px] p-2" to={`/query?query=${searchQuery}`} onClick={() => setSearchQuery(null)}>
          <IoIosSearch />
        </Link>

        <ProductSearchList searchQuery={searchQuery} small={true} searchResult={searchResult} />
      </div>
      {/* Bottom Section */}
      <div className="hidden md:flex items-center justify-between border-t px-4 py-2 relative">
        {/* Navigation Links */}
        <MdClose className={`${hidden ? 'hidden' : ''} md:hidden text-xl absolute top-0 right-4 `} onClick={() => setHidden(true)} />

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
      <div className="block md:hidden fixed bottom-[0%] z-20 w-full p-3 bg-slate-300">

        <div className="flex justify-between w-full">
          {MobileLinkData.map((linkobj, index) => (
            <NavLink
              key={index}
              to={linkobj.url === "/home" ? "/" : linkobj.url}
              className={({ isActive }) =>
                isActive
                  ? "flex  flex-col items-center sm:gap-2 text-blue-600 font-bold"
                  : "flex  flex-col items-center sm:gap-2 text-gray-800 hover:text-blue-600"
              }
            >
              {iconMapping[linkobj.icon]}
              <span>{linkobj.name}</span>
            </NavLink>
          ))}
        </div>



      </div>
    </div>
  );
}

export default NavabarComponent;


