const FilterController = (products, filterOptions, priceRange) => {
    console.log(products);
  
    // Apply price filter
    let filteredProducts = products.filter((productObj) => {
      const productPrice = productObj.variants.edges[0].node.priceV2.amount; 
      return productPrice >= priceRange.min && productPrice <= priceRange.max;
    });

   
    Object.keys(filterOptions).forEach((key) => {
        if (filterOptions[key]?.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                filterOptions[key].some(option => product[key]?.includes(option))
            );
        }
    });

    console.log("filteredProducts", filteredProducts);
    return filteredProducts;
};
  
export default FilterController;
