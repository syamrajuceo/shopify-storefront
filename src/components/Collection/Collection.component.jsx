import { useEffect, useState, useCallback } from "react";
import FilterBoxComponent from "./FilterBox.component";
import { IoIosArrowForward } from "react-icons/io";
import { ProductCard } from "../productCard/ProductCard";
import { FaFilter } from "react-icons/fa6";
import { BiSortAlt2 } from "react-icons/bi";
import SortComponent from "./Sort.component";
import FilterComponent from "./Filter.component";
import FilterController from "./FilterController";
import { Link } from "react-router-dom";
import {
  categoryOptions,
  ColorDataOptions,
  EyeDataBrands,
  filterDataOptions,
  FilterName,
  genderDataOptions,
  productDataStatus,
} from "../../data/Collection.data";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { fetchProducts } from "../../redux/slices/productSlice";

const currencyFormat = "AED";
const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyFormat,
  })
    .format(price)
    .split(".")[0];

function CollectionComponent({ type = "Men" }) {
  const dispatch = useDispatch();
  const { products, pagination, status } = useSelector((state) => state.products);
  console.log("products : ",products)
  const [temporarypriceRange, temporarysetPriceRange] = useState({
    min: 0,
    max: 6000,
  });
  const [priceRange, setPriceRange] = useState(temporarypriceRange);
  const [filterProduct, setFilterProduct] = useState([]);
  const [filterOptions, setFilterOptions] = useState(filterDataOptions);
  const [appliedfilter, SetAppliedFilter] = useState(0);
  const [selectedfilter, SetSelectedFilter] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // Simple debounce implementation
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Load initial products
  useEffect(() => {
    setIsInitialLoad(true);
    dispatch(fetchProducts({ limit: 20, cursor: null }))
      .unwrap()
      .then((response) => {
        setFilterProduct(response.products || []);
        setHasMore(response.pagination?.hasNextPage || false);
      })
      .finally(() => setIsInitialLoad(false));
    setFilterOptions(filterDataOptions);
  }, [dispatch, type]);

  // Filter products
  useEffect(() => {
    const filteredProducts = FilterController(products, filterOptions, priceRange);
    setFilterProduct(filteredProducts);
  }, [products, filterOptions, priceRange]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 500 ||
      status === "loading" ||
      !hasMore
    ) {
      return;
    }
    loadMoreProducts();
  }, [status, hasMore, pagination?.nextCursor]);

  // Debounced scroll handler
  const debouncedScrollHandler = debounce(handleScroll, 300);

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", debouncedScrollHandler);
    return () => window.removeEventListener("scroll", debouncedScrollHandler);
  }, [debouncedScrollHandler]);

  // Load more products function
  const loadMoreProducts = useCallback(() => {
    if (status !== "loading" && hasMore && pagination?.nextCursor) {
      dispatch(fetchProducts({ 
        limit: 20, 
        cursor: pagination.nextCursor 
      }))
      .unwrap()
      .then((response) => {
        setFilterProduct(prev => [...prev, ...(response.products || [])]);
        setHasMore(response.pagination?.hasNextPage || false);
      });
    }
  }, [dispatch, status, hasMore, pagination?.nextCursor]);

  // Price change handlers
  const handlePriceChange = (e, type) => {
    temporarysetPriceRange((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  };

  const handleKeyDownPriceChange = (e, type) => {
    const step = 50;
    let value = parseInt(e.target.value, 10) || 0;

    if (e.key === "ArrowUp") {
      value += step - 1;
    } else if (e.key === "ArrowDown") {
      value = Math.max(value - step + 1, 0);
    } else {
      return;
    }

    if (type === "min") {
      value = Math.min(value, temporarypriceRange.max);
    } else if (type === "max") {
      value = Math.max(value, temporarypriceRange.min);
    }

    temporarysetPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleFilterChange = (header, selectedOptions) => {
    const parsedOptions = Array.isArray(selectedOptions)
      ? selectedOptions
      : JSON.parse(selectedOptions);

    setFilterOptions((prevState) => ({
      ...prevState,
      [header]: parsedOptions,
    }));
  };

  // Mobile filter handlers
  const genderOptions = genderDataOptions;
  const frameColorOptions = ColorDataOptions;
  const brandOptions = EyeDataBrands;
  const productStatusOptions = productDataStatus;

  return (
    <div className="flex flex-col lg:flex-row relative h-full">
      {/* Desktop Filters Sidebar */}
      <div className="bg-[#FFFFFF] lg:block lg:w-1/5 hidden border-2 sticky h-full top-2">
        <div className="p-3">
          <div className="pl-3">
            <h1 className="font-semibold text-xl">Price</h1>
            <div className="flex lg:flex-col xl:flex-row gap-2 mt-3 items-center">
              <div>
                <h1 className="text-[12px]">Min Price</h1>
                <input
                  type="number"
                  className="border w-[116.44px] h-[38px] py-1 px-3"
                  min={0}
                  value={temporarypriceRange.min}
                  onChange={(e) => handlePriceChange(e, "min")}
                  onKeyDown={(e) => handleKeyDownPriceChange(e, "min")}
                />
              </div>
              <span className="text-[14px] text-[#030712]">-</span>
              <div>
                <h1 className="text-[12px]">Max Price</h1>
                <input
                  type="number"
                  className="border w-[116.44px] h-[38px] py-1 px-3"
                  min={1}
                  value={temporarypriceRange.max}
                  onChange={(e) => handlePriceChange(e, "max")}
                  onKeyDown={(e) => handleKeyDownPriceChange(e, "max")}
                />
              </div>
            </div>
            <div className="flex mt-3 items-center justify-between">
              <div>
                Price: {formatPrice(temporarypriceRange.min)} —{" "}
                {formatPrice(temporarypriceRange.max)}
              </div>
              <button
                className="border px-3 py-2 bg-[#E5E7EB] transition"
                onClick={() => setPriceRange(temporarypriceRange)}
              >
                Apply
              </button>
            </div>
          </div>

          <div className="p-3">
            {type === "" || !["gender"].includes(type) && (
              <FilterBoxComponent
                header={FilterName.Gender}
                options={genderOptions}
                filterseletedOptions={filterOptions.Gender}
                onFilterChange={handleFilterChange}
                type={type}
              />
            )}
            {type === "" || !["ContactLenses", "Sunglasses", "Eyeglasses"].includes(type) && (
              <FilterBoxComponent
                header={FilterName.Category}
                options={categoryOptions}
                filterseletedOptions={filterOptions[FilterName.Category]}
                onFilterChange={handleFilterChange}
                type={type}
              />
            )}
            <FilterBoxComponent
              header={FilterName.Color}
              options={frameColorOptions}
              filterseletedOptions={filterOptions[FilterName.Color]}
              onFilterChange={handleFilterChange}
              type={type}
            />
            <FilterBoxComponent
              header={FilterName.Brand}
              options={brandOptions}
              filterseletedOptions={filterOptions[FilterName.Brand]}
              onFilterChange={handleFilterChange}
              type={type}
            />
            <FilterBoxComponent
              header={FilterName.Status}
              options={productStatusOptions}
              filterseletedOptions={filterOptions[FilterName.Status]}
              onFilterChange={handleFilterChange}
              type={type}
            />
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="w-full lg:w-4/5 px-5">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm text-gray-700 p-4">
          <Link className="hover:text-blue-600 cursor-pointer" to="/shop">
            Shop
          </Link>
          {type !== "" && (
            <>
              <IoIosArrowForward />
              <span className="font-semibold">
                {type === "ContactLenses"
                  ? "Contact Lenses"
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </>
          )}
        </div>

        {/* Product Count */}
        <div className="bg-white p-3 text-sm text-gray-700">
          Showing {filterProduct.length} products
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 justify-items-center">
          {isInitialLoad ? (
            <div className="col-span-full flex justify-center">
              <CircularProgress />
            </div>
          ) : filterProduct.length > 0 ? (
            filterProduct.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full">No products available</p>
          )}
        </div>

        {/* Loading indicator */}
        {status === "loading" && !isInitialLoad && (
          <div className="w-full flex justify-center p-4">
            <CircularProgress size={24} />
          </div>
        )}

        {/* End of products message */}
        {!hasMore && filterProduct.length > 0 && (
          <div className="text-center py-4 text-gray-500">
            You've reached the end of products
          </div>
        )}
      </div>

      {/* Mobile Filters */}
      {selectedfilter === null ? (
        <div className="flex lg:hidden fixed z-30 bottom-[70px] md:bottom-[0px] border-r-1 bg-[#FFFFFF] p-3 w-full justify-between">
          <button
            className="flex flex-col items-center w-[50%] border-r-2"
            onClick={() => SetSelectedFilter("sort")}
          >
            <div className="flex items-center gap-3">
              <BiSortAlt2 className="text-xl text-blue-600" />
              <p className="mt-1">Sort</p>
            </div>
            <p className="text-[#9C9C9C] text-[11px]">Recommended</p>
          </button>
          <button
            className="flex flex-col items-center w-[50%]"
            onClick={() => SetSelectedFilter("filter")}
          >
            <div className="flex items-center gap-3">
              <FaFilter className="text-xl text-blue-600" />
              <p className="mt-1">Filter</p>
            </div>
            <p className="text-[#9C9C9C] text-[11px]">
              {appliedfilter} Applied
            </p>
          </button>
        </div>
      ) : (
        <div className="block lg:hidden fixed z-30 bottom-[70px] bg-[#FFFFFF] w-full">
          {selectedfilter === "sort" && (
            <SortComponent
              SetSelectedFilter={SetSelectedFilter}
              Sortoption={filterOptions[FilterName.Sort]}
              setSortOption={setFilterOptions}
            />
          )}
          {selectedfilter === "filter" && (
            <FilterComponent
              SetSelectedFilter={SetSelectedFilter}
              SetFilterCount={SetAppliedFilter}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              UrlType={type}
            />
          )}
        </div>
      )}
    </div>
  );
}
export default CollectionComponent;