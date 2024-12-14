import { BiSortAlt2 } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

function SortComponent({ SetSelectedFilter, onSortChange, selectedSort }) {
    const sortOptions = [
        { value: "recommended", label: "Recommended (Default)" },
        { value: "bestseller", label: "Bestseller" },
        { value: "new_arrivals", label: "New Arrivals" },
        { value: "price_low_high", label: "Price: Low to High" },
        { value: "price_high_low", label: "Price: High to Low" },
    ];

    return (
        <div className="bg-white rounded shadow-lg w-full lg:w-1/3">
            <div className="flex items-center justify-between p-4 text-xl border-b">
                <div className="flex items-center gap-2">
                    <BiSortAlt2 />
                    <span>Sort by</span>
                </div>
                <AiOutlineClose 
                    className="cursor-pointer text-gray-600 hover:text-gray-800" 
                    onClick={() => SetSelectedFilter(null)} 
                />
            </div>
            <div className="p-4 space-y-3">
                {sortOptions.map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="sortOption"
                            value={option.value}
                            checked={selectedSort === option.value}
                            onChange={() => onSortChange(option.value)}
                            className="accent-blue-600"
                        />
                        <span className="text-gray-700">{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default SortComponent;
