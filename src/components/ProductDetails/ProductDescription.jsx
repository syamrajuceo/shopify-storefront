
const ProductDescription = ({ description, metafields = [] }) => {

  console.log(metafields)
  const color = metafields.find((metobj) => metobj.key === "color-pattern")?.metavalue?.reduce((acc, val) => {
    return acc ? `${acc}, ${val.handle}` : val.handle;
  }, "");
  const gender = metafields.find((metobj) => metobj.key === "target-gender")?.metavalue?.reduce((acc, val) => {
    return acc ? `${acc}, ${val.handle}` : val.handle;
  }, "");
  const age = metafields.find((metobj) => metobj.key === "age-group")?.metavalue?.reduce((acc, val) => {
    return acc ? `${acc}, ${val.handle}` : val.handle;
  }, "");
  const frameDesign = metafields.find((metobj) => metobj.key === "eyewear-frame-design")?.metavalue?.reduce((acc, val) => {
    return acc ? `${acc}, ${val.handle}` : val.handle;
  }, "");

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Product Description</h2>

      <p className="text-gray-700 mb-8">
        {description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 capitalize">
        <div className="p-4 border border-gray-300">
          <p className="text-gray-500">Lens Type</p>
          <p className="font-semibold">Polarized</p>
        </div>

        <div className="p-4 border border-gray-300">
          <p className="text-gray-500">Frame Color</p>
          <p className="font-semibold">{color || "NOT available"}</p>
        </div>

        {/* Attribute 3 */}
        <div className="p-4 border border-gray-300">
          <p className="text-gray-500">Target Gender</p>
          <p className="font-semibold">{gender || "NOT available"}</p>
        </div>

        {/* Attribute 4 */}
        <div className="p-4 border border-gray-300">
          <p className="text-gray-500">Frame Design</p>
          <p className="font-semibold">{frameDesign || "NOT available"}</p>
        </div>

        {/* Attribute 5 */}
        <div className="p-4 border border-gray-300">
          <p className="text-gray-500">Age Group</p>
          <p className="font-semibold">{age || "NOT available"}</p>
        </div>

        {/* Attribute 6 */}
        <div className="p-4 border border-gray-300">
          <p className="text-gray-500">Category</p>
          <p className="font-semibold">Sunglasses</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;