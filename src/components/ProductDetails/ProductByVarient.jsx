import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductByHandle } from "../../store/products";
export const ProductVariants = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchProductVariants = async () => {
      try {
        const { productData, initialOptions } = await fetchProductByHandle(
          handle
        );
        // console.log(
        //   "product : " + productData + ", initialOptions : " + initialOptions
        // );
        setProduct(productData);
        setSelectedOptions(initialOptions);
      } catch (error) {
        console.error("Error fetching product variants:", error);
      }
    };

    fetchProductVariants();
  }, [handle]);

  useEffect(() => {
    // Find the matching variant based on selected options
    if (product) {
      const matchingVariant = product.variants.edges.find(({ node }) =>
        node.selectedOptions.every(
          (option) => selectedOptions[option.name] === option.value
        )
      );
      setSelectedVariant(matchingVariant ? matchingVariant.node : null);
    }
  }, [selectedOptions, product]);

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };


// console.log("product :" , product)

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.title}</h1>

      {/* Render options (e.g., colors, sizes) */}
      {product.options.map((option) => (
        <div key={option.name}>
          <h3>{option.name}</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            {option.values.map((value) => {
              const isColorOption = option.name.toLowerCase().includes("color");
              const isSelected = selectedOptions[option.name] === value;

              return (
                <label
                  key={value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isColorOption ? "30px" : "auto",
                    height: isColorOption ? "30px" : "auto",
                    borderRadius: isColorOption ? "50%" : "4px", // Rounded for color, square for text
                    backgroundColor: isColorOption ? value : "transparent",
                    border: isSelected
                      ? "2px solid #000" // Black border for selected option
                      : "2px solid transparent", // Transparent border for unselected
                    cursor: "pointer",
                    padding: isColorOption ? "0" : "5px 10px",
                    textAlign: "center",
                    boxShadow: isSelected
                      ? "0 0 5px rgba(0, 0, 0, 0.5)" // Optional shadow for selected
                      : "none",
                  }}
                >
                  <input
                    type="radio"
                    name={option.name}
                    value={value}
                    checked={isSelected}
                    onChange={() => handleOptionChange(option.name, value)}
                    style={{ display: "none" }}
                  />
                  {!isColorOption && <span>{value}</span>}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      {/* Display selected variant details */}
      {selectedVariant ? (
        <div style={{ marginTop: "20px" }}>
          <h2>Selected Variant</h2>
          <p>Variant: {selectedVariant.title}</p>
          <p>SKU: {selectedVariant.sku}</p>
          <p>
            Price: {selectedVariant.price.amount}{" "}
            {selectedVariant.price.currencyCode}
          </p>
          <p>Available: {selectedVariant.availableForSale ? "Yes" : "No"}</p>
        </div>
      ) : (
        <p>No matching variant found for the selected options.</p>
      )}
    </div>
  );
};
