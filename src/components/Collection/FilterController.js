import { FilterName, SortName } from "../../data/Collection.data";

const FilterController = (products, filterOptions, priceRange) => {

  // Apply price filter
  let filteredProducts = products.filter((productObj) => {
    const productPrice = productObj.variants.edges[0].node.priceV2.amount;
    return productPrice >= priceRange.min && productPrice <= priceRange.max;
  });


  // Object.keys(filterOptions).forEach((key) => {
  //     if (filterOptions[key]?.length > 0) {
  //         filteredProducts = filteredProducts.filter(product => 
  //             filterOptions[key].some(option => product[key]?.includes(option))
  //         );
  //     }
  // });
  Object.keys(filterOptions).forEach((key) => {
    if (filterOptions[key]?.length > 0) {
      if (key === FilterName.Gender) {
        // Handle the Gender filter
        filteredProducts = filteredProducts.filter((product) => {
          // Find the metafield that matches the "target-gender" key and check if its value matches the filter
          const genderMetafield = product.metafields.find((metafield) => metafield.key === "target-gender");
          if (genderMetafield && Array.isArray(genderMetafield.metavalue)) {
            // Check if any of the gender values in the metafield matches the filter options
            return genderMetafield.metavalue.some((gender) =>
              filterOptions[key].includes(gender.handle) // Assuming `handle` is the gender identifier
            );
          }
          return false;
        });
      }
      if (key === FilterName.Color) {
        // Handle the Frame Color filter
        // filteredProducts = filteredProducts.filter((product) => {
        //   const colorMetafield = product.metafields.find((metafield) => metafield.key === "color-pattern");
        //   if (colorMetafield && Array.isArray(colorMetafield.metavalue)) {
        //     // Check if any of the color values in the metafield matches the filter options
        //     return colorMetafield.metavalue.some((color) =>
        //       filterOptions[key].includes(color.handle) // Assuming `handle` is the color identifier
        //     );
        //   }
        //   return false;
        // });
        filteredProducts = filteredProducts.filter((product) => {
          const metafields = product.metafields;

          // Find the eyewear color field
          const eyewearColor = metafields.find(
            (field) => field.key === "eyewear-frame-color" || field.key === "lens-color"
          )?.metavalue?.[0]?.handle;

          // Ensure eyewearColor is not undefined before calling toLowerCase()
          if (!eyewearColor) return false;

          return filterOptions[key].some(option => option.toLowerCase() === eyewearColor.toLowerCase());
        });

      }
      if (key === FilterName.Category) {
        filteredProducts = filteredProducts.filter((product) => {
          return filterOptions[key].includes(product.productType)
        });
      }
      if (key.trim() === FilterName.Brand) {
        filteredProducts = filteredProducts.filter((product) => {
          const metafields = product.metafields;

          // Find the eyewear color field
          const eyewearBrand = metafields.find(
            (field) => field.key === "brand"
          )?.value;
          // Ensure eyewearColor is not undefined before calling toLowerCase()
          if (!eyewearBrand) return false;

          return filterOptions[key].some(option => option.toLowerCase() === eyewearBrand.toLowerCase());
        });
      }
      if (key === FilterName.Status) {
        filteredProducts = filteredProducts.filter((product) => {

          const is_available = product.variants?.edges?.[0]?.node?.availableForSale || false
          const is_available_stock = product.variants?.edges?.[0]?.node?.quantityAvailable || 0
          return filterOptions[key].includes("Available") && (is_available && is_available_stock > 0)
            || filterOptions[key].includes("Out of Stock") && (!is_available || is_available_stock <= 0);

        });
      }
    }

    if (key === FilterName.Sort) {
      const sortType = filterOptions[FilterName.Sort]?.value;
    
      if (sortType === SortName.PriceLowHigh || sortType === SortName.PriceHighLow) {
        filteredProducts.sort((a, b) => {
          const priceA = parseFloat(a.variants?.edges?.[0]?.node?.priceV2?.amount) || 0;
          const priceB = parseFloat(b.variants?.edges?.[0]?.node?.priceV2?.amount) || 0;
          
          return sortType === SortName.PriceLowHigh ? priceA - priceB : priceB - priceA;
        });
      }
    }
    
  });


  return filteredProducts;
};

export default FilterController;
