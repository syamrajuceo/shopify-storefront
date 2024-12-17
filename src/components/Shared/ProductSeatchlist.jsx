import { Link } from "react-router-dom";
import highlightSearchQuery from "./Helper";

function ProductSearchList({ searchQuery = "", setSearchQuery, searchResult: products = [], small = false, querytype = "Product" ,  selectedIndex = -1, }) {
    // Only render the list if searchQuery is not empty
    if (searchQuery === null || searchQuery.trim() === "") return null;

    return (
        <div className={`absolute w-full bg-slate-200 z-30 ${small ? "p-1" : "p-2"} max-h-[200px] overflow-y-auto top-[45px] transition-all duration-300`}>
            {products.length > 0 ? (
                products.map((product,index) => (
                    <Link to={`/product/${product.handle}`}
                        key={product.id}
                        className={`flex p-3 w-full items-center border-b-2 border-slate-100 rounded-md transition-transform transform hover:scale-105 ${
                            index === selectedIndex ? "bg-blue-200 scale-105" : "hover:bg-slate-200"
                        }`}
                        onClick={() => setSearchQuery('')}
                        >
                        <img
                            src={product.images.edges[0].node.url}
                            alt={`${product.title} img`}
                            className={small ? "w-[20px] h-[20px] mr-3" : "w-[40px] h-[40px] mr-3 transition-all duration-300 ease-in-out"}
                        />
                        <p className="text-sm font-medium">
                            {querytype === "Product" ? (
                                // Highlight product title when query type is "Product"
                                highlightSearchQuery(product.title, searchQuery)
                            ) : querytype === "Price" ? (
                                // Display product title and price with search query highlighted
                                <div className="flex flex-col">
                                    <p>{product.title}</p>
                                    <p>
                                        {highlightSearchQuery(
                                            `${product.variants.edges[0].node.priceV2.currencyCode} ${product.variants.edges[0].node.priceV2.amount}`,
                                            searchQuery
                                        )}
                                    </p>
                                </div>
                            ) : (
                                // Default case: Handle other query types (e.g., "Vendor")
                                <div className="flex flex-col">
                                    <p>{product.title}</p>
                                    <p>
                                        {highlightSearchQuery(
                                            `${querytype}: ${querytype === "Vendor" ? product.vendor : ""}`,
                                            searchQuery
                                        )}
                                    </p>
                                </div>
                            )}
                        </p>
                    </Link>

                ))
            ) : (
                <p className="p-3">No products found</p>
            )}
        </div>
    );
}

export default ProductSearchList;
