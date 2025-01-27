import { TableComponent } from "./Table";

const ProductDescription = ({
  description,
  descriptionHtml,
  metafields = [],
}) => {
  // const color =
  //   metafields.find((metobj) => metobj.key === "color-pattern")?.value &&
  //   JSON.parse(
  //     metafields.find((metobj) => metobj.key === "color-pattern")?.value
  //   ).reduce((acc, val) => {
  //     return acc ? `${acc}, ${val}` : ""; // Replace `val` handling if you need specific properties
  //   }, "");

  // const gender =
  //   metafields.find((metobj) => metobj.key === "target-gender")?.value &&
  //   JSON.parse(
  //     metafields.find((metobj) => metobj.key === "target-gender")?.value
  //   ).reduce((acc, val) => {
  //     return acc ? `${acc}, ${val}` : "";
  //   }, "");

  // const age =
  //   metafields.find((metobj) => metobj.key === "age-group")?.value &&
  //   JSON.parse(
  //     metafields.find((metobj) => metobj.key === "age-group")?.value
  //   ).reduce((acc, val) => {
  //     return acc ? `${acc}, ${val}` : "";
  //   }, "");

  // const frameDesign =
  //   metafields.find((metobj) => metobj.key === "eyewear-frame-design")?.value &&
  //   JSON.parse(
  //     metafields.find((metobj) => metobj.key === "eyewear-frame-design")?.value
  //   ).reduce((acc, val) => {
  //     return acc ? `${acc}, ${val}` : "";
  //   }, "");
  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Product Description</h2>

      {/* Render HTML safely */}
      <div
        className="prose max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      ></div>
      <div>
        <TableComponent metafields ={metafields}/>
      </div>
    </div>
  );
};

export default ProductDescription;

// import React from "react";

// const ProductDescription = ({ descriptionHtml }) => {
//   return (
//     <div className="mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Product Description</h2>

//       {/* Render HTML safely */}
//       <div
//         className="prose max-w-none text-gray-700"
//         dangerouslySetInnerHTML={{ __html: descriptionHtml }}
//       ></div>
//     </div>
//   );
// };

// export default ProductDescription;
