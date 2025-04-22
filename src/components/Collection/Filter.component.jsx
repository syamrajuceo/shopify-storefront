// import { useEffect, useState } from "react";
// import { AiOutlineClose } from "react-icons/ai";
// import { FaFilter } from "react-icons/fa";
// import {
//   categoryOptions,
//   ColorDataOptions,
//   EyeDataBrands,
//   filterDataOptions,
//   FilterName,
//   genderDataOptions,
//   PriceDataHelper,
//   PriceDataRangeMap,
//   PriceRangeList,
//   productDataStatus,
// } from "../../data/Collection.data";

// function FilterComponent({
//   SetSelectedFilter,
//   SetFilterCount,
//   priceRange,
//   setPriceRange,
//   filterOptions,
//   onFilterChange,
//   UrlType,
// }) {
//   const [type, setType] = useState("");
//   const [selectedOptions, setSelectedOptions] = useState({
//     Price: [],
//     ...filterDataOptions,
//   });

//   const pricelist = PriceRangeList;
//   const brands = EyeDataBrands;
//   const colors = ColorDataOptions;
//   const statusOptions = productDataStatus;

//   const filters = {
//     Price: pricelist,
//     ...(!["contactLenses", "sunGlasses", "eyeGlasses"].includes(UrlType) && {
//       [FilterName.Category]: categoryOptions,
//     }),
//     [FilterName.Brand]: brands,
//     [FilterName.Color]: colors,
//     [FilterName.Status]: statusOptions,
//     ...(!["gender"].includes(UrlType) && {
//       [FilterName.Gender]: genderDataOptions,
//     }),
//   };

//   const handleFilterChange = (filterType, option) => {
//     setSelectedOptions((prev) => {
//       let newSelectedOptions = { ...prev };

//       if (filterType === "Price") {
//         // Exclusive selection for Price
//         newSelectedOptions[filterType] = [option];
//         setPriceRange(PriceDataRangeMap[option]);
//       } else {
//         const currentOptions = newSelectedOptions[filterType] || [];
//         if (currentOptions.includes(option)) {
//           newSelectedOptions[filterType] = currentOptions.filter(
//             (item) => item !== option
//           );
//         } else {
//           newSelectedOptions[filterType] = [...currentOptions, option];
//         }
//       }

//       if (filterType === FilterName.Color) {
//         onFilterChange(
//           FilterName.Color,
//           newSelectedOptions[FilterName.Color] || []
//         );
//       }
//       if (filterType === FilterName.Category) {
//         onFilterChange(
//           FilterName.Category,
//           newSelectedOptions[FilterName.Category] || []
//         );
//       }
//       if (filterType === FilterName.Brand) {
//         onFilterChange(
//           FilterName.Brand,
//           newSelectedOptions[FilterName.Brand] || []
//         );
//       }
//       if (filterType === FilterName.Gender) {
//         onFilterChange(
//           FilterName.Gender,
//           newSelectedOptions[FilterName.Gender] || []
//         );
//       }
//       if (filterType === FilterName.Status) {
//         onFilterChange(
//           FilterName.Status,
//           newSelectedOptions[FilterName.Status] || []
//         );
//       }
//       // Update the filter count
//       SetFilterCount(
//         Object.values(newSelectedOptions).reduce(
//           (acc, options) => acc + options.length,
//           0
//         )
//       );

//       return newSelectedOptions;
//     });
//   };

//   useEffect(() => {
//     const priceData = PriceDataHelper(priceRange);

//     if (priceData.default) {
//       setPriceRange(priceData.option);
//     }

//     setSelectedOptions({
//       Price: [priceData.key],
//       [FilterName.Category]: filterOptions[FilterName.Category] || [],
//       [FilterName.Brand]: filterOptions[FilterName.Brand] || [],
//       [FilterName.Color]: filterOptions[FilterName.Color] || [],
//       [FilterName.Status]: filterOptions[FilterName.Status] || [],
//     });
//   }, []);

//   return (
//     <div className="border-r-1 bg-[#CFCFCF] rounded shadow-lg w-full  lg:w-1/3">
//       <div className="flex items-center justify-between p-4 text-xl border-b">
//         <div className="flex items-center gap-2">
//           <FaFilter />
//           <span>Filter by</span>
//         </div>
//         <AiOutlineClose
//           className="cursor-pointer text-gray-600 hover:text-gray-800"
//           onClick={() => SetSelectedFilter(null)}
//         />
//       </div>
//       <div className="flex  bg-[#F3F4F6] h-[70vh]">
//         {/* Filter Types */}
//         <div className="w-1/3 border-r">
//           {Object.keys(filters).map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setType(filter)}
//               className={`w-full h-[48px] pl-2 text-left rounded ${
//                 type === filter
//                   ? "bg-[#E2E3E7] text-[#424242]"
//                   : "hover:bg-[#E2E3E7]"
//               }`}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>

//         {/* Filter Options */}
//         <div className="w-2/3 bg-[#FFFFFF] overflow-y-auto">
//           {type ? (
//             <div className="space-y-2  px-2 bg-[#DFDFDF7D]">
//               {/* <h3 className="text-lg font-semibold">{type} Options</h3> */}
//               {filters[type].map((option, index) => (
//                 <label
//                   key={index}
//                   className="flex items-center gap-2 h-[56px] border-b-2"
//                 >
//                   <input
//                     type={type === "Price" ? "radio" : "checkbox"}
//                     className="accent-blue-600 h-5 w-5"
//                     name={type}
//                     checked={
//                       type === "Price"
//                         ? selectedOptions.Price.includes(option)
//                         : selectedOptions[type]?.includes(option)
//                     }
//                     onChange={() => handleFilterChange(type, option)}
//                   />
//                   <span>{option}</span>
//                 </label>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500  px-2">
//               Select a filter type to view options.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FilterComponent;
