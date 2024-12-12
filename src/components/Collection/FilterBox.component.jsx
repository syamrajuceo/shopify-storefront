import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

function FilterBoxComponent({ header = "Gender", options = [] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const displayedOptions = options.filter(option =>
        option.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                {displayedOptions.slice(0, 5).map((option, index) => (
                    <div className="flex gap-2 pb-3" key={index}>
                        <input type="checkbox" id={option} className="w-5 h-5"/>
                        <label htmlFor={option}>{option}</label>
                    </div>
                ))}
            </div>
        </>
    );
}

export default FilterBoxComponent;
