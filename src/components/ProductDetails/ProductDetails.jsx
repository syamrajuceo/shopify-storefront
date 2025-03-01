// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { Breadcrumbs, Rating, Typography } from "@mui/material";
import deliveryIcon from "../../assets/images/hugeicons_truck-delivery.png";
import stockIcon from "../../assets/images/Vector.png";
import tamaraLogo from "../../assets/images/image 1.png";
import tabbyLogo from "../../assets/images/image 2.png";
import ProductList from "./ProductList";
import { Review } from "./Review";
import ProductDescription from "./ProductDescription";
import { useNavigate, useParams } from "react-router-dom";
// import useShopifyStore from "../../store/useShopifyStore";
import { useEffect, useRef, useState } from "react";
// import { addToCart } from "../../store/cart";
import { addToCart, fetchCart } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";
// import { addReview, fetchReviews } from "../../store/review";
// import { ProductCarousel2 } from "../home/ProductCarousel2";
import CircularProgress from "@mui/material/CircularProgress";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { fetchProductByHandle } from "../../store/products";
import { useDispatch, useSelector } from "react-redux";
import {
  addReview,
  deleteReview,
  fetchReviews,
  updateReview,
} from "../../redux/slices/reviewsSlice";
import { Helmet } from "react-helmet-async";
import { colorMap } from "../../utils/colors";
import { TabbyPromo } from "../tabby/TabbyPromo";
import TamaraPromo from "../tamara/TamaraPromo";

