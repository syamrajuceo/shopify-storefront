// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSearchProducts, clearSearchProducts } from "../../redux/slices/search";

// const ProductItem = React.memo(({ product = [], isLast, lastProductRef }) => {
//   const mainImage = product.images?.edges?.[0]?.node;
//   const variant = product.variants?.edges?.[0]?.node;

//   return (
//     <div
//       ref={isLast ? lastProductRef : null}
//       style={{
//         borderBottom: "1px solid #ccc",
//         marginBottom: "1rem",
//         paddingBottom: "1rem",
//       }}
//     >
//       <h3>{product.title}</h3>
//       <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

//       {variant && (
//         <div>
//           <p>Price: {variant.priceV2.amount} {variant.priceV2.currencyCode}</p>
//           {variant.compareAtPriceV2 && (
//             <p>
//               <s>Original: {variant.compareAtPriceV2.amount} {variant.compareAtPriceV2.currencyCode}</s>
//             </p>
//           )}
//         </div>
//       )}

//       {mainImage?.url && (
//         <img
//           src={mainImage.url}
//           alt={mainImage.altText || product.title}
//           width="150"
//           style={{ marginTop: "0.5rem" }}
//         />
//       )}
//     </div>
//   );
// });

// const SearchComponent = () => {
//   const dispatch = useDispatch();
//   const [search, setSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");

//   const {
//     items: products =[],
//     loading,
//     error,
//     hasNextPage,
//     cursor
//   } = useSelector((state) => state.searchProducts);

//   // Debug state changes
//   useEffect(() => {
//     console.log("Search state updated:", {
//       products,
//       loading,
//       error,
//       hasNextPage,
//       cursor,
//       debouncedSearch
//     });
//   }, [products, loading, error, hasNextPage, cursor, debouncedSearch]);

//   // Debounce search input
//   useEffect(() => {
//     const delay = setTimeout(() => {
//       setDebouncedSearch(search);
//     }, 500);

//     return () => clearTimeout(delay);
//   }, [search]);

//   // Fetch products when debouncedSearch changes
//   useEffect(() => {
//     if (debouncedSearch.trim() === "") {
//       dispatch(clearSearchProducts());
//       return;
//     }

//     dispatch(fetchSearchProducts({ search: debouncedSearch }));
//   }, [debouncedSearch, dispatch]);

//   const observer = useRef();
//   const lastProductRef = useCallback(
//     (node) => {
//       if (loading || !hasNextPage || !node) return;

//       if (observer.current) observer.current.disconnect();

//       observer.current = new IntersectionObserver(
//         (entries) => {
//           if (entries[0].isIntersecting && hasNextPage && !loading) {
//             console.log('Loading more products with cursor:', cursor);
//             dispatch(fetchSearchProducts({
//               search: debouncedSearch,
//               cursor
//             }));
//           }
//         },
//         { threshold: 0.1 }
//       );

//       observer.current.observe(node);
//     },
//     [loading, hasNextPage, cursor, debouncedSearch, dispatch]
//   );

//   return (
//     <div style={{ padding: '1rem' }}>
//       <input
//         type="text"
//         placeholder="Search products..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         style={{
//           padding: '0.5rem',
//           width: '100%',
//           maxWidth: '500px',
//           fontSize: '1rem'
//         }}
//       />

//       <div style={{ marginTop: "1rem" }}>
//         {loading && !products.length && (
//           <p>Searching for products...</p>
//         )}

//         {error && (
//           <p style={{ color: "red" }}>Error: {error}</p>
//         )}

//         {!loading && products.length === 0 && debouncedSearch && (
//           <p>No products found for "{debouncedSearch}"</p>
//         )}

//         {products.map((product, index) => {
//           const isLast = index === products.length - 1;
//           return (
//             <ProductItem
//               key={product.id}
//               product={product}
//               isLast={isLast}
//               lastProductRef={lastProductRef}
//             />
//           );
//         })}

//         {loading && products.length > 0 && (
//           <p style={{ textAlign: 'center', padding: '1rem' }}>
//             Loading more products...
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchComponent;

// ---------------------------------------------------

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const SearchComponent = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchProducts = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(
//         `http://localhost:5558/api/products/search?search=${searchQuery}`
//       );

//       // Make sure to log and check the correct path to products
//       console.log("API response:", response.data);

//       // Adjust this based on your response structure
//       const productList = response.data?.products || [];

//       setProducts(productList);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to fetch products.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [searchQuery]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <input
//         type="text"
//         placeholder="Search products..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         style={{ padding: "8px", width: "300px", marginBottom: "20px" }}
//       />

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {!loading && products.length === 0 && <p>No Products Found</p>}

//       <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
//         {products &&
//           products.map((product) => (
//             <div
//               key={product._id}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: "10px",
//                 borderRadius: "8px",
//                 width: "200px",
//               }}
//             >
//               <h3>{product.name}</h3>
//               <p>{product.description}</p>
//               <p>
//                 <strong>₹{product.price}</strong>
//               </p>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default SearchComponent;

// --------------------------------
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
//         window.location.href = `/product/${selectedProduct.handle}`;
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
