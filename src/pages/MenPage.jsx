import { useEffect, useState } from "react";
import CollectionComponent from "../components/Collection/Collection.component";
import useShopifyStore from "../store/useShopifyStore";

function MenPage() {
  const products = useShopifyStore((state) => state.products);

 
  return (
    <div>
      <CollectionComponent products={products} type="Men" />
    </div>
  );
}

export default MenPage;
