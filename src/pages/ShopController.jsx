import { useEffect } from "react";
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
  const { products, status, filters } = useSelector((state) => state.products);

  useEffect(() => {
    // Reset filters when type changes
    dispatch(
      updateFilters({
        category: null,
        gender: null,
        shape: null,
        priceRanges: [],
        brand: null,
        color: null,
        status: null,
      })
    );

    // Extract shape from query params if exists
    const shapeParam = getQueryParam("shape");
    if (shapeParam) {
      dispatch(updateFilters({ shape: shapeParam }));
    }

    // Extract brand from query params if exists
    // const brandParam = getQueryParam("brand");
    // console.log("brandParam :" ,brandParam)
    // if (brandParam) {
    //   dispatch(updateFilters({ brand: brandParam }));
    // }

    // Set filters based on route
    switch (type) {
      case "contact-lenses":
        dispatch(updateFilters({ category: "contact-lenses" }));
        break;
      case "sunglasses":
        dispatch(updateFilters({ category: "Sunglasses" }));
        break;
      case "eyeglasses":
        dispatch(updateFilters({ category: "Eyeglasses" }));
        break;
      case "clip-On":
        dispatch(updateFilters({ category: "clip-On" }));
        break;
      case "safety-glass":
        dispatch(updateFilters({ category: "safety-glass" }));
        break;
      case "reading-glass":
        dispatch(updateFilters({ category: "reading-glass" }));
        break;
      case "gender": {
        const gender = getQueryParam("query")?.toLowerCase() || "unisex";
        if (["male", "female", "kids", "unisex"].includes(gender)) {
          dispatch(updateFilters({ gender }));
        }
        break;
      }
      case "brand": {
        const brand = getQueryParam("query");

        if (brand) {
          dispatch(updateFilters({ brand }));
        }
        break;
      }
      case "shape": {
        const shape = getQueryParam("query");

        if (shape) {
          dispatch(updateFilters({ shape }));
        }
        break;
      }

      default:
        break;
    }
  }, [type, search, dispatch]);

  useEffect(() => {
    // Convert price ranges to min/max prices for API call
    let minPrice = filters.minPrice || 0;
    let maxPrice = filters.maxPrice || 6000;

    if (filters.priceRanges?.length > 0) {
      const rangeValues = filters.priceRanges.map(
        (range) => PriceDataRangeMap[range]
      );
      minPrice = Math.min(...rangeValues.map((r) => r.min));
      maxPrice = Math.max(...rangeValues.map((r) => r.max));
    }

    dispatch(
      fetchProducts({
        ...filters,
        minPrice,
        maxPrice,
        available:
          filters.status === "Available"
            ? true
            : filters.status === "Out of Stock"
            ? false
            : null,
      })
    );
  }, [dispatch, filters]);

  ScrollToTop();

  const getQueryParam = (key) => {
    const params = new URLSearchParams(search);
    return params.get(key);
  };

  const handleFilterChange = (filterType, value) => {
    dispatch(updateFilters({ [filterType]: value }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    dispatch(fetchProducts({}));
  };

  const applyPriceFilter = (minPrice, maxPrice) => {
    dispatch(updateFilters({ minPrice, maxPrice }));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar - Hidden on mobile unless filter menu is open */}
      <div className="hidden lg:block w-full lg:w-1/4 xl:w-1/5 p-6 bg-white border-r">
        <Sidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          onApplyFilters={() => dispatch(fetchProducts(filters))}
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

                switch (type) {
                  case "gender":
                    switch (query) {
                      case "male":
                        return "Men";
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
                  case "ALL":
                    return "All Products";
                  case "ContactLenses":
                    return "Contact Lenses"; // Added this case
                  default:
                    // Add space before capital letters for camelCase types
                    return type.replace(/([A-Z])/g, " $1").trim();
                }
              })()}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {products?.length || 0} products
            </span>
          </div>
        </div>

        {/* Product Grid */}
        <CollectionComponent
          products={products || []}
          loading={status === "loading"}
        />

        {/* Pagination */}
        {products?.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex space-x-2">
              <button className="px-3 py-1 border rounded-md">Previous</button>
              <button className="px-3 py-1 border rounded-md bg-blue-600 text-white">
                1
              </button>
              <button className="px-3 py-1 border rounded-md">2</button>
              <button className="px-3 py-1 border rounded-md">Next</button>
            </nav>
          </div>
        )}
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
