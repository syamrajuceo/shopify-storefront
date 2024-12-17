import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CollectionComponent from '../components/Collection/Collection.component';
import useShopifyStore from '../store/useShopifyStore';
import { useLocation } from 'react-router-dom';

function SearchPage() {
  const navigate = useNavigate();
  const [searchQueryProducts, setSearchQueryProducts] = useState([]);
  const [resultType, setResultType] = useState("Product");
  const products = useShopifyStore((state) => state.products);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');

  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== '') {
      const searchQueryNumber = parseFloat(searchQuery);
      const isValidNumber = !isNaN(searchQueryNumber);

      if (isValidNumber) {
        const filteredProducts = products.filter((product) =>
          parseFloat(product.variants.edges[0].node.priceV2.amount) === searchQueryNumber
        );
        setSearchQueryProducts(filteredProducts);
        setResultType("Price");
      } else {
        // Search by title
        let filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // If no product found by title, try searching by vendor
        if (filteredProducts.length === 0) {
          filteredProducts = products.filter((product) =>
            product.vendor.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (filteredProducts.length > 0) {
            setResultType("Vendor");
          } else {
            // If no product found by vendor, try searching by productType
            filteredProducts = products.filter((product) =>
              product.productType.toLowerCase().includes(searchQuery.toLowerCase())
            );
            if (filteredProducts.length > 0) {
              setResultType("ProductType");
            }else{
             // Search by specific metafields (color-pattern, age-group, etc.)
             const keysToSearch = [
              "color-pattern", 
              "age-group", 
              "eyewear-frame-design", 
              "target-gender", 
              "fabric"
            ];

            let found = false;
            for (let key of keysToSearch) {
              filteredProducts = products.filter((product) =>
                product.metafields.some((metafield) =>
                  metafield.key === key && 
                  metafield.metavalue.some((metaValue) =>
                    metaValue.handle.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                )
              );

              if (filteredProducts.length > 0) {
                setResultType(`Metafield > ${key}`);
                found = true;
                break; // Stop once a match is found for a key
              }
            }

            // If no metafield matches found, fall back to "Metafield" search
            if (!found) {
              setResultType("Metafield");
            }
          }
          }
        } else {
          setResultType("Product");
        }

        setSearchQueryProducts(filteredProducts);
      }
    } else {
      setSearchQueryProducts(products); // Show all products if no query
      setResultType("Product");
    }
  }, [products, searchQuery]);

  return (
    <div>
      <CollectionComponent
        products={searchQueryProducts}
        type={`${!isNaN(parseFloat(searchQuery)) && searchQuery.trim() !== ''
          ? `Price > ${searchQuery}`
          : `${resultType} > ${searchQuery || 'All'}`}`}
      />
    </div>
  );
}

export default SearchPage;
