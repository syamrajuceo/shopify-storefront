import React, { useState } from "react";
import deliveryIcon from "../../assets/Group.png";
import {
  CartCardWrapper,
  ContentWrapper,
  CostMobile,
  DeliveryWrapper,
  FooterWrapper,
  ImageWrapper,
  PriceWrapper,
  PriceWrapperMobile,
  QuantityMobile,
  Title,
} from "../../ui/CartCardStyle";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const CartCard = ({ product, handleQuantityChange, handleRemove }) => {
  const { quantity, id, handle } = product;
  

  const [loading, setLoading] = useState(false);

  const originalPrice = product.merchandise?.compareAtPriceV2?.amount;
  const discountPrice = product.merchandise?.priceV2?.amount;

  const offerPercentage =
    originalPrice && discountPrice
      ? ((originalPrice - discountPrice) / originalPrice) * 100
      : 0;

  const handleQtyUpdate = async (qty, id) => {
    setLoading(true);
    try {
      await handleQuantityChange(qty, id);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };
  return (
    <CartCardWrapper>
      <div className="flex flex-col gap-2">
        <Link to={`/product/${product.merchandise.product.handle}`}>
          <ImageWrapper>
            <img
              src={product?.merchandise?.product?.images?.edges[0]?.node?.src}
              alt={
                product?.merchandise?.product?.images?.edges[0]?.node
                  ?.altText || "Product image"
              }
            />
          </ImageWrapper>
        </Link>
        <QuantityMobile>
          <span
            className="control"
            onClick={() => handleQtyUpdate(quantity - 1, id)}
          >
            -
          </span>
          {loading ? (
            <div className="px-[5px] flex justify-center items-center">
              <CircularProgress size="20px" />
            </div>
          ) : (
            <span className="value font-bold">{quantity}</span>
          )}
          <span
            className="control"
            onClick={() => handleQtyUpdate(quantity + 1, id)}
          >
            +
          </span>
        </QuantityMobile>
      </div>
      <ContentWrapper>
        <Link to={`/product/${product.merchandise.product.handle}`}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
            <Title>{product.merchandise?.product?.title}</Title>
            <span className="text-gray-500 font-medium">{product.merchandise?.title}</span>
            </div>
            <PriceWrapper>
              <p className="original">
                {product.merchandise?.priceV2?.currencyCode}
                {product.merchandise?.compareAtPriceV2?.amount}
              </p>
              <p className="discount">{offerPercentage.toFixed(2)}% off</p>
            </PriceWrapper>
          </div>
        </Link>
        <DeliveryWrapper>
          <div className="delivery-info">
            <img src={deliveryIcon} alt="Free Delivery" />
            <p>Free Delivery</p>
          </div>
          <p className="cost">
            Cost : {product.merchandise?.priceV2?.currencyCode}
            {product.merchandise?.priceV2?.amount}
          </p>
        </DeliveryWrapper>
        <PriceWrapperMobile>
          <p className="original">
            {product.merchandise?.priceV2?.currencyCode}
            {product.merchandise?.compareAtPriceV2?.amount}
          </p>
          <p className="discount">45% off</p>
        </PriceWrapperMobile>
        <CostMobile>
          Cost : {product.merchandise?.priceV2?.currencyCode}
          {product.merchandise.priceV2?.amount}
        </CostMobile>
        <FooterWrapper>
          <div className="quantity">
            <span
              className="control"
              onClick={() => handleQtyUpdate(quantity - 1, id)}
            >
              -
            </span>
            {loading ? (
              <div className="px-[5px] flex justify-center items-center">
                <CircularProgress size="20px" />
              </div>
            ) : (
              <span className="value font-bold">{quantity}</span>
            )}
            <span
              className="control"
              onClick={() => handleQtyUpdate(quantity + 1, id)}
            >
              +
            </span>
          </div>
          <div className="remove" onClick={() => handleRemove(id)}>
            <i className="fa-solid fa-trash"></i>
            <p>Remove</p>
          </div>
        </FooterWrapper>
      </ContentWrapper>
    </CartCardWrapper>
  );
};
