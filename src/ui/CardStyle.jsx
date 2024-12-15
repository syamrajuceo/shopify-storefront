import styled from "styled-components";

export const MainCardContainer = styled.div`
  display: flex;
  overflow-x: auto;
  align-items: center;
  padding: 0.625rem;
`;

export const AdCard = styled.div`
  position: sticky;
  z-index: 9;
  margin-right: 10px;
`;

// Ad Card Image inside Main Card Container
export const AdCardImage = styled.img`
  width: 17.5rem;
  height: 22.33rem;
  @media screen and (max-width: 71.8125rem) {
    width: 15.625rem;
    height: 20.2;
  }
  @media screen and (max-width: 54.75rem) {
    width: 13.125rem;
    height: 21.688rem;
  }
  @media screen and (max-width: 40.9375rem) {
    width: 11.875rem;
    height: 18.813rem;
    display: none;
  }
`;

// Card Container
export const CardContainer = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  overflow-x: auto;

  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 71.8125rem) {
    gap: 1.25rem;
  }
  @media screen and (max-width: 40.9375rem) {
    margin-left: 0rem;
  }
  @media screen and (max-width: 30rem) {
    gap: 0.6rem;
  }
`;

// Ad Card Mobile Image
export const AdCardMobileImage = styled.img`
  display: none;
  @media screen and (max-width: 40.9375rem) {
    width: 11.875rem;
    height: 17.5rem;
    display: block;
  }
  @media screen and (max-width: 30rem) {
    width: 10.3125rem;
    height: 16.2rem;
  }
`;

// Individual Card
export const Card = styled.div`
  flex: 0 0 auto;
  border-radius: 0.625rem;
  width:350px;
  scroll-snap-align: center;
  position: relative;
  @media screen and (max-width: 71.8125rem) {
    max-width: 15.625rem;
  }
  @media screen and (max-width: 54.75rem) {
    max-width: 14.375rem;
  }
  @media screen and (max-width: 40.9375rem) {
    width: 12.5rem;
  }
  @media screen and (max-width: 30rem) {
    width: 10rem;
  }
`;

// Card Off Label
export const CardOff = styled.div`
  position: absolute;
  top: 0.9375rem;
  left: 0.9375rem;
  border-radius: 0.25rem;
  padding: 0.125rem 0.4375rem;
  background: #ffffff;
  border: 1px solid #e6e6e6ab;
`;

// Card Off Text
export const CardOffText = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  color: #06b40e;
  @media screen and (max-width: 40.9375rem) {
    font-size: 0.7rem;
  }
  @media screen and (max-width: 30rem) {
    font-size: 0.6rem;
  }
`;

// Card Image Container
export const CardImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding : 10px;
`;

// Card Image inside Card
export const CardImage = styled.img`
  width: 100%;
  height: 16rem;
  border-radius: 0.625rem;
  background-position: center;

  @media screen and (max-width: 40.9375rem) {
    height: 14rem;
  }
  @media screen and (max-width: 30rem) {
    height: 12rem;
  }
`;

// Card Body
export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: auto;
  position: relative;
  margin-top: 0.5rem;
`;

// Card Heading
export const CardHeading = styled.h3`
  max-width: 90%;
  font-size: 1rem;
  font-weight: 500;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  min-height: 3em;
  color: #454545;

  @media screen and (max-width: 71.8125rem) {
    font-size: 0.875rem;
  }
  @media screen and (max-width: 40.9375rem) {
    font-size: 0.75rem;
  }
  /* @media screen and (max-width: 30rem) {
    font-size: 0.625rem;
  } */
`;

// Card Price
export const CardPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-top: 0.2rem;
`;

// Card Price Text for Strikethrough Price
export const CardPriceText = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.25rem 0.25rem;
  border-radius: 0.25rem;
  text-decoration: line-through;
  color: #8c8c8c;
  @media screen and (max-width: 71.8125rem) {
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.125rem 0.0625rem;
  }
  @media screen and (max-width: 54.75rem) {
  }
  @media screen and (max-width: 40.9375rem) {
    font-size: 0.825rem;
  }
  @media screen and (max-width: 30rem) {
    font-size: 0.8rem;
  }
`;

// Card Off Price
export const CardOffPrice = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
  background: #f6f6f6;
  padding: 0.25rem 0.25rem;
  border-radius: 0.25rem;
  color: #000000;
  @media screen and (max-width: 71.8125rem) {
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.125rem 0.0625rem;
  }
  @media screen and (max-width: 54.75rem) {
  }
  @media screen and (max-width: 40.9375rem) {
    font-size: 0.825rem;
  }
  @media screen and (max-width: 30rem) {
    font-size: 0.8rem;
  }
