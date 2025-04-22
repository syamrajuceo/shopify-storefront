import React, { useState } from "react";
import { SlidersHorizontal, SortAsc, X, Search, Check } from "lucide-react";
import {
  ColorDataOptions,
  EyeDataBrands,
  genderDataOptions,
  PriceRangeList,
  productDataStatus,
} from "../../data/Collection.data";
import { useParams } from "react-router-dom";

export const MobileFilter = ({
  filters,
  onFilterChange,
  onResetFilters,
  onApplyFilters,
}) => {
  const { type } = useParams();
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState("recommended");
  const [selectedCategory, setSelectedCategory] = useState("Price");
  const [brandSearch, setBrandSearch] = useState("");

  // Determine which categories to show based on URL params
  const shouldShowCategory = !["ContactLenses", "Sunglasses", "Eyeglasses"].includes(type);
  const shouldShowGender = !["male", "female", "unisex"].includes(type);
  const shouldShowBrands = !["brand"].includes(type);

  // Filter categories based on conditions
  const filterCategories = [
    "Price",
    shouldShowGender && "Gender",
    shouldShowBrands && "Brand",
    "Color",
    "Status",
    shouldShowCategory && "Category",
  ].filter(Boolean); // Remove falsy values

  const filteredBrands = EyeDataBrands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const handleToggleArrayFilter = (key, value) => {
    const isSelected = filters[key]?.includes(value);
    const updated = isSelected
      ? filters[key].filter((v) => v !== value)
      : [...(filters[key] || []), value];

    onFilterChange(key, updated);
  };

  const countAppliedFilters = () => {
    if (!filters) return 0;
    return Object.values(filters).filter(
      (v) =>
        v !== null &&
        v !== undefined &&
        (Array.isArray(v) ? v.length > 0 : true)
    ).length;
  };

  const renderFilterOptions = () => {
    switch (selectedCategory) {
      case "Price":
        return PriceRangeList.map((priceRange) => (
          <label
            key={priceRange}
            className="flex items-center space-x-3 p-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={filters.priceRanges?.includes(priceRange)}
              onChange={() =>
                handleToggleArrayFilter("priceRanges", priceRange)
              }
              className="w-4 h-4 text-blue-600"
            />
            <span>{priceRange}</span>
          </label>
        ));

      case "Gender":
        return genderDataOptions.map((gender) => (
          <label
            key={gender}
            className="flex items-center space-x-3 p-2 cursor-pointer"
          >
            <input
              type="radio"
              name="gender"
              checked={filters.gender === gender}
              onChange={() => onFilterChange("gender", gender)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="capitalize">{gender}</span>
          </label>
        ));

      case "Brand":
        return (
          <>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search brands"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            {filteredBrands.map((brand) => (
              <label
                key={brand}
                className="flex items-center space-x-3 p-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="brand"
                  checked={filters.brand === brand}
                  onChange={() => onFilterChange("brand", brand)}
                  className="w-4 h-4 text-blue-600"
                />
                <span>{brand}</span>
              </label>
            ))}
          </>
        );

      case "Color":
        return ColorDataOptions.map((color) => (
          <label
            key={color}
            className="flex items-center space-x-3 p-2 cursor-pointer"
          >
            <input
              type="radio"
              name="color"
              checked={filters.color === color}
              onChange={() => onFilterChange("color", color)}
              className="w-4 h-4 text-blue-600"
            />
            <span>{color}</span>
          </label>
        ));

      case "Status":
        return productDataStatus.map((status) => (
          <label
            key={status}
            className="flex items-center space-x-3 p-2 cursor-pointer"
          >
            <input
              type="radio"
              name="status"
              checked={filters.status === status}
              onChange={() => onFilterChange("status", status)}
              className="w-4 h-4 text-blue-600"
            />
            <span>{status}</span>
          </label>
        ));

      case "Category":
        // Add your category filter options here if needed
        return (
          <div className="p-4">
            <p>Category filter options would go here</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-2 gap-4 text-center">
          <button
            onClick={() => setShowSortModal(true)}
            className="flex flex-col items-center"
          >
            <SortAsc className="w-5 h-5 mb-1" />
            <span className="text-sm font-medium">Sort</span>
            <span className="text-xs text-gray-400">
              {
                {
                  recommended: "Recommended",
                  bestseller: "Bestseller",
                  new: "New Arrivals",
                  "price-low-high": "Price: Low to High",
                  "price-high-low": "Price: High to Low",
                }[selectedSort]
              }
            </span>
          </button>

          <button
            onClick={() => setShowFilterModal(true)}
            className="flex flex-col items-center"
          >
            <SlidersHorizontal className="w-5 h-5 mb-1" />
            <span className="text-sm font-medium">Filter</span>
            <span className="text-xs text-gray-400">
              {countAppliedFilters()} Applied
            </span>
          </button>
        </div>
      </div>

      {/* Sort Modal */}
      {showSortModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl">
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-lg font-semibold">Sort by</h2>
              <button onClick={() => setShowSortModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {[
                { id: "recommended", label: "Recommended (Default)" },
                { id: "bestseller", label: "Bestseller" },
                { id: "new", label: "New Arrivals" },
                { id: "price-low-high", label: "Price: Low to High" },
                { id: "price-high-low", label: "Price: High to Low" },
              ].map((option) => (
                <label
                  key={option.id}
                  className="flex items-center space-x-3 p-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="sort"
                    checked={selectedSort === option.id}
                    onChange={() => {
                      setSelectedSort(option.id);
                      setShowSortModal(false);
                    }}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Filter
              </h2>
              <button onClick={() => setShowFilterModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex h-[calc(90vh-64px)]">
              <div className="w-1/3 border-r">
                {filterCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 text-sm ${
                      selectedCategory === category
                        ? "bg-gray-100 font-semibold"
                        : ""
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="w-2/3 overflow-y-auto p-4">
                {renderFilterOptions()}
              </div>
            </div>

            <div className="flex gap-4 p-4 border-t sticky bottom-0 bg-white">
              <button
                onClick={() => {
                  onResetFilters();
                }}
                className="flex-1 px-4 py-2 border rounded-lg text-gray-700"
              >
                Clear All
              </button>
              <button
                onClick={() => {
                  setShowFilterModal(false);
                  onApplyFilters?.();
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};