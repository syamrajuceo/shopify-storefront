// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Breadcrumbs, Rating, Typography } from "@mui/material";
import deliveryIcon from "../../assets/images/hugeicons_truck-delivery.png";
import stockIcon from "../../assets/images/Vector.png";
import tamaraLogo from "../../assets/images/image 1.png";
import tabbyLogo from "../../assets/images/image 2.png";
import ProductList from "./ProductList";
import { Review } from "./Review";
import ProductDescription from "./ProductDescription";
import { useParams } from "react-router-dom";
import useShopifyStore from "../../store/useShopifyStore";
import { useEffect, useState } from "react";
import { addToCart } from "../../store/cart";
import toast from "react-hot-toast";
import { addReview, fetchReviews } from "../../store/review";
import { ProductCarousel2 } from "../home/ProductCarousel2";
import CircularProgress from "@mui/material/CircularProgress";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { fetchProductByHandle } from "../../store/products";

const accessToken = localStorage.getItem("accessToken");
export const ProductDetails = () => {
  const { reviews } = useShopifyStore.getState();
  const [reviewsData, setReviewData] = useState(reviews);
  const [product, setProduct] = useState(null);
  // const products = useShopifyStore((state) => state.products);
  const { handle } = useParams();
  const [mainImg, setMainImg] = useState(null);
  const [subImgs, setSubImgs] = useState([]);
  const [ratingCount, setRatingCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [filteredReviews, setFilteredReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);

  // let product_handle = handle;

  const {
    title = "",
    descriptionHtml = "",
    description = "",
    images = null,
    variants = null,
    productType,
    id = "",
    metafields = [],
  } = product || {};
  // const productImage = images?.edges?.[0]?.node?.url || "";
  const discountPrice = selectedVariant?.priceV2?.amount || "0.00";
  const originalPrice = selectedVariant?.compareAtPriceV2?.amount || "0.00";
  const productCurrency = selectedVariant?.priceV2?.currencyCode || "$";
  const savedAmount = originalPrice - discountPrice;
  const offerPercentage =
    originalPrice && discountPrice
      ? ((originalPrice - discountPrice) / originalPrice) * 100
      : 0;
  const variantId = selectedVariant?.id || "";
  // const productImages = images?.edges?.map((edge) => edge.node.url) || [];

  const numericId = id.split("/").pop();

  const qtyAvailable = selectedVariant?.quantityAvailable;

  const expressDelivery = metafields.some(
    (field) => field.key === "express_delivery" && field.value === "true"
  );
  const freeDelivery = metafields.some(
    (field) => field.key === "free_delivery" && field.value === "true"
  );

  console.log("free .........", freeDelivery, expressDelivery);
  console.log("qtyAvailable .........", qtyAvailable);

  // Handle Add to Cart
  const handleAddToCart = async () => {
    try {
      if (!variantId) {
        console.error("Variant ID not found.");
        return;
      }
      // if (accessToken === null || accessToken === undefined) {
      //   return navigate("/login");
      // }
      setLoading(true);
      const cart = await addToCart(variantId, quantity);
      setLoading(false);
      console.log("Cart updated:", cart);
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Failed to add product to cart:", error.message);
    }
  };

  const filterReviewsByProductId = (reviews, productId) => {
    if (!reviews || reviews.length === 0) {
      console.error("Reviews array is empty or undefined!");
      return [];
    }
    return reviews.filter(
      (review) => String(review.product_external_id) === String(productId)
    );
  };

  const calculateReviewStats = (filteredReviews) => {
    setRatingCount(filteredReviews.length);
    if (filteredReviews.length === 0) {
      setAverageRating(0);
      setRatingDistribution({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
      return;
    }

    // Calculate average rating
    const totalRating = filteredReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const average = totalRating / filteredReviews.length;

    // Calculate distribution of ratings
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    filteredReviews.forEach((review) => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });

    setAverageRating(Number(average.toFixed(1)));
    setRatingDistribution(distribution);
  };

  const handleQty = (qty) => {
    setQuantity(qty);
  };

  const handleAddReview = async (reviews) => {
    try {
      const res = await addReview(reviews);
      console.log("Got response :", res);
      if (res.status === 201) {
        toast.success("Review submitted successfully!");
        fetchData();
        setReviewData((prevData) => [...prevData, reviews]);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const HandleFetchReview = async () => {
    const fetchedRev = await fetchReviews();
    setReviewData(fetchedRev);
  };

  const fetchData = async () => {
    try {
      // const foundProduct = products.find((p) => p.handle === handle);
      // if (!foundProduct) {
      //   console.error("Product not found!");
      //   return;
      // }
      // setProduct(foundProduct);

      const { productData, initialOptions } = await fetchProductByHandle(
        handle
      );
      setProduct(productData);
      setSelectedOptions(initialOptions);

      if (productData?.images?.edges) {
        const allImages = productData.images.edges.map((edge) => edge.node.url);
        setMainImg(allImages[0] || null);
        setSubImgs(allImages);
      }
      HandleFetchReview();
      const filteredReviews = await filterReviewsByProductId(
        reviewsData,
        numericId
      );
      calculateReviewStats(filteredReviews);
      setFilteredReviews(filteredReviews);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [handle, numericId]);

  useEffect(() => {
    HandleFetchReview();
  }, []);

  useEffect(() => {
    // Find the matching variant based on selected options
    if (product) {
      const matchingVariant = product.variants.edges.find(({ node }) =>
        node.selectedOptions.every(
          (option) => selectedOptions[option.name] === option.value
        )
      );
      setSelectedVariant(matchingVariant ? matchingVariant.node : null);
    }
  }, [selectedOptions, product]);

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  console.log("product : ", product);
  console.log("selectedVariant : ", selectedVariant);

  return (
    <div className="px-4   md:mb-[30px]">
      <div className="block md:hidden">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography
            underline="hover"
            fontSize={"11px"}
            color="inherit"
            href="/"
          >
            Shop
          </Typography>
          {/* <Typography
            fontSize={"11px"}
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Eyewear
          </Typography> */}
          <Typography sx={{ color: "text.primary" }} fontSize={"11px"}>
            {productType}
          </Typography>
        </Breadcrumbs>
        <h2 className="text-sm font-normal text-gray-400">Urban Utility</h2>

        <p className="text-xl text-gray-700 font-bold">{title}</p>
        <div className="flex space-x-2 mt-4">
          <Rating
            name="half-rating-read"
            value={averageRating}
            precision={0.5}
            readOnly
          />
          <h4 className="text-gray-800 text-base">{ratingCount} Reviews</h4>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-10 mt-4">
        {/* Main image and sub-images section */}
        <div className="flex flex-col items-center  p-3 max-h-auto w-full md:w-[50%] h-auto  md:h-[550px]">
          {/* Main Image */}
          <img
            src={mainImg}
            alt="Product"
            className="h-[300px] w-[250px] rounded-md object-contain"
          />
          {/* Sub-images Container (displayed in a row below the main image) */}
          <div className="flex flex-row gap-2 mt-4 overflow-x-auto overflow-y-hidden no-scrollbar px-4 p-y2">
            {subImgs.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Sub Image ${index + 1}`}
                className="w-20 h-24 cursor-pointer rounded-md border object-contain"
                onMouseOver={() => setMainImg(img)}
              />
            ))}
          </div>
          {/* Quantity and Add to Cart Section */}
          <div className="mt-2 h-[50px] w-full hidden md:flex justify-center items-center gap-2">
            <div className="flex w-[40%] justify-around items-center gap-4 bg-gray-200 py-2 px-4 rounded-md cursor-pointer">
              <p
                onClick={() => {
                  if (quantity > 1) handleQty(quantity - 1); // Only decrease if quantity > 1
                }}
                className={`${
                  quantity === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                -
              </p>

              <p className="text-lg font-bold">{quantity}</p>

              <p
                onClick={() => {
                  if (quantity < qtyAvailable) handleQty(quantity + 1); // Only increase if available stock allows
                }}
                className={`${
                  quantity >= qtyAvailable
                    ? "text-gray-400 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                +
              </p>
            </div>

            <div className="w-full">
              <button
                type="button"
                className="w-full bg-slate-950 py-2.5 px-4 hover:bg-slate-800 text-white text-sm font-semibold rounded-md disabled:opacity-60 flex justify-center items-center"
                onClick={() => handleAddToCart()}
                disabled={qtyAvailable <= 0}
              >
                {loading ? (
                  <CircularProgress size="20px" />
                ) : (
                  <div className="flex items-center gap-[5px]">
                    <ShoppingBagOutlinedIcon />
                    Add To Cart
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="ml-2 h-[450px] w-full md:w-[50%] overflow-y-auto">
          <div className="hidden md:block">
            <Breadcrumbs aria-label="breadcrumb">
              <Typography
                underline="hover"
                fontSize={"11px"}
                color="inherit"
                href="/"
              >
                Shop
              </Typography>
              {/* <Typography
                fontSize={"11px"}
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                Eyewear
              </Typography> */}
              <Typography sx={{ color: "text.primary" }} fontSize={"11px"}>
                {productType}
              </Typography>
            </Breadcrumbs>

            <h2 className="text-sm font-normal text-gray-400">Urban Utility</h2>

            <span className="text-xl text-gray-700 font-bold">{title}</span>
            <div className="flex space-x-2 mt-4">
              <Rating
                name="half-rating-read"
                value={averageRating}
                precision={0.5}
                readOnly
              />
              <h4 className="text-gray-800 text-base">{ratingCount} Reviews</h4>
            </div>
          </div>
          <div className="flex flex-col flex-wrap gap-1 mt-4">
            <p className="text-gray-400 text-sm font-bold">
              was :
              <strike>
                {productCurrency}
                {originalPrice ? Number(originalPrice).toFixed(2) : "00"}
              </strike>
            </p>
            <p className="text-gray-800 text-md font-bold">
              Now : {productCurrency}
              {discountPrice ? Number(discountPrice).toFixed(2) : "00"}
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              You save
              <span className="text-gray-700 font-bold">
                {productCurrency}
                {savedAmount ? Number(savedAmount).toFixed(2) : "00"}
              </span>
              <span className="text-gray-700 text-[10px] bg-[#6fd28ee1] py-[1px] px-[3px] rounded">
                {offerPercentage ? offerPercentage.toFixed(2) : "00"}% off
              </span>
            </p>
          </div>

          {/* Render options (e.g., colors, sizes) */}
          <div className="my-3 ml-1">
            {product?.options?.map((option) => (
              <div key={option.name}>
                <h3 className="my-2">{option.name}</h3>
                <div style={{ display: "flex", gap: "10px" }}>
                  {option.values.map((value) => {
                    const isColorOption = option.name
                      .toLowerCase()
                      .includes("color");
                    const isSelected = selectedOptions[option.name] === value;

                    return (
                      <label
                        key={value}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: isColorOption ? "30px" : "auto",
                          height: isColorOption ? "30px" : "auto",
                          borderRadius: isColorOption ? "50%" : "4px", // Rounded for color, square for text
                          backgroundColor: isColorOption
                            ? value
                            : "transparent",
                          border: isSelected
                            ? "3px solid #ffffff" // Black border for selected option
                            : "3px solid transparent", // Transparent border for unselected
                          outline: isSelected
                            ? "1px solid #2f2f2f" // Black border for selected option
                            : "1px solid transparent", // Transparent border for unselected
                          cursor: "pointer",
                          // padding: isColorOption ? "0" : "5px 10px",
                          textAlign: "center",
                          // boxShadow: isSelected
                          //   ? "0 0 5px rgba(0, 0, 0, 0.5)" // Optional shadow for selected
                          //   : "none",
                        }}
                      >
                        <input
                          type="radio"
                          name={option.name}
                          value={value}
                          checked={isSelected}
                          onChange={() =>
                            handleOptionChange(option.name, value)
                          }
                          style={{ display: "none" }}

                        />
                        {!isColorOption && (
                          <span className="bg-[#E0E0E04D] py-[2px] px-[5px] text-[#3F4646] text-14px] font-semibold">
                            {value}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-start items-center w-auto max-w-[350px] text-gray-600 gap-2">
            {qtyAvailable > 0 && freeDelivery && (
              <div className="flex justify-between items-center bg-[#EBF1FC] px-2 py-1 rounded-md gap-2">
                <div className="flex items-center gap-2">
                  <img src={deliveryIcon} alt="Delivery Icon" />
                  <p className="text-[12px]">Free Delivery</p>
                </div>
              </div>
            )}

            {qtyAvailable === 1 && (
              <div className="flex justify-between items-center bg-[#EBF1FC] px-2 py-1.5 rounded-md gap-2">
                <div className="flex items-center gap-2">
                  <img src={stockIcon} alt="Stock Icon" />
                  <p className="text-[12px]">Only one left in stock</p>
                </div>
              </div>
            )}
            {qtyAvailable === 2 && (
              <div className="flex justify-between items-center bg-[#EBF1FC] px-2 py-1.5 rounded-md gap-2">
                <div className="flex items-center gap-2">
                  <img src={stockIcon} alt="Stock Icon" />
                  <p className="text-[12px]">Only two left in stock</p>
                </div>
              </div>
            )}
            {qtyAvailable <= 0 && (
              <div className="flex justify-between items-center bg-[#EBF1FC] px-2 py-1.5 rounded-md gap-2">
                <div className="flex items-center gap-2">
                  <img src={stockIcon} alt="Stock Icon" />
                  <p className="text-[12px]">Out of stock</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center gap-3 w-auto max-w-[400px] bg-[#FFF6EC] border rounded px-2 py-1 my-2">
              <img src={tamaraLogo} alt="" />
              <p className="text-[12px]">
                Split 4 payments of AEW 15.50 - No late fees, Sharia Complaints
              </p>
            </div>
            <div className="flex justify-between items-center gap-3 w-auto max-w-[400px] bg-[#ecffec] border rounded px-2 py-1">
              <img src={tabbyLogo} alt="" />
              <p className="text-[12px]">
                4 interest-free payments of AED 15.50. No fees.
                Shariah-compliant
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 w-full flex gap-2 flex-col-reverse md:flex-row h-auto">
        <Review
          product_handle={numericId}
          filteredReviews={filteredReviews}
          handleReview={handleAddReview}
          ratingDistribution={ratingDistribution}
          averageRating={averageRating}
          ratingCount={ratingCount}
        />
        <div className=" w-full">
          <ProductDescription
            description={description}
            metafields={metafields}
          />
        </div>
      </div>

      <div className="">
        <ProductList title={"Similar Products"} />
      </div>
      <div className="">
        <ProductList title={"Popular Products"} />
      </div>

      {/* Mobile fixed bottom Add to Cart */}
      <div className="fixed bottom-[65px] left-0 w-full md:hidden bg-white border-t p-4 flex justify-between items-center gap-2 shadow-md">
        {/* Quantity Control Section */}
        <div className="flex w-[45%] justify-around items-center gap-4 bg-gray-200 py-2 px-4 rounded-md">
          <p
            onClick={() => {
              if (quantity > 1) handleQty(quantity - 1); // Decrease quantity only if it's greater than 1
            }}
            className={`${
              quantity === 1
                ? "text-gray-400 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            -
          </p>
          <span className="text-gray-400">|</span>
          <p className="text-lg font-bold">{quantity}</p>
          <span className="text-gray-400">|</span>
          <p
            onClick={() => {
              if (quantity < qtyAvailable) handleQty(quantity + 1); // Increase quantity only if it's less than available stock
            }}
            className={`${
              quantity >= qtyAvailable
                ? "text-gray-400 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            +
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          className="w-full bg-orange-500 py-2.5 px-4 hover:bg-orange-600 text-white text-sm font-semibold rounded-md disabled:opacity-60 flex justify-center items-center"
          onClick={() => handleAddToCart()}
          disabled={qtyAvailable <= 0}
        >
          {loading ? (
            <CircularProgress size="20px" />
          ) : (
            <div className="flex items-center gap-[5px]">
              <ShoppingBagOutlinedIcon />
              Add To Cart
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
