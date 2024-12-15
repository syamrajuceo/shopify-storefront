import { IoMdArrowDropdown } from "react-icons/io";
import { useState, useEffect } from "react";

function FilterBoxComponent({ header = "Gender", options = [], filterOptions, onFilterChange }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(new Set());
    const [showMore, setShowMore] = useState(false);  // State to toggle "See More"

    const displayedOptions = options.filter(option =>
        option.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCheckboxChange = (option) => {
        setSelectedOptions(prevSelectedOptions => {
            const newSelectedOptions = new Set(prevSelectedOptions);
            if (newSelectedOptions.has(option)) {
                newSelectedOptions.delete(option);
            } else {
                newSelectedOptions.add(option);
            }
            return newSelectedOptions;
        });
    };

    useEffect(() => {
        if (filterOptions && filterOptions[header]) {
            setSelectedOptions(new Set(filterOptions[header]));
        }
    }, [filterOptions, header]); // Dependency on filterOptions and header
    
    useEffect(() => {
        onFilterChange(header, Array.from(selectedOptions));
    }, [selectedOptions, header]); 

    return (
        <>
            <div className="flex justify-between text-lg font-semibold border-t-2 p-2 m-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <h1>
                    {header} <span className="font-light text-sm">({options.length})</span>
                </h1>
                <span>
                    <IoMdArrowDropdown />
                </span>
            </div>
            <div className={`${isOpen ? "block" : "hidden"} ml-2`}>
                {options.length >= 5 && (
                    <div className="mb-2">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border p-1 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                )}
                {displayedOptions.slice(0, showMore ? displayedOptions.length : 5).map((option, index) => (
                    <div className="flex gap-2 pb-3" key={index}>
                        <input
                            type="checkbox"
                            id={option}
                            className="w-5 h-5"
                            checked={selectedOptions.has(option)}
                            onChange={() => handleCheckboxChange(option)}
                        />
                        <label htmlFor={option}>{option}</label>
                    </div>
                ))}
                {displayedOptions.length > 5 && !showMore && (
                    <div className="text-blue-600 cursor-pointer" onClick={() => setShowMore(true)}>
                        See More
                    </div>
                )}
                {showMore && displayedOptions.length > 5 && (
                    <div className="text-blue-600 cursor-pointer" onClick={() => setShowMore(false)}>
                        See Less
                    </div>
                )}
            </div>
        </>
    );
}

export default FilterBoxComponent;