`;

// Card Delivery Information
export const CardDelivery = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.325rem;
  gap: 0.625rem;
  @media screen and (max-width: 71.8125rem) {
  }
  @media screen and (max-width: 54.75rem) {
    gap: 0.3125rem;
  }
  @media screen and (max-width: 40.9375rem) {
  }
  @media screen and (max-width: 30rem) {
  }
`;

// Card Delivery Span for Icon and Text
export const CardDeliverySpan = styled.span`
  display: flex;
  gap: 0.4375rem;
  align-items: center;
`;

// Card Delivery Text
export const CardDeliveryText = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  @media screen and (max-width: 71.8125rem) {
  }
  @media screen and (max-width: 54.75rem) {
    font-size: 0.75rem;
  }
  @media screen and (max-width: 40.9375rem) {
    font-size: 0.55rem;
  }
  @media screen and (max-width: 30rem) {
  }
`;
export const ExpressLogo = styled.img`
  @media screen and (max-width: 54.75rem) {
    width: auto;
    height: 0.9375rem;
  }
`;

// Card Button
export const CardButton = styled.button`
  background: #000000;
  color: #fff;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.3125rem;
  cursor: pointer;
  width: 100%;
  margin-top: 0.625rem;
  font-size: 0.875rem;
  @media screen and (max-width: 40.9375rem) {
    padding: 0.5125rem 1.25rem;
    font-size: 0.75rem;
  }
  @media screen and (max-width: 30rem) {
    padding: 0.45rem 1.125rem;
    font-size: 0.625rem;
  }
`;

// Slider Buttons Container
export const SliderButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Previous Button
export const PrevButton = styled.button`
  background-color: #8c8c8c;
  color: #fff;
  border: none;
  padding: 0.75rem 0.9375rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.25rem;
  position: absolute;
  left: 0.625rem;
  top: 25%;
`;

// Next Button
export const NextButton = styled.button`
  background-color: #8c8c8c;
  color: #fff;
  border: none;
  padding: 0.75rem 0.9375rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.25rem;
  position: absolute;
  right: 0.625rem;
  top: 25%;
`;

// // Responsive Design - Media Queries for Screens Smaller than 71.8125rem
// export const CardContainerSmall = styled(CardContainer)`
//   gap: 1.25rem;

//   .card {
//     max-width: 15.625rem;
//   }

//   .card-body h3 {
//     font-size: 0.875rem;
//   }
//   .main-card-container .ad-card img {
//     width: 15.625rem;
//     height: 20.2rem;
//   }
// `;

// export const CardContainerMobile = styled(CardContainer)`
//   gap: 1.25rem;
//   .card {
//     max-width: 14.375rem;
//   }

//   .card-body h3 {
//     font-size: 0.875rem;
//   }

//   .card-body .card-delivery {
//     gap: 0.3125rem;
//   }
//   .main-card-container .ad-card img {
//     width: 13.125rem;
//     height: 21.688rem;
//   }
// `;

// export const CardContainerExtraMobile = styled(CardContainer)`
//   gap: 1.25rem;
//   .card {
//     max-width: 12.5rem;
//   }

//   .card-body h3 {
//     font-size: 0.75rem;
//   }

//   .slider-buttons .prev-btn,
//   .slider-buttons .next-btn {
//     padding: 0.625rem 0.8125rem;
//     font-size: 1rem;
//   }
//   .main-card-container .ad-card img {
//     width: 11.875rem;
//     height: 18.813rem;
//     display: none;
//   }
//   .card-container .ad-card-mobile img {
//     width: 11.875rem;
//     height: 17.5rem;
//     display: block;
//   }
//   .card-body .card-delivery span p {
//     font-size: 0.55rem;
//   }
// `;

// // For Smaller Devices (30rem)
// export const CardContainerSmallest = styled(CardContainer)`
//   gap: 0.6rem;
//   .card {
//     width: 10rem;
//   }

//   .card-body .card-headding h3 {
//     font-size: 0.625rem;
//   }
//   .card-button button {
//     padding: 0.45rem 1.125rem;
//     font-size: 0.625rem;
//   }

//   .slider-buttons .prev-btn,
//   .slider-buttons .next-btn {
//     padding: 0.5rem 0.625rem;
//     font-size: 0.875rem;
//   }

//   .card-container .ad-card-mobile img {
//     width: 10.3125rem;
//     height: 16.2rem;
//   }
// `;
