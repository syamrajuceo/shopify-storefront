import { useEffect, useState } from "react";
import CollectionComponent from "../components/Collection/Collection.component";
import useShopifyStore from "../store/useShopifyStore";
import ScrollToTop from "../utils/ScrollToTop";
function ContactLenses() {
  ScrollToTop()
  const [contactLensesProducts, setContactLensesProducts] = useState([]);
  const products = useShopifyStore((state) => state.products);

  useEffect(() => {
    if (products && products.length > 0) {
      const filteredProducts = products.filter((product) => product.productType === "Contactlenses");
      setContactLensesProducts(filteredProducts);
      console.log(JSON.stringify(products))
    }
  }, [products]);

  return (
    <div>
      <CollectionComponent products={contactLensesProducts}  type="ContactLenses"/>
    </div>
  );
}

export default ContactLenses;
