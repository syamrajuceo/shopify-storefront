// import React from "react";
// import {
//   Card,
//   CardBody,
//   CardButton,
//   CardDelivery,
//   CardDeliverySpan,
//   CardDeliveryText,
//   CardHeading,
//   CardImage,
//   CardImageContainer,
//   CardOff,
//   CardOffPrice,
//   CardOffText,
//   CardPrice,
//   CardPriceText,
// } from "../../ui/CardStyle";
// import expressLogo from "../../assets/Frame 390 1.png";
// import deliveryLogo from "../../assets/Group.png";

// export const ProductCard = ({product}) => {
//   console.log("product :", product);
//   const { title, descriptionHtml, images, variants,id } = product;
//   const productImage = images && images?.edges[0]?.node?.url;
//   const discountPrice = variants && variants.edges[0]?.node?.priceV2?.amount;
//   const originalPrice =
//     variants && variants.edges[0]?.node?.compareAtPriceV2?.amount;
//   const productCurrency =
//     variants && variants.edges[0]?.node?.priceV2?.currencyCode;
// //   const variantId = variants && variants.edges[0]?.node?.id;
//   const productId = id;

//   // Calculate the discount percentage
//   const offerPercentage =
//     originalPrice && discountPrice
//       ? ((originalPrice - discountPrice) / originalPrice) * 100
//       : null;

//   // Handle Add to Cart
//   const handleAddToCart = async () => {
//     console.log("Add to Cart ", productId)
//     // try {
//     //   if (!variantId) {
//     //     console.error("Variant ID not found.");
//     //     return;
//     //   }
//     //   const quantity = 1; // Default quantity
//     //   const cart = await addToCart(variantId, quantity);
//     //   console.log("Cart updated:", cart);
//     //   alert("Product added to cart!");
//     // } catch (error) {
//     //   console.error("Failed to add product to cart:", error.message);
//     // }
//   };

//   return (
//     <Card>
//       <CardOff>
//         <CardOffText>
//           {offerPercentage ? offerPercentage.toFixed(2) : 0}% off
//         </CardOffText>
//       </CardOff>
//       <CardImageContainer>
//         <CardImage
//           src={
//             productImage ||
//             "https://i.pinimg.com/736x/56/2c/4b/562c4bc65ed427515b6b6b11883bb611.jpg"
//           } // Default image if none available
//           alt={title || "Product Image"}
//         />
//       </CardImageContainer>
//       <CardBody>
//         <CardHeading>
//           <h3>{title || "Product Title"}</h3>
//         </CardHeading>
//         <CardPrice>
//           <CardPriceText>
//             {productCurrency}
//             {originalPrice ? Number(originalPrice).toFixed(2) : "0.00"}
//           </CardPriceText>
//           <CardOffPrice>
//             {productCurrency}
//             {discountPrice ? Number(discountPrice).toFixed(2) : "0.00"}
//           </CardOffPrice>
//         </CardPrice>

//         <CardDelivery>
//           <img src={expressLogo} alt="" />
//           <CardDeliverySpan>
//             <img src={deliveryLogo} alt="" />
//             <CardDeliveryText>Free Delivery</CardDeliveryText>
//           </CardDeliverySpan>
//         </CardDelivery>
//         <div>
//           <CardButton onClick={handleAddToCart}>Add To Cart</CardButton>
//         </div>
//       </CardBody>
//     </Card>
//   );
// };

import React from "react";
import {
  Card,
  CardBody,
  CardButton,
  CardDelivery,
  CardDeliverySpan,
  CardDeliveryText,
  CardHeading,
  CardImage,
  CardImageContainer,
  CardOff,
  CardOffPrice,
  CardOffText,
  CardPrice,
  CardPriceText,
} from "../../ui/CardStyle";
import expressLogo from "../../assets/Frame 390 1.png";
import deliveryLogo from "../../assets/Group.png";
import { addToCart } from "../../store/cart";

export const ProductCard = ({ product = {} }) => {
  const {
    title = "",
    descriptionHtml = "",
    images = null,
    variants = null,
    id = "",
  } = product || {};
  const productImage = images?.edges?.[0]?.node?.url || "";
  const discountPrice = variants?.edges?.[0]?.node?.priceV2?.amount || "0.00";
  const originalPrice =
    variants?.edges?.[0]?.node?.compareAtPriceV2?.amount || "0.00";
  const productCurrency =
    variants?.edges?.[0]?.node?.priceV2?.currencyCode || "$";
  const offerPercentage =
    originalPrice && discountPrice
      ? ((originalPrice - discountPrice) / originalPrice) * 100
      : 0;
  const variantId = variants?.edges[0]?.node?.id || "";
  // Handle Add to Cart
  const handleAddToCart = async () => {
    try {
      if (!variantId) {
        console.error("Variant ID not found.");
        return;
      }
      const quantity = 1;
      const cart = await addToCart(variantId, quantity);
      console.log("Cart updated:", cart);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Failed to add product to cart:", error.message);
    }
  };

  return (
    <Card>
      <CardOff>
        <CardOffText>{offerPercentage.toFixed(2)}% off</CardOffText>
      </CardOff>
      <CardImageContainer>
        <CardImage
          src={
            productImage ||
            "https://i.pinimg.com/736x/56/2c/4b/562c4bc65ed427515b6b6b11883bb611.jpg"
          }
          alt={title || "Product Image"}
        />
      </CardImageContainer>
      <CardBody>
        <CardHeading>
          {title || "Product Title"}
        </CardHeading>
        <CardPrice>
          <CardPriceText>
            {productCurrency}
            {originalPrice}
          </CardPriceText>
          <CardOffPrice>
            {productCurrency}
            {discountPrice}
          </CardOffPrice>
        </CardPrice>
        <CardDelivery>
          <img src={expressLogo} alt="" />
          <CardDeliverySpan>
            <img src={deliveryLogo} alt="" />
            <CardDeliveryText>Free Delivery</CardDeliveryText>
          </CardDeliverySpan>
        </CardDelivery>
        <div>
          <CardButton onClick={handleAddToCart}>Add To Cart</CardButton>
        </div>
      </CardBody>
    </Card>
  );
};
