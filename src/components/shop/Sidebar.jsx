import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Search, X, Check } from "lucide-react";
import {
  ColorDataOptions,
  EyeDataBrands,
  genderDataOptions,
  PriceRangeList,
  productDataStatus,
} from "../../data/Collection.data";

const Sidebar = ({
  filters,
  onFilterChange,
  onResetFilters,
  onApplyPriceFilter,
}) => {
  const { type = "" } = useParams();
  const [brandSearch, setBrandSearch] = useState("");
  const [priceInputs, setPriceInputs] = useState({
    minPrice: filters.minPrice || 0,
    maxPrice: filters.maxPrice || 6000,
  });

  // Update price inputs when filters change
  useEffect(() => {
    setPriceInputs({
      minPrice: filters.minPrice || 0,
      maxPrice: filters.maxPrice || 6000,
    });
  }, [filters.minPrice, filters.maxPrice]);

  const showCategory = ![
    "contact lenses",
    "sunglasses",
    "eyeglasses",
    "clip-on",
    "safety-glass",
    "reading-glass",
  ].includes(type.toLowerCase());

  const showGender = type.toLowerCase() !== "gender";
  const showBrands = type.toLowerCase() !== "brand";
  const isSunglasses = type.toLowerCase() === "sunglasses";

  const filteredBrands = EyeDataBrands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const handlePriceInputChange = (type, value) => {
    const numValue = Number(value);
    if (isNaN(numValue)) return;

    setPriceInputs((prev) => ({
      ...prev,
      [type]: numValue,
    }));
  };

  const applyPriceFilter = () => {
    onApplyPriceFilter(
      Math.min(priceInputs.minPrice, priceInputs.maxPrice),
      Math.max(priceInputs.minPrice, priceInputs.maxPrice)
    );
  };

  return (
    <div className="hidden lg:block w-64 flex-shrink-0 px-10 py-5">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Filters</h2>
          <button
            onClick={onResetFilters}
            className="text-sm text-blue-600 flex items-center gap-1"
          >
            <X size={14} /> Reset all
          </button>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="font-medium mb-4">Price</h3>
          <div className="flex gap-4 items-center mb-2">
            <input
              type="number"
              min="0"
              value={priceInputs.minPrice}
              onChange={(e) =>
                handlePriceInputChange("minPrice", e.target.value)
              }
              className="w-20 px-2 py-1 border rounded"
              placeholder="Min"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              min="0"
              value={priceInputs.maxPrice}
              onChange={(e) =>
                handlePriceInputChange("maxPrice", e.target.value)
              }
              className="w-20 px-2 py-1 border rounded"
              placeholder="Max"
            />
          </div>
          <button
            onClick={applyPriceFilter}
            className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Check size={16} className="mr-2" />
            Apply Price
          </button>
        </div>

        {/* Category Filter - Conditionally shown */}
        {showCategory && (
          <div>
            <h3 className="font-medium mb-4">Category</h3>
            <div className="space-y-2">
              {[
                "Contact Lenses",
                "Sunglasses",
                "Eyeglasses",
                "Clip-On",
                "Safety Glass",
                "Reading Glass",
              ].map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="category"
                    checked={
                      filters.category?.toLowerCase() === category.toLowerCase()
                    }
                    onChange={() => {
                      onFilterChange("category", category.toLowerCase());
                    }}
                    className="rounded"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Gender Filter - Conditionally shown */}
        {showGender && (
          <div>
            <h3 className="font-medium mb-4">Gender</h3>
            <div className="space-y-2">
              {genderDataOptions.map((gender) => (
                <label key={gender} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    checked={filters.gender === gender}
                    onChange={() => {
                      onFilterChange("gender", gender);
                    }}
                    className="rounded"
                  />
                  <span className="capitalize">{gender}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Brands Filter - Conditionally shown */}
        {showBrands && (
          <div>
            <h3 className="font-medium mb-4">Brands</h3>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search brands"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border rounded-md"
              />
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredBrands.map((brand) => (
                <label key={brand} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="brand"
                    checked={filters.brand === brand}
                    onChange={() => {
                      onFilterChange("brand", brand);
                    }}
                    className="rounded"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Conditional Color Filter */}
        {isSunglasses ? (
          /* Lens Color Filter for Sunglasses */
          <div>
            <h3 className="font-medium mb-4">Lens Color</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {ColorDataOptions.map((color) => (
                <label key={color} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="lensColor"
                    checked={filters.lensColor === color}
                    onChange={() => {
                      onFilterChange("lensColor", color);
                    }}
                    className="rounded"
                  />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>
        ) : (
          /* Regular Color Filter for other types */
          <div>
            <h3 className="font-medium mb-4">Color</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {ColorDataOptions.map((color) => (
                <label key={color} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="color"
                    checked={filters.color === color}
                    onChange={() => {
                      onFilterChange("color", color);
                    }}
                    className="rounded"
                  />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Status Filter */}
        <div>
          <h3 className="font-medium mb-4">Status</h3>
          <div className="space-y-2">
            {productDataStatus.map((status) => (
              <label key={status} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="status"
                  checked={filters.status === status}
                  onChange={() => {
                    onFilterChange("status", status);
                  }}
                  className="rounded"
                />
                <span>{status}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
