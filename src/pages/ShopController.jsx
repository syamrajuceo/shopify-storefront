import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
// import useShopifyStore from "../store/useShopifyStore";
import CollectionComponent from "../components/Collection/Collection.component";
import ScrollToTop from "../utils/ScrollToTop";
import { useSelector } from "react-redux";

function ShopController() {
    const { type = "ALL" } = useParams(); // Default to "ALL" if no type is provided
    const { search } = useLocation(); // Extract query string from the URL
    const [baseProducts, setBaseProducts] = useState([]);
    // const products = useShopifyStore((state) => state.products);
    const { products, status, error } = useSelector((state) => state.products);
    ScrollToTop()
    // Helper to extract query parameters
    const getQueryParams = (key) => {
        const params = new URLSearchParams(search);
        return params.get(key);
    };

    useEffect(() => {
        console.log("Products:", JSON.stringify(products)); // Debug: Log products array
        if (products && products.length > 0) {
            switch (type) {
                case "ALL":
                case "SHOP": {
                    setBaseProducts(products);
                    break;
                }
                case "ContactLenses": {
                    setBaseProducts(products.filter(product =>
                        product.productType?.toLowerCase().includes("contact lenses")
                    ));
                    break;
                }
                case "Sunglasses": {
                    setBaseProducts(products.filter(product =>
                        product.productType?.toLowerCase().includes("sunglasses")
                    ));
                    break;
                }
                case "Eyeglasses": {
                    setBaseProducts(products.filter(product =>
                        product.productType?.toLowerCase().includes("eyeglasses")
                    ));
                    break;
                }
                case "gender": {
                    const gender = getQueryParams("query") || "unisex"; // Default to "unisex"
                    console.log("Gender query:", gender); // Debug: Log gender value
                    if (gender) {
                        setBaseProducts(products.filter(product =>
                            product.metafields?.some(metafield =>
                                metafield.metavalue?.some(obj =>
                                    obj?.handle?.toLowerCase() === gender.toLowerCase() || obj?.handle?.toLowerCase() === "unisex"
                                )
                            )
                        ));

                    } else {
                        setBaseProducts([]); // No gender match
                    }
                    break;
                }
                default: {
                    setBaseProducts([]); // No valid type
                    break;
                }
            }
        }
    }, [products, type, search]);

    return (
        <CollectionComponent
            products={baseProducts}
            type={type === "ALL" || type === "SHOP" ? "" : type}
        />
    );
}

export default ShopController;
