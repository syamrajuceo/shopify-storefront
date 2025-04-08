import { useEffect, useState, useCallback, useMemo } from "react";
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
import { fetchProducts, setCategory, setFilters } from "../../redux/slices/productSlice";

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
  const { products, pagination, status, currentCategory, currentFilters } = useSelector((state) => state.products);
  
  const [temporaryPriceRange, setTemporaryPriceRange] = useState({
    min: 0,
    max: 6000,
  });
  const [priceRange, setPriceRange] = useState(temporaryPriceRange);
  const [filterProduct, setFilterProduct] = useState([]);
  const [filterOptions, setFilterOptions] = useState(filterDataOptions);
  const [appliedFilter, setAppliedFilter] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const categoryMap = useMemo(() => ({
    'Eyeglasses': 'Eyeglasses',
    'ContactLenses': 'Contact Lenses',
    'Sunglasses': 'Sunglasses',
    'Men': 'Men',
    'Women': 'Women'
  }), []);

  const currentCategoryFromType = useMemo(() => categoryMap[type], [type, categoryMap]);

  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }, []);

  const loadProducts = useCallback((cursor = null) => {
    dispatch(setCategory(currentCategoryFromType));
    
    return dispatch(fetchProducts({ 
      limit: 20, 
      cursor,
      category: currentCategoryFromType,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      gender: filterOptions[FilterName.Gender],
      frameColor: filterOptions[FilterName.Color],
      brand: filterOptions[FilterName.Brand],
      available: filterOptions[FilterName.Status]?.includes("Available")
    }))
      .unwrap()
      .then((response) => {
        setHasMore(response.pagination?.hasNextPage || false);
        return response;
      });
  }, [dispatch, currentCategoryFromType, priceRange, filterOptions]);

  // Initial load effect
  useEffect(() => {
    setIsInitialLoad(true);
    loadProducts()
      .finally(() => setIsInitialLoad(false));
    
    setFilterOptions(filterDataOptions);
  }, [loadProducts]);

  // Apply filters to products
  useEffect(() => {
    const filteredProducts = FilterController(
      products, 
      filterOptions, 
      priceRange,
      currentCategoryFromType
    );
    setFilterProduct(filteredProducts);
  }, [products, filterOptions, priceRange, currentCategoryFromType]);

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
  }, [status, hasMore, loadProducts]);

  const debouncedScrollHandler = useMemo(() => debounce(handleScroll, 300), [debounce, handleScroll]);

  useEffect(() => {
    window.addEventListener("scroll", debouncedScrollHandler);
    return () => window.removeEventListener("scroll", debouncedScrollHandler);
  }, [debouncedScrollHandler]);

  const loadMoreProducts = useCallback(() => {
    if (status !== "loading" && hasMore && pagination?.nextCursor) {
      loadProducts(pagination.nextCursor)
        .then((response) => {
          setFilterProduct(prev => [...prev, ...(response.products || [])]);
        });
    }
  }, [status, hasMore, pagination?.nextCursor, loadProducts]);

  const handlePriceChange = (e, rangeType) => {
    setTemporaryPriceRange(prev => ({
      ...prev,
      [rangeType]: parseInt(e.target.value) || 0,
    }));
  };

  const handleKeyDownPriceChange = (e, rangeType) => {
    const step = 50;
    let value = parseInt(e.target.value, 10) || 0;

    if (e.key === "ArrowUp") {
      value += step;
    } else if (e.key === "ArrowDown") {
      value = Math.max(value - step, 0);
    } else {
      return;
    }

    if (rangeType === "min") {
      value = Math.min(value, temporaryPriceRange.max);
    } else if (rangeType === "max") {
      value = Math.max(value, temporaryPriceRange.min);
    }

    setTemporaryPriceRange(prev => ({
      ...prev,
      [rangeType]: value,
    }));
  };

  const handleFilterChange = (header, selectedOptions) => {
    const newFilterOptions = {
      ...filterOptions,
      [header]: Array.isArray(selectedOptions) ? selectedOptions : [selectedOptions]
    };
    
    setFilterOptions(newFilterOptions);
    dispatch(setFilters({
      [header.toLowerCase()]: newFilterOptions[header]
    }));
  };

  const showCategoryFilter = !["Eyeglasses", "ContactLenses", "Sunglasses"].includes(type);
  const showGenderFilter = !["Men", "Women"].includes(type);

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
                  value={temporaryPriceRange.min}
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
                  value={temporaryPriceRange.max}
                  onChange={(e) => handlePriceChange(e, "max")}
                  onKeyDown={(e) => handleKeyDownPriceChange(e, "max")}
                />
              </div>
            </div>
            <div className="flex mt-3 items-center justify-between">
              <div>
                Price: {formatPrice(temporaryPriceRange.min)} —{" "}
                {formatPrice(temporaryPriceRange.max)}
              </div>
              <button
                className="border px-3 py-2 bg-[#E5E7EB] transition"
                onClick={() => setPriceRange(temporaryPriceRange)}
              >
                Apply
              </button>
            </div>
          </div>

          <div className="p-3">
            {showGenderFilter && (
              <FilterBoxComponent
                header={FilterName.Gender}
                options={genderDataOptions}
                selectedOptions={filterOptions[FilterName.Gender] || []}
                onFilterChange={handleFilterChange}
              />
            )}
            {showCategoryFilter && (
              <FilterBoxComponent
                header={FilterName.Category}
                options={categoryOptions}
                selectedOptions={filterOptions[FilterName.Category] || []}
                onFilterChange={handleFilterChange}
              />
            )}
            <FilterBoxComponent
              header={FilterName.Color}
              options={ColorDataOptions}
              selectedOptions={filterOptions[FilterName.Color] || []}
              onFilterChange={handleFilterChange}
            />
            <FilterBoxComponent
              header={FilterName.Brand}
              options={EyeDataBrands}
              selectedOptions={filterOptions[FilterName.Brand] || []}
              onFilterChange={handleFilterChange}
            />
            <FilterBoxComponent
              header={FilterName.Status}
              options={productDataStatus}
              selectedOptions={filterOptions[FilterName.Status] || []}
              onFilterChange={handleFilterChange}
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
            <p className="col-span-full">No products available in this category</p>
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
      {selectedFilter === null ? (
        <div className="flex lg:hidden fixed z-30 bottom-[70px] md:bottom-[0px] border-r-1 bg-[#FFFFFF] p-3 w-full justify-between">
          <button
            className="flex flex-col items-center w-[50%] border-r-2"
            onClick={() => setSelectedFilter("sort")}
          >
            <div className="flex items-center gap-3">
              <BiSortAlt2 className="text-xl text-blue-600" />
              <p className="mt-1">Sort</p>
            </div>
            <p className="text-[#9C9C9C] text-[11px]">Recommended</p>
          </button>
          <button
            className="flex flex-col items-center w-[50%]"
            onClick={() => setSelectedFilter("filter")}
          >
            <div className="flex items-center gap-3">
              <FaFilter className="text-xl text-blue-600" />
              <p className="mt-1">Filter</p>
            </div>
            <p className="text-[#9C9C9C] text-[11px]">
              {appliedFilter} Applied
            </p>
          </button>
        </div>
      ) : (
        <div className="block lg:hidden fixed z-30 bottom-[70px] bg-[#FFFFFF] w-full">
          {selectedFilter === "sort" && (
            <SortComponent
              setSelectedFilter={setSelectedFilter}
              sortOption={filterOptions[FilterName.Sort]}
              setSortOption={(option) => handleFilterChange(FilterName.Sort, option)}
            />
          )}
          {selectedFilter === "filter" && (
            <FilterComponent
              setSelectedFilter={setSelectedFilter}
              setFilterCount={setAppliedFilter}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              urlType={type}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default CollectionComponent;