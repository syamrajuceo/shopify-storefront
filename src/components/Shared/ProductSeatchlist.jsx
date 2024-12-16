import { Link } from "react-router-dom";

function ProductSearchList({ searchQuery = "", searchResult: products = [], small = false }) {
    // Only render the list if searchQuery is not empty
    if (searchQuery === null || searchQuery.trim() === "") return null;

    return (
        <div className={`absolute w-full bg-slate-200 z-30 ${small ? "p-1" : "p-2"} max-h-[200px] overflow-y-auto top-[45px] transition-all duration-300`}>
            {products.length > 0 ? (
                products.map((product) => (
                    <Link to={`/product/${product.handle}`}
                        key={product.id}
                        className="flex p-3 w-full items-center border-b-2 border-slate-300 hover:bg-slate-100 rounded-md transition-transform transform hover:scale-105">
                        <img
                            src={product.images.edges[0].node.url}
                            alt={`${product.title} img`}
                            className={small ? "w-[20px] h-[20px] mr-3" : "w-[40px] h-[40px] mr-3 transition-all duration-300 ease-in-out"}
                        />
                        <p className="text-sm font-medium">{product.title}</p>
                    </Link>

                ))
            ) : (
                <p className="p-3">No products found</p>
            )}
        </div>
    );
}

export default ProductSearchList;
