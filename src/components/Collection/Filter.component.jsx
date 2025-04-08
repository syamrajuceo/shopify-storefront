import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { 
  categoryOptions, 
  ColorDataOptions, 
  EyeDataBrands, 
  filterDataOptions, 
  FilterName, 
  genderDataOptions, 
  PriceDataHelper, 
  PriceDataRangeMap, 
  PriceRangeList, 
  productDataStatus 
} from "../../data/Collection.data";

function FilterComponent({
  setSelectedFilter,
  setFilterCount,
  priceRange,
  setPriceRange,
  filterOptions,
  onFilterChange,
  urlType
}) {
  const [type, setType] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({
    Price: [],
    ...filterDataOptions
  });

  const showCategoryFilter = !["Eyeglasses", "ContactLenses", "Sunglasses"].includes(urlType);

  const filters = {
    Price: PriceRangeList,
    ...(showCategoryFilter && { [FilterName.Category]: categoryOptions }),
    [FilterName.Brand]: EyeDataBrands,
    [FilterName.Color]: ColorDataOptions,
    [FilterName.Status]: productDataStatus,
    ...(!["Men", "Women"].includes(urlType) && { [FilterName.Gender]: genderDataOptions }),
  };

  const handleFilterChange = (filterType, option) => {
    setSelectedOptions(prev => {
      const newOptions = { ...prev };
      
      if (filterType === "Price") {
        newOptions[filterType] = [option];
        setPriceRange(PriceDataRangeMap[option]);
      } else {
        const currentOptions = newOptions[filterType] || [];
        newOptions[filterType] = currentOptions.includes(option)
          ? currentOptions.filter(item => item !== option)
          : [...currentOptions, option];
      }

      // Update parent component
      onFilterChange(filterType, newOptions[filterType]);

      // Update filter count
      const activeCount = Object.values(newOptions).reduce(
        (count, options) => count + options.length, 
        0
      );
      setFilterCount(activeCount);

      return newOptions;
    });
  };

  useEffect(() => {
    const priceData = PriceDataHelper(priceRange); 
    setSelectedOptions({
      Price: [priceData.key], 
      [FilterName.Category]: filterOptions[FilterName.Category] || [],
      [FilterName.Brand]: filterOptions[FilterName.Brand] || [],
      [FilterName.Color]: filterOptions[FilterName.Color] || [],
      [FilterName.Gender]: filterOptions[FilterName.Gender] || [],
      [FilterName.Status]: filterOptions[FilterName.Status] || [],
    });
  }, [priceRange, filterOptions]);

  return (
    <div className="border-r-1 bg-[#CFCFCF] rounded shadow-lg w-full lg:w-1/3">
      <div className="flex items-center justify-between p-4 text-xl border-b">
        <div className="flex items-center gap-2">
          <FaFilter />
          <span>Filter by</span>
        </div>
        <AiOutlineClose
          className="cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={() => setSelectedFilter(null)}
        />
      </div>
      <div className="flex bg-[#F3F4F6] h-[70vh]">
        {/* Filter Types */}
        <div className="w-1/3 border-r">
          {Object.keys(filters).map((filter) => (
            <button
              key={filter}
              onClick={() => setType(filter)}
              className={`w-full h-[48px] pl-2 text-left rounded ${
                type === filter
                  ? "bg-[#E2E3E7] text-[#424242]"
                  : "hover:bg-[#E2E3E7]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Filter Options */}
        <div className="w-2/3 bg-[#FFFFFF] overflow-y-auto">
          {type ? (
            <div className="space-y-2 px-2 bg-[#DFDFDF7D]">
              {filters[type].map((option, index) => (
                <label
                  key={index}
                  className="flex items-center gap-2 h-[56px] border-b-2"
                >
                  <input
                    type={type === "Price" ? "radio" : "checkbox"}
                    className="accent-blue-600 h-5 w-5"
                    name={type}
                    checked={
                      type === "Price"
                        ? selectedOptions.Price.includes(option)
                        : selectedOptions[type]?.includes(option)
                    }
                    onChange={() => handleFilterChange(type, option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 px-2">
              Select a filter type to view options.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;