import { Link } from "react-router-dom";
import highlightSearchQuery from "./Helper";

function ProductSearchList({
  searchQuery = "",
  setSearchQuery = () => {},
  searchResult: products = [],
  searchStatus = "idle",
  small = false,
  queryType = "Product",
  selectedIndex = -1,
}) {
  // Don't render if there's no search query
  if (!searchQuery || searchQuery.trim() === "") return null;

  // Loading state
  if (searchStatus === "loading") {
    return (
      <div className={`absolute w-full bg-white shadow-lg z-50 ${
        small ? "max-h-[200px]" : "max-h-[400px]"
      } overflow-y-auto top-full`}
      >
        <div className="p-4 text-center text-gray-500">Searching products...</div>
      </div>
    );
  }

  // Error state
  if (searchStatus === "failed") {
    return (
      <div className={`absolute w-full bg-white shadow-lg z-50 ${
        small ? "max-h-[200px]" : "max-h-[400px]"
      } overflow-y-auto top-full`}
      >
        <div className="p-4 text-center text-red-500">
          Failed to load search results
        </div>
      </div>
    );
  }

  // No results state
  if (products.length === 0) {
    return (
      <div className={`absolute w-full bg-white shadow-lg z-50 ${
        small ? "max-h-[200px]" : "max-h-[400px]"
      } overflow-y-auto top-full`}
      >
        <div className="p-4 text-center text-gray-500">
          No products found for "{searchQuery}"
        </div>
      </div>
    );
  }

  return (
    <div
      className={`absolute w-full bg-white shadow-lg z-50 ${
        small ? "max-h-[200px]" : "max-h-[400px]"
      } overflow-y-auto top-full border border-gray-200 rounded-lg`}
    >
      {/* Query type header */}
      <div className="sticky top-0 bg-white p-2 font-semibold border-b">
        {queryType}
      </div>

      {/* Search results list */}
      {products.map((product, index) => (
        <Link
          to={`/product/${product.handle}`}
          key={product.id}
          className={`flex p-3 items-center border-b border-gray-100 hover:bg-gray-50 transition-colors ${
            index === selectedIndex ? "bg-blue-50" : ""
          }`}
          onClick={() => setSearchQuery("")}
        >
          {/* Product image with fallback */}
          <div className={`flex-shrink-0 ${
            small ? "w-8 h-8" : "w-12 h-12"
          } mr-3 bg-gray-100 rounded overflow-hidden`}>
            {product.images?.edges?.[0]?.node?.url ? (
              <img
                src={product.images.edges[0].node.url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Product details */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {highlightSearchQuery(product.title, searchQuery)}
            </p>
            
            {/* Additional info based on query type */}
            {queryType === "Price" && product.variants?.edges?.[0]?.node?.priceV2 && (
              <p className="text-xs text-gray-600">
                {highlightSearchQuery(
                  `${product.variants.edges[0].node.priceV2.currencyCode} ${product.variants.edges[0].node.priceV2.amount}`,
                  searchQuery
                )}
              </p>
            )}

            {queryType === "Vendor" && product.vendor && (
              <p className="text-xs text-gray-600">
                {highlightSearchQuery(`Vendor: ${product.vendor}`, searchQuery)}
              </p>
            )}

            {/* Display metafield info if query is from metafield search */}
            {queryType.includes(":") && (
              <p className="text-xs text-gray-600">
                {queryType}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductSearchList;