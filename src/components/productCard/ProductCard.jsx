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

// export const ProductCard = ({ image }) => {
//   return (
//     <Card>
//       <CardOff>
//         <CardOffText>40% off</CardOffText>
//       </CardOff>
//       <CardImageContainer>
//         <CardImage src={image} alt="Product Image" />
//       </CardImageContainer>
//       <CardBody>
//         <CardHeading>
//           GUESS UV Protected ROUND Sun Glasses GUESS UV Protected ROUND Sun
//           Glasses
//         </CardHeading>
//         <CardPrice>
//           <CardPriceText>AED 578</CardPriceText>
//           <CardOffPrice>AED 350</CardOffPrice>
//         </CardPrice>

//         <CardDelivery>
//           <img src={expressLogo} alt="" />
//           <CardDeliverySpan>
//             <img src={deliveryLogo} alt="" />
//             <CardDeliveryText>Free Delivery</CardDeliveryText>
//           </CardDeliverySpan>
//         </CardDelivery>
//         <div>
//           <CardButton>Add To Cart</CardButton>
//         </div>
//       </CardBody>
//     </Card>
//   );
// };

import React, { useState } from "react";
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
  ExpressLogo,
} from "../../ui/CardStyle";
import expressLogo from "../../assets/Frame 390 1.png";
import deliveryLogo from "../../assets/Group.png";
import { addToCart } from "../../store/cart";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

export const ProductCard = ({ product = {} }) => {
  const userObject = localStorage.getItem("user");
  const user = userObject ? JSON.parse(userObject):{email:""};
  const [loading, setLoading] = useState(false)
  const {
    title = "",
    descriptionHtml = "",
    images = null,
    variants = null,
    id = "",
    handle = "",
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
      setLoading(true)
      const quantity = 1;
      const cart = await addToCart(variantId, quantity,user.email);
      setLoading(false)
      console.log("Cart updated:", cart);
      if (cart.id) {
        toast.success("Added to cart successfully");
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error.message);
    }
  };
  return (
    <Card>
      <CardOff>
        <CardOffText>{offerPercentage.toFixed(0)}% off</CardOffText>
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
        <Link to={`/product/${handle}`}>
          <CardHeading>{title || "Product Title"}</CardHeading>
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
            <ExpressLogo src={expressLogo} alt="" />
            <CardDeliverySpan>
              <img src={deliveryLogo} alt="" />
              <CardDeliveryText>Free Delivery</CardDeliveryText>
            </CardDeliverySpan>
          </CardDelivery>
        </Link>
        <div>
          <CardButton onClick={handleAddToCart} className="flex items-center justify-center"> 
            {loading ? <CircularProgress size="20px" /> : "Add To Cart"}
          </CardButton>
        </div>
      </CardBody>
    </Card>
  );
};
