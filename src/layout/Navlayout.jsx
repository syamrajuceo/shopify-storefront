import { Outlet } from "react-router-dom";
import NavabarComponent from "../components/Shared/Navabar.component";
import FooterComponent from "../components/Shared/Footer.component";
import { useEffect, useState } from "react";
import { fetchCart } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { searchProducts, clearSearchResults } from "../redux/slices/searchProductSlice";

function Navlayout() {
  const [fetchedCart, setFetchedCart] = useState(null);
  const dispatch = useDispatch();
  
  // const { products, status, queryType } = useSelector((state) => state.search);
  const cart = useSelector((state) => state.cart);
  
  // Fetch cart data on mount
  const fetchCartData = async () => {
    try {
      const data = await fetchCart();
      setFetchedCart(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // const handleSearch = (searchQuery) => {
  //   if (searchQuery.trim() !== "") {
  //     dispatch(searchProducts({ search: searchQuery }));
  //   } else {
  //     dispatch(clearSearchResults());
  //   }
  // };

  // In your search component
// const handleSearch = (searchTerm) => {
//   if (searchTerm.trim() === "") {
//     dispatch(clearSearchResults());
//   } else {
//     dispatch(searchProducts({ search: searchTerm, limit: null }));
//   }
// };

  return (
    <div>
      <NavabarComponent
        // cartNumber={fetchedCart?.quantity || cart.items?.length || 0}
        // searchResult={products}
        // searchStatus={status}
        // onSearch={handleSearch}
        // queryType={queryType}
      />
      <div className="min-h-[160px]">
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
}

export default Navlayout;