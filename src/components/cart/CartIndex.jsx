// import React, { useEffect, useState } from "react";
// import { shopifyClient } from "../../config/shopifyClient";
// import { fetchCart } from "../../store/cart";

// export const CartIndex = () => {
//   const [cartData, setCartData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [discountCode, setDiscountCode] = useState(""); // To store the entered discount code
//   const [userEmail, setUserEmail] = useState(""); // To store the user's email

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const fetchedCart = await fetchCart();
//         console.log("fetchedCart : ", fetchedCart)

//         if (fetchedCart) {
//           setCartData(fetchedCart);
//         } else {
//           setCartData(null);
//         }
//       } catch (error) {
//         console.error("Error during initial fetch:", error.message);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   // Apply discount code
//   const handleApplyDiscountCode = async () => {
//     try {
//       const query = `
//         mutation checkoutDiscountCodeApplyV2($checkoutId: ID!, $discountCode: String!) {
//           checkoutDiscountCodeApplyV2(checkoutId: $checkoutId, discountCode: $discountCode) {
//             checkout {
//               id
//               discountApplications(first: 10) {
//                 edges {
//                   node {
//                     code
//                     value {
//                       ... on DiscountAmount {
//                         amount
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       `;

//       const response = await shopifyClient.post("", {
//         query,
//         variables: {
//           checkoutId: cartData.id,
//           discountCode,
//         },
//       });

//       console.log("Discount applied", response.data);
//     } catch (error) {
//       console.error("Error applying discount code:", error.message);
//     }
//   };

//   const handleCheckoutButtonClick = async () => {  
//     try {
//       const checkoutUrl = localStorage.getItem("checkoutUrl");
//       window.location.href = checkoutUrl;
//     } catch (error) {
//       console.error("Error during checkout:", error.message);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!cartData) {
//     return <div>No cart data available</div>;
//   }

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       <div>
//         {cartData.lines.edges.map(({ node }) => (
//           <div key={node.id}>
//             <p>Product: {node.merchandise.product.title}</p>
//             <p>Variant: {node.merchandise.title}</p>
//             <p>Quantity: {node.quantity}</p>
//             <p>
//               Price: {node.merchandise.priceV2.amount}
//               {node.merchandise.priceV2.currencyCode}
//             </p>
//             <p>Category: {node.merchandise.product.productType}</p>
//             <div>
//               <img
//                 src={node.merchandise.product.images.edges[0]?.node.src}
//                 alt={
//                   node.merchandise.product.images.edges[0]?.node.altText ||
//                   "Product image"
//                 }
//                 style={{ width: "100px", height: "100px" }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Discount and Gift Card Form */}
//       <div>
//         <input
//           type="text"
//           placeholder="Enter discount code"
//           value={discountCode}
//           onChange={(e) => setDiscountCode(e.target.value)}
//         />
//         <button onClick={handleApplyDiscountCode}>Apply Discount</button>
//       </div>

//       {/* Checkout Button */}
//       <div>
//         <button onClick={handleCheckoutButtonClick}>Proceed to Checkout</button>
//       </div>
//     </div>
//   );
// };

// import React, { useEffect, useState } from "react";
// import { shopifyClient } from "../../config/shopifyClient";

// export const CartIndex = () => {
//   const [cartData, setCartData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [checkoutUrl, setCheckoutUrl] = useState(""); // To store the pre-authenticated checkout URL

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const cartId = localStorage.getItem("cartId");

//         const query = `
//           query fetchCartDetails($cartId: ID!) {
//             cart(id: $cartId) {
//               id
//               checkoutUrl
//               lines(first: 10) {
//                 edges {
//                   node {
//                     id
//                     quantity
//                     merchandise {
//                       ... on ProductVariant {
//                         id
//                         title
//                         priceV2 {
//                           amount
//                           currencyCode
//                         }
//                         product {
//                           title
//                           productType
//                           images(first: 1) {
//                             edges {
//                               node {
//                                 src
//                                 altText
//                               }
//                             }
//                           }
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         `;

//         const response = await shopifyClient.post("", {
//           query,
//           variables: { cartId },
//         });

//         const fetchedCart = response.data.data.cart;

//         console.log("fetchedCart: " + fetchedCart.lines.edges[0].node.id);

//         // if (fetchedCart) {
//         //   setCartData(fetchedCart);
//         //   if (fetchedCart.lines && fetchedCart.lines?.edges?.length > 0) {
//         //     const url = await generatePreAuthCheckoutUrl();
//         //     console.log("url : ", url);
//         //   }
//         // } else {
//         //   setCartData(null);
//         // }
//       } catch (error) {
//         console.error("Error during initial fetch:", error.message);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   // Function to generate pre-authenticated checkout URL
//   const generatePreAuthCheckoutUrl = async () => {
//     try {
//       // Mutation to create a checkout
//       const query = `
//         mutation checkoutCreate($input: CheckoutCreateInput!) {
//           checkoutCreate(input: $input) {
//             checkout {
//               id
//               webUrl
//             }
//           }
//         }
//       `;

//       const variables = {
//         input: {
//           lineItems: cartData.lines.edges.map(({ node }) => ({
//             quantity: node.quantity,
//             variantId: node.merchandise.id,
//           })),
//         },
//       };

//       console.log("variables : " + JSON.stringify(variables))

//       // Call the Shopify API
//       const response = await shopifyClient.post("", {
//         query,
//         variables,
//       });
//       const checkout = response.data.data.checkoutCreate.checkout;

//       console.log("checkout " + JSON.stringify(checkout.webUrl))
//       // Use the webUrl for the checkout redirection
//       const preAuthCheckoutUrl = checkout.webUrl;
//       setCheckoutUrl(preAuthCheckoutUrl);

//       return preAuthCheckoutUrl
//     } catch (error) {
//       console.error("Error generating pre-authenticated checkout URL:", error.message);
//     }
//   };

//   // Trigger checkout process
//   const handleCheckoutButtonClick = async () => {
//     const preAuthCheckoutUrl = await generatePreAuthCheckoutUrl();
//     if (preAuthCheckoutUrl) {
//       window.location.href = preAuthCheckoutUrl;
//     } else {
//       console.log("Checkout URL is not available.");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!cartData) {
//     return <div>No cart data available</div>;
//   }

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       <div>
//         {cartData.lines.edges.map(({ node }) => (
//           <div key={node.id}>
//             <p>Product: {node.merchandise.product.title}</p>
//             <p>Variant: {node.merchandise.title}</p>
//             <p>Quantity: {node.quantity}</p>
//             <p>
//               Price: {node.merchandise.priceV2.amount}{" "}
//               {node.merchandise.priceV2.currencyCode}
//             </p>
//             <p>Category: {node.merchandise.product.productType}</p>
//             <div>
//               <img
//                 src={node.merchandise.product.images.edges[0]?.node.src}
//                 alt={
//                   node.merchandise.product.images.edges[0]?.node.altText ||
//                   "Product image"
//                 }
//                 style={{ width: "100px", height: "100px" }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       <div>
//         <button onClick={handleCheckoutButtonClick}>Proceed to Checkout</button>
//       </div>
//     </div>
//   );
// };