export const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { handle } = useParams();
  const [mainContent, setMainContent] = useState({
    type: "image",
    content: null,
  });
  const [subImgs, setSubImgs] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [videos, setVideos] = useState([]);
  const videoRef = useRef(null); // Ref for video element
  const [showAll, setShowAll] = useState(false);
  // const [isPlaying, setIsPlaying] = useState(false); // State for play/pause
  // const [isMuted, setIsMuted] = useState(false); // State for mute/unmute

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const {
    title = "",
    descriptionHtml = "",
    description = "",
    images = [],
    variants = null,
    productType,
    id = "",
    metafields = [],
  } = product || {};
  const discountPrice = selectedVariant?.priceV2?.amount || "0.00";
  const originalPrice = selectedVariant?.compareAtPriceV2?.amount || "0.00";
  const productCurrency = selectedVariant?.priceV2?.currencyCode || "$";
  const savedAmount = originalPrice - discountPrice;
  const offerPercentage =
    originalPrice && discountPrice
      ? ((originalPrice - discountPrice) / originalPrice) * 100
      : 0;
  const variantId = selectedVariant?.id || "";

  const numericId = id.split("/").pop();

  const qtyAvailable = selectedVariant?.quantityAvailable;

  const expressDelivery = metafields?.some(
    (field) => field?.key === "express_delivery" && field?.value === "true"
  );

  const freeDelivery = metafields?.some(
    (field) => field?.key === "free_delivery" && field?.value === "true"
  );

  // Filter out null values from metafields
  const validMetafields = metafields?.filter((field) => field !== null) || [];

  const brand =
    validMetafields?.find((field) => field?.key === "brand")?.value || "";

  const color = validMetafields?.length
    ? validMetafields
        .find(
          (metobj) =>
            metobj?.key === "lens-color" && Array.isArray(metobj?.metavalue)
        )
        ?.metavalue?.reduce((acc, val) => {
          return acc ? `${acc}, ${val.handle}` : val.handle;
        }, "")
    : "";

  const gender = validMetafields?.length
    ? validMetafields
        .find(
          (metobj) =>
            metobj?.key === "target-gender" && Array.isArray(metobj?.metavalue)
        )
        ?.metavalue?.reduce((acc, val) => {
          return acc ? `${acc}, ${val.handle}` : val.handle;
        }, "")
    : "";

  const age = validMetafields?.length
    ? validMetafields
        .find(
          (metobj) =>
            metobj?.key === "age-group" && Array.isArray(metobj?.metavalue)
        )
        ?.metavalue?.reduce((acc, val) => {
          return acc ? `${acc}, ${val.handle}` : val.handle;
        }, "")
    : "";

  const frameDesign = validMetafields?.length
    ? validMetafields
        .find(
          (metobj) =>
            metobj?.key === "eyewear-frame-design" &&
            Array.isArray(metobj?.metavalue)
        )
        ?.metavalue?.reduce((acc, val) => {
          return acc ? `${acc}, ${val.handle}` : val.handle;
        }, "")
    : "";

  const countryOfOrigin = validMetafields?.length
    ? validMetafields
        .find(
          (metobj) =>
            metobj?.key === "country-of-origin" &&
            Array.isArray(metobj?.metavalue)
        )
        ?.metavalue?.reduce((acc, val) => {
          return acc ? `${acc}, ${val.handle}` : val.handle;
        }, "")
    : "";

  // // Handle Add to Cart
  // const handleAddToCart = async () => {
  //   try {
  //     if (!variantId) {
  //       console.error("Variant ID not found.");
  //       return;
  //     }
  //     setLoading(true);
  //     const cart = await addToCart(variantId, quantity);
  //     setLoading(false);
  //     console.log("Cart updated:", cart);
  //     toast.success("Product added to cart!");
  //   } catch (error) {
  //     console.error("Failed to add product to cart:", error.message);
  //   }
  // };

  const handleAddToCart = async () => {
    try {
      if (!variantId) {
        console.error("Variant ID not found.");
        return;
      }
      setLoading(true);
      await dispatch(addToCart({ variantId, quantity })).unwrap();
      await dispatch(fetchCart()).unwrap();
      setLoading(false);
      toast.success("Added to cart successfully");
      console.log("Item added and cart updated successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Failed to add product to cart:", error.message);
      toast.error("Failed to add product to cart");
    }
  };

  const handleQty = (qty) => {
    setQuantity(qty);
  };

  const fetchData = async () => {
    try {
      const { productData, initialOptions } = await fetchProductByHandle(
        handle
      );
      setProduct(productData);
      setSelectedOptions(initialOptions);

      if (productData?.images?.edges) {
        const allImages = productData.images.edges.map((edge) => edge.node.url);
        setSubImgs(allImages);
      }
      const videoItems = Array.isArray(productData?.media)
        ? productData.media.filter((media) => media.type === "video")
        : [];
      setVideos(videoItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [handle, numericId]);

  useEffect(() => {
    // Find the matching variant based on selected options
    if (product) {
      const matchingVariant = product?.variants?.edges?.find(({ node }) =>
        node.selectedOptions.every(
          (option) => selectedOptions[option.name] === option.value
        )
      );
      setSelectedVariant(matchingVariant ? matchingVariant.node : null);
      setMainContent({
        type: "image",
        content: matchingVariant?.node?.image?.url || subImgs[0],
      });
    }
  }, [selectedOptions, product]);

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  // --------------------- review --------------------

  const { reviews, error } = useSelector((state) => state.reviews);

  // Local state for derived data
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [ratingCount, setRatingCount] = useState(0);

  // Fetch reviews on component mount
  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  // Filter reviews for the specific product whenever reviews or product ID changes
  useEffect(() => {
    if (reviews) {
      const productReviews = filterReviewsByProductId(reviews, numericId);
      setFilteredReviews(productReviews);
      calculateReviewStats(productReviews);
    }
  }, [reviews, numericId]);

  // Filter reviews for a specific product
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

    // Initialize distribution
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    // Calculate total rating and populate distribution
    const totalRating = filteredReviews.reduce((sum, review) => {
      const { rating } = review;

      // Ensure the rating is within valid range
      if (rating >= 1 && rating <= 5) {
        distribution[rating] = (distribution[rating] || 0) + 1;
        return sum + rating;
      } else {
        console.warn(`Invalid rating value: ${rating}`);
        return sum;
      }
    }, 0);

    // Calculate the average rating
    const average = totalRating / filteredReviews.length;

    setAverageRating(Number(average.toFixed(1)));
    setRatingDistribution(distribution);
  };

  // Handle adding a review
  const handleAddReview = async (reviewData) => {
    try {
      await dispatch(addReview(reviewData)).unwrap(); // Ensure the action completes successfully
      dispatch(fetchReviews()); // Re-fetch reviews after successfully adding a new one
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  // // Handle deleting a review
  // const handleDeleteReview = (reviewId) => {
  //   dispatch(deleteReview(reviewId)).then(() => {
  //     dispatch(fetchReviews()); // Re-fetch reviews after successfully deleting a review
  //   });
  // };

  // // Handle updating a review
  // const handleUpdateReview = (reviewId, updatedData) => {
  //   dispatch(updateReview({ reviewId, updatedData })).then(() => {
  //     dispatch(fetchReviews()); // Re-fetch reviews after successfully updating a review
  //   });
  // };

  // function getColorClass(color) {
  //   return colorMap[color] || "#ffffff0";
  // }

  return (
    <>
      {/* ------------------------ for SEO optimization ----------------------------- */}
      <Helmet>
        <title>{title} - Buy Now at the Best Price</title>
        <meta
          name="description"
          content={
            description || "Shop the latest products at unbeatable prices."
          }
        />
        <meta
          name="keywords"
          content={`Buy ${title}, ${productType}, ${color || ""}, ${
            gender || ""
          }, ${age || ""}, ${frameDesign || ""}`}
        />
        <link rel="canonical" href={`https://eyestore.ae/product/${handle}`} />
        <meta property="og:title" content={`${title} - Available Now`} />
        <meta
          property="og:description"
          content={description || "Shop the latest products now!"}
        />
        <meta
          property="og:image"
          content={
            subImgs?.[0]?.src || "https://yourdomain.com/default-image.jpg"
          }
        />
        <meta
          property="og:url"
          content={`https://eyestore.ae/product/${handle}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} - Buy Now`} />
        <meta
          name="twitter:description"
          content={
            description || "Discover premium products at the best price."
          }
        />
        <meta
          name="twitter:image"
          content={
            subImgs?.[0]?.src || "https://yourdomain.com/default-image.jpg"
          }
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Product",
            name: title,
            description: description || "",
            image: subImgs?.map((img) => img.src) || [
              "https://yourdomain.com/default-image.jpg",
            ],
            brand: brand || "",
            color: color || "N/A",
            gender: gender || "Unisex",
            ageGroup: age || "All Ages",
            frameDesign: frameDesign || "N/A",
            offers: {
              "@type": "Offer",
              price: discountPrice || "0.00",
              priceCurrency: productCurrency || "USD", // Updated to use `productCurrency`
              availability: quantity > 0 ? "In Stock" : "Out of Stock",
              url: `https://eyestore.ae/products/${handle}`,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: averageRating || 0,
              reviewCount: ratingCount || 0,
            },
          })}
        </script>
      </Helmet>

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
            <Typography sx={{ color: "text.primary" }} fontSize={"11px"}>
              {productType}
            </Typography>
          </Breadcrumbs>
          <h2 className="text-sm font-normal text-gray-400">{brand}</h2>

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
        <div className="flex flex-col md:flex-row gap-10 mt-4 h-auto w-full">
          {/* Main image and sub-images section */}
          <div className="relative md:sticky md:top-10 flex flex-col items-center p-3 h-full w-full md:w-[50%]">
            {/* Main Display Section */}
            {mainContent.type === "image" ? (
              <img
                src={mainContent.content}
                alt="Product"
                className="h-[400px] w-auto rounded-md object-contain"
              />
            ) : (
              <div className="relative">
                <video ref={videoRef} className="h-[300px] w-auto" controls>
                  {mainContent.content?.sources?.map((source, index) => (
                    <source
                      key={index}
                      src={source.url}
                      type={`video/${source.format}`}
                    />
                  ))}
                  Your browser does not support the video tag.
                </video>
                {/* <div className="absolute bottom-2 right-2 flex gap-2">
                <button
                  onClick={togglePlayPause}
                  className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
                >
                  {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </button>
                <button
                  onClick={toggleMute}
                  className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
                >
                  {isMuted ? (
                    <FaVolumeMute size={20} />
                  ) : (
                    <FaVolumeUp size={20} />
                  )}
                </button>
              </div> */}
              </div>
            )}
            {/* Sub-images Container (displayed in a row below the main image) */}
            <div className="flex flex-row gap-2 mt-4 overflow-x-auto overflow-y-hidden no-scrollbar px-4 p-y2">
              {/* Sub-images */}
              {subImgs.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Sub Image ${index + 1}`}
                  className="w-20 h-24 cursor-pointer rounded-md border object-contain"
                  onMouseOver={() =>
                    setMainContent({ type: "image", content: img })
                  }
                />
              ))}
              {/* Videos */}
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="w-20 h-24 cursor-pointer rounded-md border object-contain overflow-hidden"
                >
                  <video
                    className="w-full h-full object-contain rounded-md"
                    onMouseOver={() =>
                      setMainContent({ type: "video", content: video })
                    }
                  >
                    {video.sources.map((source, index) => (
                      <source
                        key={index}
                        src={source.url}
                        type={`video/${source.format}`}
                      />
                    ))}
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
            {/* Quantity and Add to Cart Section */}
            <div className="mt-2 h-[50px] w-full hidden md:flex justify-center items-center gap-2">
              <div className="flex w-[40%] justify-around items-center gap-4 bg-gray-200 py-2 px-4 rounded-md cursor-pointer">
                <p
                  onClick={() => {
                    if (quantity > 1) handleQty(quantity - 1);
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
                    if (quantity < qtyAvailable) handleQty(quantity + 1);
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
          <div className="ml-2 w-full md:w-[50%] h-auto">
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

              <h2 className="text-sm font-normal text-gray-400">{brand}</h2>

              <span className="text-xl text-gray-700 font-bold">{title}</span>
              <div className="flex space-x-2 mt-4">
                <Rating
                  name="half-rating-read"
                  value={averageRating}
                  precision={0.5}
                  readOnly
                />
                <h4 className="text-gray-800 text-base">
                  {ratingCount} Reviews
                </h4>
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

            {/* Render options (excluding colors) */}
            <div className="my-2 h-auto">
              {product?.options
                ?.filter(
                  (option) => !option.name.toLowerCase().includes("color")
                ) // Exclude color options
                .map((option) => (
                  <div key={option.name}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        alignItems: "center",
                        paddingLeft: "5px",
                        maxWidth: "450px",
                        padding: "2px",
                        overflow: showAll ? "visible" : "hidden",
                        maxHeight: showAll ? "none" : "50px",
                        transition: "max-height 0.3s ease-in-out",
                      }}
                    >
                      {option.values.map((value) => {
                        const isSelected =
                          selectedOptions[option.name] === value;
                        return (
                          <label
                            key={value}
                            style={{
                              borderRadius: "4px",
                              color: "black",
                              border: isSelected
                                ? "3px solid #ffffff"
                                : "2px solid #969696",
                              outline: isSelected
                                ? "1px solid #2f2f2f"
                                : "1px solid transparent",
                              cursor: "pointer",
                              padding: "1px 2px",
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
                            <span className="bg-[#E0E0E04D] py-[2px] px-[5px] text-[#3F4646] text-14px font-semibold">
                              {value}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {option.values.length > 10 && (
                      <button
                        className="mt-2 text-gray-500 flex items-center gap-1 w-full justify-center border max-w-[450px] bg-[#f9f9f973] rounded"
                        onClick={() => setShowAll(!showAll)}
                      >
                        {showAll ? "Show Less" : "Load More"}
                        <span>{showAll ? "↑" : "↓"}</span>
                      </button>
                    )}
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
                  Split 4 payments of AEW 15.50 - No late fees, Sharia
                  Complaints
                </p>
              </div>
              {/* <div className="flex justify-between items-center gap-3 w-auto max-w-[400px] bg-[#ecffec] border rounded px-2 py-1">
                <img src={tabbyLogo} alt="" />
                <p className="text-[12px]">
                  4 interest-free payments of AED 15.50. No fees.
                  Shariah-compliant
                </p>
              </div> */}
              {/* <div className="flex justify-between items-center gap-3 w-auto max-w-[400px] px-2 py-1 bg-[#ecffec] border rounded">
                <TamaraPromo
                  price={discountPrice}
                  currency={productCurrency}
                  countryCode={"AE"}
                />
              </div> */}
              <div className="flex justify-between items-center gap-3 w-auto max-w-[400px]  ">
                <TabbyPromo
                  price={discountPrice}
                  currency={productCurrency}
                  apiKey={"pk_test_7584decc-10fe-4ffc-a5b6-ad847a229ac3"}
                  merchantCode={"default"}
                />
              </div>
            </div>
            <div className="w-full">
              <ProductDescription
                description={description}
                descriptionHtml={descriptionHtml}
                metafields={metafields}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 w-full h-auto">
          <Review
            product_handle={numericId}
            filteredReviews={filteredReviews}
            handleReview={handleAddReview}
            ratingDistribution={ratingDistribution}
            averageRating={averageRating}
            ratingCount={ratingCount}
          />
        </div>

        <div className="">
          <ProductList title={"Similar Products"} category={productType} />
        </div>
        <div className="">
          <ProductList title={"Popular Products"} category={""} />
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
    </>
  );
};
