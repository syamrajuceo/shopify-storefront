import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CollectionComponent from "../components/Collection/Collection.component";
// import useShopifyStore from "../store/useShopifyStore";
import ScrollToTop from "../utils/ScrollToTop";
import { useSelector } from "react-redux";

function ShapePage() {
  ScrollToTop()
  const [shapeProducts, setShapeProducts] = useState([]);
  // const products = useShopifyStore((state) => state.products);
  const { products, status, error } = useSelector((state) => state.products);

  // Get the location object
  const location = useLocation();

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search); 
  const desiredValue = queryParams.get("shape");

  useEffect(() => {
    if (products && products.length > 0 && desiredValue) {
       
      // Filter products by "eyewear-frame-design" shape
      const filteredProducts = products.filter((product) => {
        return (
          product.metafields &&
          product.metafields.some(
            (metaobj) =>
              metaobj.key === "eyewear-frame-design" &&
              Array.isArray(metaobj.metavalue) &&
              metaobj.metavalue.some(
                (obj) => obj.handle.toUpperCase() === desiredValue.toUpperCase() 
              )
          )
        );
      });
      setShapeProducts(filteredProducts);
    }
  }, [products, desiredValue]); // Dependencies are products and desiredValue

  return (
    <div>
      <ScrollToTop />
      <CollectionComponent products={shapeProducts} type={`Shape > ${desiredValue}`} />
    </div>
  );
}

export default ShapePage;
