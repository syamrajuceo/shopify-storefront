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
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Model from '../../assets/model.png'
const accessToken = localStorage.getItem("accessToken");
export const ProductCard = ({ product = {} }) => {

  console.log("product... : ", product);
  const userObject = localStorage.getItem("user");
  const user = userObject ? JSON.parse(userObject) : { email: "" };
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    title = "",
    descriptionHtml = "",
    images = null,
    variants = null,
    id = "",
    handle = "",
    metafields = [],
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

  // Check metafields for express and free delivery
  const expressDelivery = metafields.some(
    (field) => field.key === "express_delivery" && field.value === "true"
  );
  const freeDelivery = metafields.some(
    (field) => field.key === "free_delivery" && field.value === "true"
  );

  // Handle Add to Cart
  const handleAddToCart = async () => {
    try {
      if (!variantId) {
        console.error("Variant ID not found.");
        return;
      }
      if(accessToken === null || accessToken === undefined){
        return navigate("/login")
      }
      setLoading(true);
      const quantity = 1;
      const cart = await addToCart(variantId, quantity, user.email);
      setLoading(false);
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
        <CardImage src={productImage || ""} alt={title || "Product Image"} />
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
            {expressDelivery && (
              <ExpressLogo src={expressLogo} alt="Express Delivery" />
            )}
            <CardDeliverySpan>
              {freeDelivery ? (
                <>
                  <img src={deliveryLogo} alt="Delivery" />
                  <CardDeliveryText>Free Delivery</CardDeliveryText>
                </>
              ) : expressDelivery ? (
                ""
              ) : (
                <>
                  <img src={deliveryLogo} alt="Delivery" />
                  <CardDeliveryText className="mt-[3px]">Standard Delivery</CardDeliveryText>
                </>
              )}
            </CardDeliverySpan>
          </CardDelivery>
        </Link>
        <div>
          <CardButton
            onClick={handleAddToCart}
            className="flex items-center justify-center"
          >
            {loading ? (
              <CircularProgress size="20px" />
            ) : (
              <div className="flex items-center gap-[5px]">
                <ShoppingBagOutlinedIcon />
                Add To Cart
              </div>
            )}
          </CardButton>
        </div>
      </CardBody>
    </Card>
  );
};
