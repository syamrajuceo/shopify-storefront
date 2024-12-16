import { Outlet } from "react-router-dom";
import NavabarComponent from "../components/Shared/Navabar.component";
import FooterComponent from "../components/Shared/Footer.component";
import { useEffect, useState } from "react";
import { fetchCart } from "../store/cart";
import useShopifyStore from "../store/useShopifyStore";

function Navlayout() {
  const [fetchedCart, setFetchedCart] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null)
  const products = useShopifyStore((state) => state.products);
  const [filterProducts, setFilterProducts] = useState([]);
  const fetchCartData = async () => {
    const data = await fetchCart();
    setFetchedCart(data);
  };

  useEffect(() => {
    fetchCartData();
  }, []);
  useEffect(() => {
    setFilterProducts(() => {
      if (searchQuery) {
        return products.filter((product) => {
          return product.title.toLowerCase().includes(searchQuery.toLowerCase());
        });
      }
      return products; // Return all products if no search query
    });
  }, [searchQuery, products]);

  // const handleSearch = (searchQuery) => {
  //   console.log("Search Query:", searchQuery);
  //   // setQuery(searchQuery); 
  // };

  return (
    <div>
      <NavabarComponent
        cartnumber={fetchedCart?.quantity || 0}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResult={filterProducts}
      />
      <div className="min-h-[160px]">
        <Outlet />
      </div>

      <FooterComponent />
    </div>
  );
}

export default Navlayout;
