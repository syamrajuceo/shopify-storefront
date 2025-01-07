import styled from "styled-components";

export const CartCardWrapper = styled.div`
  height: 153px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e2e2;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  background-color: #ffffff;
  @media (max-width: 1102px) {
    height: 200px;
  }
  @media (max-width: 786px) {
    padding: 10px;
    height: 185px;
  }
`;

export const ImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    object-fit: cover;
    background-position: center;
  }
  @media (max-width: 786px) {
    width: 87px;
  }
`;

export const ContentWrapper = styled.div`
  padding-left: 16px;
  padding-right: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  @media (max-width: 786px) {
    padding-left: 10px;
    padding-right: 4px;
  }
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  /* max-width: 60%; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
  @media (max-width: 1102px) {
    max-width: 100%;
  }
  @media (max-width: 786px) {
    font-size: 14px;
  }
`;

export const PriceWrapper = styled.div`
  display: flex;
  gap: 8px;
  font-size: 13px;
  align-items: center;
  .original {
    text-decoration: line-through;
    color: #7d8a8a;
    font-weight: 600;
  }
  .discount {
    font-weight: 700;
    background-color: #e2f1bd;
    color: #5f7234;
    padding: 1px 4px;
    border-radius: 4px;
  }
  @media (max-width: 1102px) {
    display: none;
  }
`;

export const PriceWrapperMobile = styled.div`
  display: none;
  gap: 8px;
  font-size: 13px;
  align-items: center;
  margin-top: 5px;
  .original {
    text-decoration: line-through;
    color: #7d8a8a;
    font-weight: 600;
  }
  .discount {
    font-weight: 700;
    background-color: #e2f1bd;
    color: #5f7234;
    padding: 1px 4px;
    border-radius: 4px;
  }
  @media (max-width: 1102px) {
    display: flex;
  }
`;

export const DeliveryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  .delivery-info {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #545454;
  }
  .cost {
    font-size: 16px;
    font-weight: 700;
    color: #343939;
    @media (max-width: 1102px) {
      display: none;
    }
  }
`;
export const CostMobile = styled.div`
  display: none;
  font-size: 16px;
  font-weight: 700;
  color: #343939;
  margin-top: 5px;
  @media (max-width: 1102px) {
    display: block;
  }
`;

export const FooterWrapper = styled.div`
  position: absolute;
  bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .quantity {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;

    .control {
      font-size: 14px;
      border: 1px solid #ddd;
      padding: 4px 8px;
      cursor: pointer;
    }

    .value {
      font-size: 16px;
      font-weight: 600;
      border: 1px solid #ddd;
      padding: 4px 8px;
    }

    @media (max-width: 1102px) {
      display: none;
    }
  }

  .remove {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #ddd;
    padding: 4px 12px;
    border-radius: 4px;
    cursor: pointer;
    position: absolute;
    right: 20px;
    @media (max-width: 1102px) {
      /* display: none; */
      bottom: -5px;
    }
  }
`;

export const QuantityMobile = styled.div`
  display: none;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  margin-top: 4px;
  .control {
    font-size: 14px;
    border: 1px solid #ddd;
    padding: 4px 8px;
    cursor: pointer;
  }

  .value {
    font-size: 16px;
    font-weight: 600;
    border: 1px solid #ddd;
    padding: 4px 8px;
  }
  @media (max-width: 1102px) {
    display: flex;
  }
`;
