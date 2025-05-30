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
// import { addToCart } from "../../store/cart";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Model from '../../assets/model.png'
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCart } from "../../redux/slices/cartSlice";
const accessToken = localStorage.getItem("accessToken");
export const ProductCard = ({ product = {}, home = false }) => {

  // console.log("product... : ", product);
  const userObject = localStorage.getItem("user");
  const user = userObject ? JSON.parse(userObject) : { email: "" };
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items} = useSelector((state) => state.cart);

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

  const is_available = variants?.edges?.[0]?.node?.availableForSale || false
  const is_available_stock = variants?.edges?.[0]?.node?.quantityAvailable || 0
  // Check metafields for express and free delivery
  const expressDelivery = metafields.some(
    (field) => field.key === "express_delivery" && field.value === "true"
  );
  const freeDelivery = metafields.some(
    (field) => field.key === "free_delivery" && field.value === "true"
  );

  // console.log("items :........." , items);

  const isInCart = items.some((item) => item.merchandise.id === variantId);

const handleAddToCart = async () => {
  try {
    if (!variantId) {
      console.error("Variant ID not found.");
      return;
    }
    if (home) {
      return navigate(`/product/${handle}`);
    }
    setLoading(true);
    await dispatch(addToCart({ variantId, quantity: 1 })).unwrap();
    await dispatch(fetchCart()).unwrap();
    setLoading(false);
    toast.success("Added to cart successfully"); 
    console.log("Item added and cart updated successfully!");
  } catch (error) {
    setLoading(false);
    console.error("Failed to add product to cart:", error.message);
    toast.error("Failed to add product to cart"); // Show error toast
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
            onClick={
              home
                ? () => navigate(`/product/${handle}`)
                : isInCart
                ? () => navigate("/cart")
                : is_available && is_available_stock > 0
                ? handleAddToCart
                : undefined
            }
            className={`flex items-center justify-center ${
              is_available || home ? "bg-slate-900" : "bg-slate-800 opacity-60"
            } `}
          >
            {loading ? (
              <CircularProgress size="20px" />
            ) : (
              <div className="flex items-center gap-[5px]">
                <ShoppingBagOutlinedIcon />
                {home
                  ? "View Product"
                  : isInCart
                  ? "View in Cart"
                  : is_available && is_available_stock > 0
                  ? "Add To Cart"
                  : "Out Of Stock"}
              </div>
            )}
          </CardButton>
        </div>
      </CardBody>
    </Card>
  );
};
