import { useEffect, useState } from "react";
import CollectionComponent from "../components/Collection/Collection.component";
import useShopifyStore from "../store/useShopifyStore";
import ScrollToTop from "../utils/ScrollToTop";
function SunGlasses() {
  ScrollToTop()
  const [sunGlassesProducts, setSunGlassesProducts] = useState([]);
  const products = useShopifyStore((state) => state.products);

  useEffect(() => {
    if (products && products.length > 0) {
      const filteredProducts = products.filter((product) => product.productType === "Sunglasses");
      setSunGlassesProducts(filteredProducts);
      console.log(JSON.stringify(products))
    }
  }, [products]);

  return (
    <div>
      <CollectionComponent products={sunGlassesProducts}  type="Sunglasses"/>
    </div>
  );
}

export default SunGlasses;
