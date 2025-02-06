import React, { useEffect, useState } from "react";
import tamaraIcon from "../../assets/image 1.png";
import tabbyIcon from "../../assets/image 2.png";
import cartIcon from "../../assets/Vector (1).png";
import { Link, useNavigate } from "react-router-dom";
import { CartCard } from "./CartCard";
import useShopifyStore from "../../store/useShopifyStore";
import { CartPageSkeleton } from "../skeleton/Cart";
import { ProductCarousel2 } from "../home/ProductCarousel2";
// import { Category } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCart } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

const accessToken = localStorage.getItem("accessToken");
const user = localStorage.getItem("user");

export const Cart = () => {
  const Navigate = useNavigate();
  const [subTotal, setSubTotal] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [currency, setCurrency] = useState("AED");
  const [totalItems, setTotalItems] = useState(0);
  const setLoading = useShopifyStore((state) => state.setLoading);
  const loading = useShopifyStore((state) => state.loading);
  const userObject = localStorage.getItem("user");
  const user = JSON.parse(userObject);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const { id, items, status, error } = useSelector((state) => state.cart);
  const [cartData, setCartData] = useState(items);
  // const loadData = async () => {
  //   setLoading(true);
  //   try {
  //     if (Array.isArray(items) && items.length > 0) {
  //       setCartData(items);

  //       const subTotal = items.reduce(
  //         (acc, item) =>
  //           acc +
  //           (item?.merchandise?.compareAtPriceV2?.amount
  //             ? parseFloat(item.merchandise.compareAtPriceV2.amount) *
  //               item.quantity
  //             : 0),
  //         0
  //       );
  //       setSubTotal(subTotal);

  //       const discountedTotal = items.reduce(
  //         (acc, item) =>
  //           acc +
  //           (item?.merchandise?.priceV2?.amount
  //             ? parseFloat(item.merchandise.priceV2.amount) * item.quantity
  //             : 0),
  //         0
  //       );
  //       setDiscountedTotal(discountedTotal);

  //       setTotalItems(
  //         items.reduce((acc, item) => acc + (item?.quantity || 0), 0)
  //       );
  //       setTotalDiscount(subTotal - discountedTotal);

  //       const currency =
  //         items[0]?.merchandise?.compareAtPriceV2?.currencyCode || "USD";
  //       setCurrency(currency);
  //     } else {
  //       setCartData([]);
  //       setSubTotal(0);
  //       setDiscountedTotal(0);
  //       setTotalItems(0);
  //       setTotalDiscount(0);
  //     }
  //   } catch (error) {
  //     console.error("Error during initial fetch:", error.message);
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   dispatch(fetchCart());
  //   loadData();
  // }, [dispatch]);

  // Fetch cart data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCart()).unwrap();
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  // Update cartData and perform calculations when Redux state changes
  useEffect(() => {
    if (Array.isArray(items) && items.length > 0) {
      setCartData(items);

      const subTotal = items.reduce(
        (acc, item) =>
          acc +
          (item?.merchandise?.compareAtPriceV2?.amount
            ? parseFloat(item.merchandise.compareAtPriceV2.amount) *
              item.quantity
            : 0),
        0
      );
      setSubTotal(subTotal);

      const discountedTotal = items.reduce(
        (acc, item) =>
          acc +
          (item?.merchandise?.priceV2?.amount
            ? parseFloat(item.merchandise.priceV2.amount) * item.quantity
            : 0),
        0
      );
      setDiscountedTotal(discountedTotal);

      setTotalItems(
        items.reduce((acc, item) => acc + (item?.quantity || 0), 0)
      );
      setTotalDiscount(subTotal - discountedTotal);

      const currency =
        items[0]?.merchandise?.compareAtPriceV2?.currencyCode || "USD";
      setCurrency(currency);
    } else {
      setCartData([]);
      setSubTotal(0);
      setDiscountedTotal(0);
      setTotalItems(0);
      setTotalDiscount(0);
    }
  }, [items]);

  const handleQuantityChange = async (newQuantity, id) => {
    if (newQuantity < 1) return;
    try {
      setLoading(true);
      await dispatch(
        updateCart({ lineItemId: id, quantity: newQuantity })
      ).unwrap();
      await dispatch(fetchCart()).unwrap();
      setLoading(false);
      toast.success("Cart quantity updated successfully");
    } catch (error) {
      setLoading(false);
      console.error("Failed to update cart quantity:", error.message);
      toast.error("Failed to update cart quantity");
    }
  };

  const handleRemove = async (id) => {
    try {
      setLoading(true);
      await dispatch(updateCart({ lineItemId: id, quantity: 0 })).unwrap();
      await dispatch(fetchCart()).unwrap();
      setLoading(false);
      toast.success("Item removed from cart successfully");
    } catch (error) {
      setLoading(false);
      console.error("Failed to remove item from cart:", error.message);
      toast.error("Failed to remove item from cart");
    }
  };

  const handleCheckoutButtonClick = () => {
    if (!accessToken || !user) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      Navigate("/login");
      return;
    }
    const checkoutUrl = localStorage.getItem("checkoutUrl");
    if (!checkoutUrl) {
      console.error("Checkout URL is missing.");
      return;
    }
    window.location.href = checkoutUrl;
  };

  useEffect(() => {
    if (Array.isArray(cartData) && cartData.length > 0) {
      const fetchedCategories = cartData.map(
        (item) => item?.merchandise?.product?.productType
      );
      setCategories([...new Set(fetchedCategories)]);
    } else {
      setCategories([]);
    }
  }, [cartData]);


  if (loading) return <CartPageSkeleton />;

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <div className="py-8 px-4 md:py-16 md:px-10 bg-white mb-18">
        {Array.isArray(cartData) && cartData.length > 0 ? (
          <div className="h-auto lg:max-h-[33rem] flex flex-col lg:flex-row gap-4">
            {/* ------------------Cart Items------------------ */}
            <div className="w-full lg:w-[60%] pr-0 lg:pr-4 flex flex-col gap-2 overflow-y-auto overflow-x-hidden no-scrollbar">
              {cartData.map((item) => (
                <CartCard
                  key={item.id}
                  product={item}
                  handleQuantityChange={handleQuantityChange}
                  handleRemove={handleRemove}
                />
              ))}
            </div>

            {/* ------------------Cart Summary for desktop------------------ */}
            <div className="w-full hidden lg:block lg:w-[40%] bg-white p-4 rounded-xl h-auto no-scrollbar">
              <p className="text-[16px] text-[#535353] font-semiblod">
                Order Summary
              </p>
              {/* ------------------Summary------------------ */}
              <div className="mt-6 text-[#5A5A5A]">
                <div className="flex justify-between items-center">
                  <p className="text-[18px] font-normal">
                    Subtotal ({totalItems} item)
                  </p>
                  <p className="text-[18px] font-semibold">
                    {currency} {Number(subTotal).toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-[18px] font-normal">Shipping Fee</p>
                  <p className="text-[18px] font-semibold text-[#228944]">
                    FREE
                  </p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-[18px] font-normal">Total Discount</p>
                  <p className="text-[18px] font-semibold text-[#228944]">
                    - {currency} {Number(subTotal - discountedTotal).toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-[20px] font-bold">
                    Total
                    <span className="ml-1 text-[14px] font-medium">
                      (Inclusive of VAT)
                    </span>
                  </p>
                  <p className="text-[20px] font-bold">
                    {currency} {Number(discountedTotal).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* ------------------Checkout Button------------------ */}
              <div className="mt-2">
                <button
                  onClick={handleCheckoutButtonClick}
                  className="w-full h-[50px] bg-[#353535] text-[16px] text-white font-semibold rounded"
                >
                  CHECK OUT
                </button>
              </div>

              {/* ------------------Payment Options------------------ */}
              <div>
                <div className="flex items-center gap-2 mt-4 w-full px-3 py-1 border rounded border-[#FFE0BD]">
                  <img src={tamaraIcon} alt="" />
                  <p className="text-[14px] font-medium">
                    Split 4 payments of AEW 15.50 - No late fees, Sharia
                    Complaints
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 w-full px-3 py-1 border rounded border-[#9BFFBC]">
                  <img src={tabbyIcon} alt="" />
                  <p className="text-[14px]">
                    4 interest-free payments of AED 15.50. No fees.
                    Shariah-compliant
                  </p>
                </div>
              </div>
            </div>

            {/* ------------------Cart Summary for mobile------------------ */}
            <div className="w-full block lg:hidden bg-white">
              {/* ------------------Summary------------------ */}

              <div className="mt-6 text-[#5A5A5A] bg-[#F3F4F9] p-4 rounded-xl">
                <p className="text-[18px] text-[#535353] font-medium">
                  Order Summary
                </p>
                <div className="flex justify-between items-center mt-6">
                  <p className="text-[16px] font-normal">
                    Subtotal ({totalItems} item)
                  </p>
                  <p className="text-[16px] font-semibold">
                    {currency} {Number(subTotal).toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-1">
                  <p className="text-[16px] font-normal">Shipping Fee</p>
                  <p className="text-[16px] font-semibold text-[#228944]">
                    FREE
                  </p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-[18px] font-normal">Total Discount</p>
                  <p className="text-[18px] font-semibold text-[#228944]">
                    - {currency} {Number(subTotal - discountedTotal).toFixed(2)}
                  </p>
                </div>
                <hr className="mt-2 border-[#a0a0a0ab]" />
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-[18px] font-bold">Total</p>
                    <span className="ml-1 text-[12px] font-medium">
                      (Inclusive of VAT)
                    </span>
                  </div>
                  <p className="text-[18px] font-bold">
                    {currency} {Number(discountedTotal).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* ------------------Payment Options------------------ */}
              <div>
                <div className="flex items-center gap-2 mt-4 w-full px-3 py-1 border rounded border-[#FFE0BD]">
                  <img src={tamaraIcon} alt="" />
                  <p className="text-[14px] font-medium">
                    Split 4 payments of AEW 15.50 - No late fees, Sharia
                    Complaints
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 w-full px-3 py-1 border rounded border-[#9BFFBC]">
                  <img src={tabbyIcon} alt="" />
                  <p className="text-[14px]">
                    4 interest-free payments of AED 15.50. No fees.
                    Shariah-compliant
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[30rem] flex justify-center items-center">
            <div className="flex flex-col gap-2 justify-center items-center ">
              <div className="px-4 py-5 rounded-[50%] bg-[#F6F6F6] flex justify-center items-center">
                <div className="w-[110px] h-[100px] px-4 py-5 flex justify-center items-center rounded-[50%] bg-[#EFF0F3]">
                  <img src={cartIcon} alt="" className="h-full w-full" />
                </div>
              </div>
              <p className="text-[24px] font-medium text-[#535353]">
                Your Cart is Empty
              </p>
              <p className="text-[16px] font-normal text-[#787878]">
                Looks like you haven’t added anything to your cart.
              </p>
              <Link to="/shop">
                <button className="bg-[#464646] w-[287px] px-3 py-2 text-[#fff] mt-3 rounded">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        )}
        {/* ------------------Similar Products------------------ */}
        <ProductCarousel2 title={"Similar Products"} category={categories} />
      </div>
      {/* ------------------Checkout Button for mobile------------------ */}
      {cartData?.lines?.edges?.length > 0 && (
        <div className="fixed lg:hidden bottom-[70px] md:bottom-[0px] w-full text-[#5A5A5A] flex justify-between items-center bg-[#fff] px-4 py-2">
          <div className="flex flex-col">
            <p className="text-[14px]">
              Total :
              <span className="text-[13px] line-through">
                {currency} {Number(subTotal).toFixed(2)}
              </span>
            </p>
            <p className="text-[20px] font-bold">
              {currency} {Number(discountedTotal).toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleCheckoutButtonClick}
            className="w-[40%] h-[50px] bg-[#353535] text-[16px] text-[#fff]  font-semibold rounded"
          >
            CHECK OUT
          </button>
        </div>
      )}
    </div>
  );
};

// Apply discount code
// const handleApplyDiscountCode = async () => {
//   try {
//     const query = `
//       mutation checkoutDiscountCodeApplyV2($checkoutId: ID!, $discountCode: String!) {
//         checkoutDiscountCodeApplyV2(checkoutId: $checkoutId, discountCode: $discountCode) {
//           checkout {
//             discountApplications(first: 10) {
//               edges {
//                 node {
//                   allocationMethod
//                   targetSelection
//                   targetType
//                 }
//               }
//             }
//             checkoutUserErrors {
//               message
//               code
//               field
//             }
//           }
//         }
//       }
//     `;

//     const response = await shopifyClient.post("", {
//       query,
//       variables: {
//         checkoutId: cartId,
//         discountCode: discountCode,
//       },
//     });

//     console.log("GraphQL Response:", response.data);

//     if (
//       response.data?.checkoutDiscountCodeApplyV2?.checkoutUserErrors?.length >
//       0
//     ) {
//       console.error(
//         "Error applying discount:",
//         response.data.checkoutDiscountCodeApplyV2.checkoutUserErrors
//       );
//     } else {
//       console.log("Discount applied successfully:", response.data);
//     }
//   } catch (error) {
//     console.error("Error applying discount code:", error.message);
//   }
// };

{
  /* <div className="flex justify-between items-center mt-1">
                  <p className="text-[16px] font-normal">Coupon</p>
                  <p className="text-[16px] font-semibold text-[#228944]">
                    - {currency} 00.00
                  </p>
                </div> */
}

{
  /* ------------------Coupon Code------------------ */
}
{
  /* <div>
                <div className="mt-3 flex items-center w-full h-[50px] border-2 border-[#dddddd] bg-white p-0 rounded-md overflow-hidden">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="w-full h-full py-1 px-2 outline-none border-none bg-transparent"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <button
                    onClick={handleApplyDiscountCode}
                    className="w-[103px] h-full bg-[#545454] text-[16px] font-semibold text-white"
                  >
                    Apply
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2 bg-[#5BAF6729] border-2 border-[#00980053] py-1 px-3 rounded-md">
                  <img src={couponIcon} alt="" />
                  <p className="text-[#196F35] text-[14px] font-normal">
                    Coupon Applied: AKG0101
                  </p>
                </div>
              </div> */
}
