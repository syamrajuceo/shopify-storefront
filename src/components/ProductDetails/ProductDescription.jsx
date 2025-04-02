import { TableComponent } from "./Table";

const ProductDescription = ({
  description,
  descriptionHtml,
  metafields = [],
}) => {
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
