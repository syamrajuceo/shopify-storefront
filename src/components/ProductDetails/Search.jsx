import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import ProductSearchList from "../Shared/ProductSeatchlist";
import { useDispatch } from "react-redux";
import { clearSearchProducts, fetchSearchProducts } from "../../redux/slices/search";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const queryType = "Product";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const debounceTimer = useRef(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:5558/api/products/search?search=${searchQuery}`
      );

      console.log("API response:", response.data);
      const productList = response.data?.products || [];
      setSearchResult(productList);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim() === "") return;
    
    // Clear previous search results
    dispatch(clearSearchProducts());
    
    // Fetch initial search results
    dispatch(fetchSearchProducts({ search: searchQuery }))
      .unwrap()
      .then(() => {
        // Navigate to search results page
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      })
      .catch((err) => {
        console.error("Search error:", err);
      });
    
    // Clear the search input
    setSearchQuery("");
  };

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      if (searchQuery.trim() !== "") fetchProducts();
    }, 500);

    return () => clearTimeout(debounceTimer.current);
  }, [searchQuery, fetchProducts]);

//   const handleKeyDown = (e) => {
//     if (e.key === "ArrowDown") {
//       setSelectedIndex((prev) => Math.min(prev + 1, searchResult.length - 1));
//     } else if (e.key === "ArrowUp") {
//       setSelectedIndex((prev) => Math.max(prev - 1, 0));
//     } else if (e.key === "Enter") {
//       if (selectedIndex >= 0) {
//         // Navigate to product page if an item is selected
//         const selectedProduct = searchResult[selectedIndex];
//         window.location.href = /product/${selectedProduct.handle};
//       } else {
//         // Submit search if no item is selected
//         handleSearchSubmit();
//       }
//     }
//   };

  return (
    <div className="relative w-full flex justify-center mt-4">
      <div className="hidden sm:flex bg-[#F3F4F6] items-center h-[40px] sm:w-[300px] md:w-[400px] lg:w-[600px] relative rounded-lg">
        <input
          type="search"
          placeholder="Search for products, categories or brands..."
          className="w-full bg-[#F3F4F6] text-[#6B7280] h-[46px] px-3 text-[14px] rounded-lg focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        //   onKeyDown={handleKeyDown}
        />
        <button
          className="w-[40px] absolute right-1 bg-[#F3F4F6] p-2 rounded-lg"
          onClick={handleSearchSubmit}
        >
          <IoIosSearch />
        </button>

        <ProductSearchList
          searchQuery={searchQuery}
          searchResult={searchResult}
          setSearchQuery={setSearchQuery}
          queryType={queryType}
          selectedIndex={selectedIndex}
        />
      </div>
    </div>
  );
};

export default SearchComponent;