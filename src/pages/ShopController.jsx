import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import CollectionComponent from "../components/Collection/Collection.component";
import ScrollToTop from "../utils/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/shop/Sidebar";
import {
  fetchProducts,
  resetFilters,
  updateFilters,
} from "../redux/slices/productSlice";
import { MobileFilter } from "../components/shop/MobileFilter";
import { PriceDataRangeMap } from "../data/Collection.data";
import Breadcrumb from "../components/shop/Breadcrumb";

function ShopController() {
  const { type = "ALL" } = useParams();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { products, status, pagination, filters } = useSelector((state) => state.products);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const loaderRef = useRef(null);

  // Handle scroll to load more products
  const handleObserver = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && status !== "loading" && status !== "loadingMore" && pagination.hasNextPage) {
      dispatch(fetchProducts({ filters, loadMore: true }));
    }
  }, [dispatch, filters, status, pagination.hasNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    // Reset filters when type changes
    dispatch(resetFilters());
    setIsInitialLoad(true);
  }, [type, dispatch]);

  useEffect(() => {
    // Extract query params
    const getQueryParam = (key) => {
      const params = new URLSearchParams(search);
      return params.get(key);
    };

    // Set filters based on route
    const newFilters = {};
    
    switch (type.toLowerCase()) {
      case "contact-lenses":
        newFilters.category = "contact lenses";
        break;
      case "sunglasses":
        newFilters.category = "sunglasses";
        break;
      case "eyeglasses":
        newFilters.category = "eyeglasses";
        break;
      case "clip-on":
        newFilters.category = "clip-on";
        break;
      case "safety-glass":
        newFilters.category = "safety glasses";
        break;
      case "reading-glass":
        newFilters.category = "reading-glass";
        break;
      case "gender": {
        const gender = getQueryParam("query")?.toLowerCase() || "unisex";
        if (["male", "female", "kids", "unisex"].includes(gender)) {
          newFilters.gender = gender;
        }
        break;
      }
      case "brand": {
        const brand = getQueryParam("query");
        if (brand) {
          newFilters.brand = brand.replace(/-/g, " ");
        }
        break;
      }
      case "shape": {
        const shape = getQueryParam("query");
        if (shape) {
          newFilters.shape = shape.replace(/-/g, " ");
        }
        break;
      }
      default:
        break;
    }

    // Apply shape from query params if exists
    const shapeParam = getQueryParam("shape");
    if (shapeParam) {
      newFilters.shape = shapeParam.replace(/-/g, " ");
    }

    dispatch(updateFilters(newFilters));
    setIsInitialLoad(false);
  }, [type, search, dispatch]);

  useEffect(() => {
    if (isInitialLoad) return;

    // Convert price ranges to min/max prices for API call
    let minPrice = filters.minPrice !== null ? filters.minPrice : 0;
    let maxPrice = filters.maxPrice !== null ? filters.maxPrice : 6000;

    if (filters.priceRanges?.length > 0) {
      const rangeValues = filters.priceRanges.map(
        (range) => PriceDataRangeMap[range]
      );
      minPrice = Math.min(...rangeValues.map((r) => r.min));
      maxPrice = Math.max(...rangeValues.map((r) => r.max));
    }

    const fetchParams = {
      ...filters,
      minPrice,
      maxPrice,
      available:
        filters.status === "Available"
          ? true
          : filters.status === "Out of Stock"
          ? false
          : null,
    };

    // Clean up undefined/null values
    Object.keys(fetchParams).forEach(
      (key) => fetchParams[key] === null && delete fetchParams[key]
    );

    dispatch(fetchProducts({ filters: fetchParams, loadMore: false }));
  }, [dispatch, filters, isInitialLoad]);
  ScrollToTop();

  const handleFilterChange = (filterType, value) => {
    dispatch(updateFilters({ [filterType]: value }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const applyPriceFilter = (minPrice, maxPrice) => {
    dispatch(updateFilters({ minPrice, maxPrice, priceRanges: [] }));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar - Hidden on mobile unless filter menu is open */}
      <div className="hidden lg:block w-full lg:w-1/4 xl:w-1/5 p-6 bg-white border-r">
        <Sidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          onApplyPriceFilter={applyPriceFilter}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-6">
        {/* Results Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <Breadcrumb type={type} />
            <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0 capitalize">
              {(() => {
                const queryParams = new URLSearchParams(window.location.search);
                const query = queryParams.get("query");

                switch (type.toLowerCase()) {
                  case "gender":
                    switch (query) {
                      case "male":
                        return "men";
                      case "female":
                        return "Women";
                      case "unisex":
                        return "Unisex";
                      default:
                        return "Gender";
                    }
                  case "brand":
                    return query ? query.replace(/-/g, " ") : "Brand";
                  case "shape":
                    return query ? query.replace(/-/g, " ") : "Shape";
                  case "all":
                    return "All Products";
                  case "contact-lenses":
                    return "Contact Lenses";
                  default:
                    return type.replace(/-/g, " ").trim();
                }
              })()}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {products?.length || 0} products
              {pagination.hasNextPage && "+"}
            </span>
          </div>
        </div>

        {/* Product Grid */}
        <CollectionComponent
          products={products || []}
          loading={status === "loading"}
          loadingMore={status === "loadingMore"}
        />

        {/* Infinite scroll loader */}
        <div ref={loaderRef} className="w-full h-10 flex justify-center items-center">
          {status === "loadingMore" && (
            <div className="text-gray-500">Loading more products...</div>
          )}
          {!pagination.hasNextPage && products.length > 0 && (
            <div className="text-gray-500 py-4">No more products to load</div>
          )}
        </div>
      </main>

      {/* Mobile Filter Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 shadow-lg">
        <MobileFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      </div>
    </div>
  );
}

export default ShopController;