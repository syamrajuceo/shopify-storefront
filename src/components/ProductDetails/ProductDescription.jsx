// const ProductDescription = ({ description,descriptionHtml, metafields = [] }) => {

//   console.log(metafields)
//   const color = metafields.find((metobj) => metobj.key === "color-pattern")?.metavalue?.reduce((acc, val) => {
//     return acc ? `${acc}, ${val.handle}` : val.handle;
//   }, "");
//   const gender = metafields.find((metobj) => metobj.key === "target-gender")?.metavalue?.reduce((acc, val) => {
//     return acc ? `${acc}, ${val.handle}` : val.handle;
//   }, "");
//   const age = metafields.find((metobj) => metobj.key === "age-group")?.metavalue?.reduce((acc, val) => {
//     return acc ? `${acc}, ${val.handle}` : val.handle;
//   }, "");
//   const frameDesign = metafields.find((metobj) => metobj.key === "eyewear-frame-design")?.metavalue?.reduce((acc, val) => {
//     return acc ? `${acc}, ${val.handle}` : val.handle;
//   }, "");
//   return (
//     <div className="mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Product Description</h2>

//       {/* Render HTML safely */}
//       <p
//         className="text-gray-700 mb-8"
//         dangerouslySetInnerHTML={{ __html: descriptionHtml }}
//       ></p>

//       {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 capitalize">
//         <div className="p-4 border border-gray-300">
//           <p className="text-gray-500">Lens Type</p>
//           <p className="font-semibold">Polarized</p>
//         </div>

//         <div className="p-4 border border-gray-300">
//           <p className="text-gray-500">Frame Color</p>
//           <p className="font-semibold">{color || "NOT available"}</p>
//         </div>

        
//         <div className="p-4 border border-gray-300">
//           <p className="text-gray-500">Target Gender</p>
//           <p className="font-semibold">{gender || "NOT available"}</p>
//         </div>

       
//         <div className="p-4 border border-gray-300">
//           <p className="text-gray-500">Frame Design</p>
//           <p className="font-semibold">{frameDesign || "NOT available"}</p>
//         </div>

        
//         <div className="p-4 border border-gray-300">
//           <p className="text-gray-500">Age Group</p>
//           <p className="font-semibold">{age || "NOT available"}</p>
//         </div>

        
//         <div className="p-4 border border-gray-300">
//           <p className="text-gray-500">Category</p>
//           <p className="font-semibold">Sunglasses</p>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default ProductDescription;




import React from "react";

const ProductDescription = ({ descriptionHtml }) => {
  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Product Description</h2>

      {/* Render HTML safely */}
      <div
        className="prose max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      ></div>
    </div>
  );
};

export default ProductDescription;
