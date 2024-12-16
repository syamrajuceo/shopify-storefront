import { useState } from "react";
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
    const categories = [
        "Prescription Glasses",
        "Sunglasses",
        "Reading Glasses",
        "Sports Glasses",
        "Kids' Glasses",
    ];
    const brands = ["Ray-Ban", "Oakley", "Titan", "Vogue", "Fastrack"];
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

            if (filterType === "Price") {
                // Exclusive selection for Price
                newSelectedOptions[filterType] = [option];
                const priceMap = {
                    "Below 2000": { min: 0, max: 2000 },
                    "2000 - 3000": { min: 2000, max: 3000 },
                    "3000 - 6000": { min: 3000, max: 6000 },
                    "6000 - 10000": { min: 6000, max: 10000 },
                    "10000 - 15000": { min: 10000, max: 15000 },
                };
                setPriceRange(priceMap[option]);
            } else {
                const currentOptions = newSelectedOptions[filterType] || [];
                if (currentOptions.includes(option)) {
                    newSelectedOptions[filterType] = currentOptions.filter(
                        (item) => item !== option
                    );
                } else {
                    newSelectedOptions[filterType] = [...currentOptions, option];
                }
            }

            if (filterType === "Color") {
                onFilterChange("Frame Color", newSelectedOptions.Color || []);
            }

            // Update the filter count
            SetFilterCount(
                Object.values(newSelectedOptions).reduce(
                    (acc, options) => acc + options.length,
                    0
                )
            );

            return newSelectedOptions;
        });
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
                    {Object.keys(filters).map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setType(filter)}
                            className={`w-full text-left py-2 px-3 rounded ${
                                type === filter
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-200"
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Filter Options */}
                <div className="w-2/3">
                    {type ? (
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">{type} Options</h3>
                            {filters[type].map((option, index) => (
                                <label
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type={
                                            type === "Price" ? "radio" : "checkbox"
                                        }
                                        className="accent-blue-600 h-5 w-5"
                                        name={type}
                                        checked={
                                            type === "Price"
                                                ? selectedOptions.Price.includes(option)
                                                : selectedOptions[type]?.includes(option)
                                        }
                                        onChange={() =>
                                            handleFilterChange(type, option)
                                        }
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            Select a filter type to view options.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FilterComponent;
