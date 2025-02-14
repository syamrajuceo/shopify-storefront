// import React from "react";
// import { ProductCard } from "../productCard/ProductCard";
// import useShopifyStore from "../../store/useShopifyStore";

// export const ProductListing = () => {
//   const products = useShopifyStore((state) => state.products);

//   console.log(products)
//   return (
//     <div className="product-listing">
//       {products?.length > 0 ? (
//         products.map(
//           (product) =>
//             product && <ProductCard key={product.id} product={product} />
//         )
//       ) : (
//         <p>No products available</p>
//       )}
//     </div>
//   );
// };
