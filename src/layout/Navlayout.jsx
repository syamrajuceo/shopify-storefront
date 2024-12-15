import { Outlet } from "react-router-dom";
import NavabarComponent from "../components/Shared/Navabar.component";
import FooterComponent from "../components/Shared/Footer.component";
import { useEffect, useState } from "react";
import { fetchCart } from "../store/cart";

function Navlayout() {
  const [fetchedCart, setFetchedCart] = useState(null);

  const fetchCartData = async () => {
    const data = await fetchCart();
    setFetchedCart(data);
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleSearch = (searchQuery) => {
    console.log("Search Query:", searchQuery);
    // setQuery(searchQuery); 
  };

  return (
    <div>
      <NavabarComponent
        cartnumber={fetchedCart?.quantity || 0}
        getSearchData={handleSearch}
      />
      <div className="min-h-[160px]">
        <Outlet />
      </div>

      <FooterComponent />
    </div>
  );
}

export default Navlayout;
