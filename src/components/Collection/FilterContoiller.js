const FilterController = (products, filterOptions, priceRange) => {
    console.log(products);

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
          if (key === "Gender") {
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
          if (key === "Frame Color") {
            // Handle the Frame Color filter
            filteredProducts = filteredProducts.filter((product) => {
              // Find the metafield that matches the "target-gender" key and check if its value matches the filter
              const colorMetafield = product.metafields.find((metafield) => metafield.key === "color-pattern");
              if (colorMetafield && Array.isArray(colorMetafield.metavalue)) {
                // Check if any of the color values in the metafield matches the filter options
                return colorMetafield.metavalue.some((color) =>
                  filterOptions[key].includes(color.handle) // Assuming `handle` is the color identifier
                );
              }
              return false;
            });
          }
        }
      });
    
    console.log("filteredProducts", filteredProducts);
    return filteredProducts;
};

export default FilterController;
