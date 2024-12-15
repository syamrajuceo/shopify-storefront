import { useEffect, useState } from "react";
import CollectionComponent from "../components/Collection/Collection.component";
import useShopifyStore from "../store/useShopifyStore";
import ScrollToTop from "../utils/ScrollToTop";

function EyeGlasses() {
  // const [eyeGlassesProducts, setEyeGlassesProducts] = useState([]);
  ScrollToTop()
  const products = useShopifyStore((state) => state.products);

  // useEffect(() => {
  //   if (products && products.length > 0) {
  //     const filteredProducts = products.filter((product) => product.productType === "eyeglasses");
  //     setEyeGlassesProducts(filteredProducts);
  //     console.log(JSON.stringify(products))
  //   }
  // }, [products]);

  return (
    <div>
      <CollectionComponent products={products}  type="EyeGlasses"/>
    </div>
  );
}

export default EyeGlasses;
