
const ProductDescription = ({description,metafields}) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Product Description</h2>

      <p className="text-gray-700 mb-8">
        {description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="p-4 border border-gray-300">
          <p className="text-gray-500">Lens Type</p>
          <p className="font-semibold">Polarized</p>
        </div>

        <div className="p-4 border border-gray-300">
          <p className="text-gray-500">Frame Color</p>
          <p className="font-semibold">Green</p>
        </div>

        {/* Attribute 3 */}
        <div className="p-4 border border-gray-300">
          <p className="text-gray-500">Target Gender</p>
          <p className="font-semibold">Regular-fit</p>
        </div>

        {/* Attribute 4 */}
        <div className="p-4 border border-gray-300">
          <p className="text-gray-500">Frame Design</p>
          <p className="font-semibold">Round Neck</p>
        </div>

        {/* Attribute 5 */}
        <div className="p-4 border border-gray-300">
          <p className="text-gray-500">Age Group</p>
          <p className="font-semibold">Adults</p>
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