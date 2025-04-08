import { FilterName } from "../../data/Collection.data";

const FilterController = (products, filterOptions, priceRange, currentCategory) => {
  if (!products || !Array.isArray(products)) {
    return [];
  }

  let filteredProducts = [...products];

  // 1. Price Filter
  filteredProducts = filteredProducts.filter(product => {
    const price = parseFloat(product?.variants?.edges?.[0]?.node?.priceV2?.amount || 0);
    return price >= priceRange.min && price <= priceRange.max;
  });

  // 2. Gender Filter
  if (filterOptions[FilterName.Gender]?.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      // If we're in a specific gender category (Men/Women), use that as primary filter
      if (currentCategory === 'Men' || currentCategory === 'Women') {
        return true; // Already filtered by category
      }

      const genderFields = product.metafields?.filter(field => 
        ['gender', 'target-gender'].includes(field.key?.toLowerCase())
      );

      // If no gender fields found, include if unisex is selected
      if (!genderFields || genderFields.length === 0) {
        return filterOptions[FilterName.Gender].some(g => g.toLowerCase() === 'unisex');
      }

      // Check if any of the gender fields match the selected filters
      return genderFields.some(field => {
        const fieldValue = field.value?.toLowerCase();
        const metavalues = Array.isArray(field.metavalue) 
          ? field.metavalue.map(m => m.handle?.toLowerCase())
          : [];

        return filterOptions[FilterName.Gender].some(selectedGender => {
          const lowerSelected = selectedGender.toLowerCase();
          return fieldValue === lowerSelected || 
                 metavalues.includes(lowerSelected) ||
                 (lowerSelected === 'unisex' && (fieldValue === 'unisex' || metavalues.includes('unisex')));
        });
      });
    });
  }

  // 3. Color Filter
  if (filterOptions[FilterName.Color]?.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      const colorFields = product.metafields?.filter(field => 
        ['eyewear-frame-color', 'lens-color', 'color'].includes(field.key?.toLowerCase())
      );
      
      if (!colorFields || colorFields.length === 0) return false;

      return colorFields.some(field => {
        const fieldValue = field.value?.toLowerCase();
        const metavalues = Array.isArray(field.metavalue) 
          ? field.metavalue.map(m => m.handle?.toLowerCase())
          : [];

        return filterOptions[FilterName.Color].some(selectedColor => {
          const lowerSelected = selectedColor.toLowerCase();
          return fieldValue === lowerSelected || 
                 metavalues.includes(lowerSelected);
        });
      });
    });
  }

  // 4. Brand Filter
  if (filterOptions[FilterName.Brand]?.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      const brand = product.vendor?.toLowerCase();
      if (!brand) return false;

      return filterOptions[FilterName.Brand].some(selectedBrand => 
        selectedBrand.toLowerCase() === brand
      );
    });
  }

  // 5. Status Filter
  if (filterOptions[FilterName.Status]?.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      const variant = product.variants?.edges?.[0]?.node;
      const isAvailable = variant?.availableForSale;
      const inStock = variant?.quantityAvailable > 0;
      
      if (filterOptions[FilterName.Status].includes("Available") && 
          filterOptions[FilterName.Status].includes("Out of Stock")) {
        return true;
      }
      if (filterOptions[FilterName.Status].includes("Available")) {
        return isAvailable && inStock;
      }
      if (filterOptions[FilterName.Status].includes("Out of Stock")) {
        return !isAvailable || !inStock;
      }
      return true;
    });
  }

  return filteredProducts;
};

export default FilterController;