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
import { updateCart } from "../../store/cart";
import CircularProgress from '@mui/material/CircularProgress';


export const CartCard = ({
  product,
  onCartUpdate,
  handleQuantityChange,
  handleRemove,
  qtyLoading,
}) => {
  // const [quantity, setQuantity] = useState(product.quantity)
  const { quantity, id } = product;
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
            onClick={() => handleQuantityChange(quantity - 1, id)}
          >
            -
          </span>
          {qtyLoading ? (
            <div className="px-[5px] flex justify-center items-center">
            <CircularProgress size="20px" />
            </div>
          ) : (
            <span className="value font-bold">{quantity}</span>
          )}
          <span
            className="control"
            onClick={() => handleQuantityChange(quantity + 1, id)}
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
              {product.merchandise?.compareAtPriceV2?.amount}
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
              onClick={() => handleQuantityChange(quantity - 1, id)}
            >
              -
            </span>
            <span className="value">{product.quantity}</span>
            <span
              className="control"
              onClick={() => handleQuantityChange(quantity + 1, id)}
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
