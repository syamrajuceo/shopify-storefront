import { Outlet } from "react-router-dom";
import NavabarComponent from "../components/Shared/Navabar.component";
import FooterComponent from "../components/Shared/Footer.component";
import { useEffect, useState } from "react";
import { fetchCart } from "../store/cart";
import useShopifyStore from "../store/useShopifyStore";

function Navlayout() {
  const [fetchedCart, setFetchedCart] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const products = useShopifyStore((state) => state.products);
  const [filterProducts, setFilterProducts] = useState([]);
  const [querytype, setQueryType] = useState("Product");
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
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
  

  // Filter products based on the search query
  useEffect(() => {
    if (searchQuery) {
      const searchQueryNumber = parseFloat(searchQuery);
      const isValidNumber = !isNaN(searchQueryNumber);

      if (isValidNumber) {
        // Filter by price
        setQueryType("Price");
        setFilterProducts(
          products.filter((product) =>
            product.variants.edges[0].node.priceV2.amount.includes(
              searchQueryNumber.toString()
            )
          )
        );
      } else {
        // Filter by product title
        const titleFiltered = products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (titleFiltered.length > 0) {
          setQueryType("Product");
          setFilterProducts(titleFiltered);
        } else {
          // If no result for title, filter by vendor
          const vendorFiltered = products.filter((product) =>
            product.vendor.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (vendorFiltered.length > 0) {
            setQueryType("Vendor");
            setFilterProducts(vendorFiltered);
          } else {
            // Search by specific metafields (color-pattern, age-group, etc.)
            const keysToSearch = [
              "color-pattern",
              "age-group",
              "eyewear-frame-design",
              "target-gender",
              "fabric"
            ];

            let found = false;
            let resultkey = ""
            for (let key of keysToSearch) {
              const metafieldFiltered = products.filter((product) =>
                product.metafields.some((metafield) =>
                  metafield.key === key &&
                  metafield.metavalue.some((metaValue) => {
                    // Check if the handle matches the search query
                    const isMatch = metaValue.handle.toLowerCase().includes(searchQuery.toLowerCase());

                    if (isMatch) {
                      // If a match is found, store the handle value for use in querytype
                      resultkey = metaValue.handle;
                    }

                    return isMatch; // Return whether the search query matches
                  })
                )
              );


              if (metafieldFiltered.length > 0) {

                const capitalizedKey = capitalizeFirstLetter(key);
                const capitalizedResultKey = capitalizeFirstLetter(resultkey);

                // Set the querytype with capitalized key and resultkey
                setQueryType(`${capitalizedKey} : ${capitalizedResultKey}`);
                setFilterProducts(metafieldFiltered);
                found = true;
                break; // Stop once a match is found for a key
              }
            }

            // If no metafield matches found, fall back to "Metafield" search
            if (!found) {
              setQueryType("Metafield");
              setFilterProducts([]);
            }
          }
        }
      }
    } else {
      // If no search query, show all products
      setFilterProducts(products);
    }
  }, [searchQuery, products]);


  return (
    <div>
      <NavabarComponent
        cartnumber={fetchedCart?.quantity || 0}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResult={filterProducts}
        querytype={querytype}
      />
      <div className="min-h-[160px]">
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
}

export default Navlayout;
