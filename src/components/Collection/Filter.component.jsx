import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";

function FilterComponent({
    SetSelectedFilter,
    SetFilterCount,
    priceRange,
    setPriceRange,
    filterOptions,
    onFilterChange,
}) {
    const [type, setType] = useState("");
    const [selectedOptions, setSelectedOptions] = useState({
        Price: [],
        Category: [],
        Brand: [],
        Color: [],
        Status: [],
    });

    const pricelist = [
        "Below 2000",
        "2000 - 3000",
        "3000 - 6000",
        "6000 - 10000",
        "10000 - 15000",
    ];
    const categories = ["Electronics", "Fashion", "Home Appliances", "Books", "Toys"];
    const brands = ["Apple", "Samsung", "Sony", "LG", "Nike"];
    const colors = ["pink", "black", "gray", "blue"];
    const statusOptions = ["Available", "Out of Stock", "Coming Soon"];

    const filters = {
        Price: pricelist,
        Category: categories,
        Brand: brands,
        Color: colors,
        Status: statusOptions,
    };

    const handleFilterChange = (filterType, option) => {
        setSelectedOptions((prev) => {
            const newSelectedOptions = { ...prev };
            const currentOptions = newSelectedOptions[filterType] || [];

            if (currentOptions.includes(option)) {
                newSelectedOptions[filterType] = currentOptions.filter((item) => item !== option);
            } else {
                newSelectedOptions[filterType] = [...currentOptions, option];
            }

            // Handle Price Range selection
            if (filterType === "Price") {
                let priceRange = {};
                switch (option) {
                    case "Below 2000":
                        priceRange = { min: 0, max: 2000 };
                        break;
                    case "2000 - 3000":
                        priceRange = { min: 2000, max: 3000 };
                        break;
                    case "3000 - 6000":
                        priceRange = { min: 3000, max: 6000 };
                        break;
                    case "6000 - 10000":
                        priceRange = { min: 6000, max: 10000 };
                        break;
                    case "10000 - 15000":
                        priceRange = { min: 10000, max: 15000 };
                        break;
                    default:
                        priceRange = { min: 0, max: 2000 };
                        break;
                }
                setPriceRange(priceRange);
            }

            // Handle Color filter change
            if (filterType === "Color") {
                onFilterChange("Frame Color", newSelectedOptions["Color"] || []);
            }

            // Return the updated selected options
            return newSelectedOptions;
        });

        // Update Filter Count
        SetFilterCount(Object.values(selectedOptions).reduce((acc, options) => acc + options.length, 0));
    };

    return (
        <div className="bg-white rounded shadow-lg w-full lg:w-1/3">
            <div className="flex items-center justify-between p-4 text-xl border-b">
                <div className="flex items-center gap-2">
                    <FaFilter />
                    <span>Filter by</span>
                </div>
                <AiOutlineClose
                    className="cursor-pointer text-gray-600 hover:text-gray-800"
                    onClick={() => SetSelectedFilter(null)}
                />
            </div>
            <div className="p-4 flex space-x-4">
                {/* Filter Types */}
                <div className="w-1/3 border-r pr-4">
                    {["Price", "Category", "Brand", "Color", "Status"].map((head) => (
                        <button
                            key={head}
                            onClick={() => setType(head)}
                            className={`w-full text-left py-2 px-3 rounded ${type === head ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                                }`}
                        >
                            {head}
                        </button>
                    ))}
                </div>

                {/* Filter Options */}
                <div className="w-2/3">
                    {type ? (
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">{type} Options</h3>
                            {filters[type]?.map((option, index) => (
                                <label key={index} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="accent-blue-600 h-5 w-5"
                                        checked={
                                            type === "Color"
                                                ? filterOptions["Frame Color"]?.includes(option) 
                                                : selectedOptions[type]?.includes(option) 
                                        }
                                        onChange={() => handleFilterChange(type, option)}
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Select a filter type to view options.</p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default FilterComponent;
