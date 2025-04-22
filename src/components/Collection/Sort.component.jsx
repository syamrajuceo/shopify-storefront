// import { BiSortAlt2 } from "react-icons/bi";
// import { AiOutlineClose } from "react-icons/ai";
// import { FilterName, sortDataOptions } from "../../data/Collection.data";
// function SortComponent({ SetSelectedFilter ,Sortoption,setSortOption}) {
//   return (
//     <div className="border-r-1 bg-[#FFFFFF] rounded  w-full lg:w-1/3">
//       <div className="flex items-center justify-between p-4 text-xl border-b">
//         <div className="flex items-center gap-2">
//           <BiSortAlt2 />
//           <span>Sort by</span>
//         </div>
//         <AiOutlineClose
//           className="cursor-pointer text-gray-600 hover:text-gray-800"
//           onClick={() => SetSelectedFilter(null)}
//         />
//       </div>
//       <div className="p-4 space-y-3">
//         {sortDataOptions.map((option) => (
//           <label key={option.value} className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="sortOption"
//               value={option.value}
//               checked={Sortoption?.value === option.value}
//               onChange={() => 
//                 setSortOption((prev) => ({
//                   ...prev,
//                   [FilterName.Sort]: option
//                 }))
//               }              
//               className="accent-blue-600"
//             />
//             <span className="text-gray-700">{option.label}</span>
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// }
// export default SortComponent;
