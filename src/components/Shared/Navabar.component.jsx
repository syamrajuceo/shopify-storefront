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
import basari from "../../assets/basari.png"
import flag from "../../assets/Flags.png"
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



function NavabarComponent({ cartnumber = 0, searchResult, setSearchQuery, searchQuery, querytype }) {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (e) => {

    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % searchResult.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex <= 0 ? searchResult.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && searchResult[selectedIndex]) {
        // Navigate to the selected item's link
        const selectedItem = searchResult[selectedIndex];
        navigate(`/product/${selectedItem.handle}`);
      } else if (searchQuery?.trim() !== "") {
        // If no item is selected, navigate to the query page
        navigate(`/query?query=${encodeURIComponent(searchQuery)}`);
      }
      setSearchQuery('')
    }
  };

  return (
    <div className="bg-[#0000001C] p-1">
      {/* Top Section */}
      <div className="flex justify-between p-4 items-center text-md lg:text-xl">
        <img src={logo} alt="logo" className="hidden sm:block cursor-pointer" onClick={() => navigate('/')}
        />
        <div className="flex sm:hidden gap-5 items-center">
          <img src={basari} alt="logo" className="cursor-pointer h-[33.52px] w-[78.64px]" onClick={() => navigate('/')} />
          <div className="flex gap-2 items-center">
            <h1 className="opacity-65">Country</h1>
            <img src={flag} alt="flag" className="h-[15px] w-[21px] " />
          </div>

        </div>

        <div className="hidden sm:flex bg-[#F3F4F6] items-center h-[40px] sm:w-[300px] md:w-[400px] lg:w-[600px] relative rounded-lg">
          <input
            type="search"
            placeholder="Search for products, categories or brands..."
            className="w-full bg-[#F3F4F6] text-[#6B7280] h-[46px] px-3 text-[14px]  rounded-lg focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Link
            className="w-[40px] absolute right-1 bg-[#F3F4F6] p-2  rounded-lg"
            to={`/query?query=${searchQuery}`}
            onClick={() => setSearchQuery('')}
          >
            <IoIosSearch />
          </Link>

          <ProductSearchList
            searchQuery={searchQuery}
            searchResult={searchResult}
            setSearchQuery={setSearchQuery}
            querytype={querytype}
            selectedIndex={selectedIndex}
          />
        </div>

        <div className="flex items-center gap-4 justify-center">
          <Link className="hidden md:block text-[15px] text-[#030712] font-[600]" to={"/contact"}>Contact</Link>
          <Link to={"/login"}>
            <img src={user} alt="user" />
          </Link>
          <Link className="relative hidden md:inline-block" to="/cart">
            {/* <img src={cart} alt="Go to cart" className="w-6 h-6" /> */}
            <FaShoppingCart className="text-2xl text-gray-700" />
            {cartnumber > 0 && (
              <span className={`absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rounded-full px-${cartnumber > 99 ? '3' : '2'} py-1 text-xs bg-red-500 text-white`}>
                {cartnumber > 99 ? "99+" : cartnumber}
              </span>
            )}
          </Link>

        </div>
      </div>
      <div className="flex sm:hidden  bg-[#F3F4F6] items-center h-[40px] w-[90%] mx-auto my-3 relative  rounded-lg">
        <input
          type="search"
          placeholder="Search for products, categories or brands..."
          className="w-full bg-[#F3F4F6] text-[#6B7280] h-[46px] px-3 text-[14px]  rounded-lg focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Link
          className="w-[40px] absolute right-1 bg-[#F3F4F6] p-2  rounded-lg"
          to={`/query?query=${searchQuery}`}
          onClick={() => setSearchQuery('')}
        >
          <IoIosSearch />
        </Link>

        <ProductSearchList
          searchQuery={searchQuery}
          searchResult={searchResult}
          setSearchQuery={setSearchQuery}
          querytype={querytype}
          selectedIndex={selectedIndex}
          small={true}
        />
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
      {/* EMI Section */}
      <div className="flex sm:hidden items-center justify-between  p-2">
        <span className="text-sm font-medium">Buy on EMI with</span>
        <div className="flex gap-2">
          <img src={tamara} alt="Tamara" className="h-6" />
          <img src={tabby} alt="Tabby" className="h-6" />
        </div>
      </div>
    </div>
  );
}

export default NavabarComponent;


