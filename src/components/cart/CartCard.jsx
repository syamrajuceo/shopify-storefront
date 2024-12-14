import React from "react";
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
import { updateCart } from "../../store/cart";

export const CartCard = ({ product, onCartUpdate }) => {
  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1

    try {
      const updatedCart = await updateCart(product.id, newQuantity);
      console.log("Cart updated:", updatedCart);
      onCartUpdate(updatedCart);
    } catch (error) {
      console.error("Failed to update cart:", error.message);
    }
  };

  const handleRemove = async () => {
    try {
      const updatedCart = await updateCart(product.id, 0);
      console.log("Item removed:", updatedCart);
      onCartUpdate(updatedCart);
    } catch (error) {
      console.error("Failed to remove item:", error.message);
    }
  };

  // const handleQuantityChange = async (newQuantity) => {
  //     if (newQuantity < 1) return; // Prevent quantity from going below 1

  //     try {
  //       const updatedCart = await updateCart(product.id, newQuantity);
  //       console.log("Cart updated:", updatedCart);
  //       onCartUpdate(updatedCart); // Notify parent component of the updated cart
  //     } catch (error) {
  //       console.error("Failed to update cart:", error.message);
  //     }
  //   };

  //   const handleRemove = async () => {
  //     try {
  //       const updatedCart = await updateCart(product.id, 0);
  //       console.log("Item removed:", updatedCart);
  //       onCartUpdate(updatedCart); // Notify parent component of the updated cart
  //     } catch (error) {
  //       console.error("Failed to remove item:", error.message);
  //     }
  //   };

  return (
    <CartCardWrapper>
      <div className="flex flex-col gap-2">
        <ImageWrapper>
          <img
            src={product?.merchandise?.product?.images?.edges[0]?.node?.src}
            alt={
              product?.merchandise?.product?.images?.edges[0]?.node?.altText ||
              "Product image"
            }
          />
        </ImageWrapper>
        <QuantityMobile>
          <span
            className="control"
            onClick={() => handleQuantityChange(product.quantity - 1)}
          >
            -
          </span>
          <span className="value">{product.quantity}</span>
          <span
            className="control"
            onClick={() => handleQuantityChange(product.quantity + 1)}
          >
            +
          </span>
        </QuantityMobile>
      </div>
      <ContentWrapper>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title>{product.merchandise?.product?.title}</Title>
          <PriceWrapper>
            <p className="original">
              {product.merchandise?.priceV2?.currencyCode}
              {product.merchandise?.priceV2?.amount}
            </p>
            <p className="discount">45% off</p>
          </PriceWrapper>
        </div>
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
            {product.merchandise?.priceV2?.amount}
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
              onClick={() => handleQuantityChange(product.quantity - 1)}
            >
              -
            </span>
            <span className="value">{product.quantity}</span>
            <span
              className="control"
              onClick={() => handleQuantityChange(product.quantity + 1)}
            >
              +
            </span>
          </div>
          <div className="remove" onClick={handleRemove}>
            <i className="fa-solid fa-trash"></i>
            <p>Remove</p>
          </div>
        </FooterWrapper>
      </ContentWrapper>
    </CartCardWrapper>
  );
};
