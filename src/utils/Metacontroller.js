import axios from "axios";

export const Metacontroller = async (data) => {
  const queryParts = [];
  let metaobjectCounter = 1;

  // Pre-build a map of metaobject IDs for quick lookup later
  const buildQueryPart = (dataobj) => {
    return dataobj.metafields
      .map((metafield) => {
        if (!metafield) return ""; // Skip null or undefined metafields

        let metaObjectIDs;

        // Parse the value only once
        try {
          metaObjectIDs = JSON.parse(metafield.value);
        } catch (error) {
          return ""; // Skip invalid JSON values
        }

        if (!Array.isArray(metaObjectIDs)) return ""; // Skip if not an array

        // Filter out null or undefined values and generate query part
        return metaObjectIDs
          .filter((id) => id !== null && id !== undefined)
          .map(
            (id) =>
              `metaobject${metaobjectCounter++}: metaobject(id: "${id}") { id handle }`
          )
          .join("\n");
      })
      .join("\n");
  };

  // Generate the GraphQL query
  data.forEach((dataobj) => {
    const queryPart = buildQueryPart(dataobj);
    if (queryPart) queryParts.push(queryPart);
  });

  const query = `query GetMetaobjects { ${queryParts.join("\n")} }`;

  const API_URL = "https://4bz4tg-qg.myshopify.com/api/2025-04/graphql.json";
  const API_TOKEN = "80a45abbc99fa8d887c693c5aae5996e";

  try {
    const response = await axios.post(
      API_URL,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": API_TOKEN,
        },
      }
    );

    // Map metaobject details into a quick lookup map
    const metaarray = response.data.data ? response.data.data : {};
    const metaObjectMap = Object.keys(metaarray).reduce((map, key) => {
      map[metaarray[key].id] = metaarray[key];
      return map;
    }, {});

    // Process data with the metaobject map
    const processedData = data.map((dataobj) => {
      dataobj.metafields.forEach((metafield) => {
        if (!metafield) return; // Skip null or undefined metafields

        let metaObjectIDs;
        try {
          metaObjectIDs = JSON.parse(metafield.value);
        } catch (error) {
          return; // Skip invalid JSON values
        }

        if (!Array.isArray(metaObjectIDs)) return; // Skip if not an array

        // Assign matched metaobjects using the map
        metafield.metavalue = metaObjectIDs
          .map((id) => metaObjectMap[id])
          .filter(Boolean); // Remove undefined values
      });
      return dataobj;
    });

    return processedData;
  } catch (error) {
    console.error("Error fetching data from Shopify:", error);
    throw new Error("Failed to fetch data from Shopify");
  }
};


export const MetaSingleController = async (product) => {
  const isValidShopifyGlobalID = (id) =>
    typeof id === "string" && /^gid:\/\/shopify\/\w+\/\d+$/.test(id);

  if (!product) {
    console.error("Product object is undefined or null.");
    throw new Error("Invalid product object.");
  }

  if (!Array.isArray(product.metafields)) {
    console.error(
      "Product metafields are missing or not an array:",
      product.metafields
    );
    return product;
  }

  let metaobjectCounter = 1;

  const queryPart = product.metafields
    .filter((metafield) => metafield && metafield.value) // Skip null or missing metafields
    .map((metafield) => {
      let metaObjectIDs;

      try {
        metaObjectIDs = JSON.parse(metafield.value); // Try parsing as JSON
      } catch (error) {
        // If parsing fails, treat value as a plain string and wrap it in a JSON array
        console.warn("Invalid JSON in metafield value:", metafield.value);
        metaObjectIDs = [metafield.value];
      }

      if (!Array.isArray(metaObjectIDs)) return ""; // Ensure it's an array

      return metaObjectIDs
        .filter((id) => isValidShopifyGlobalID(id)) // Validate IDs
        .map(
          (id) =>
            `metaobject${metaobjectCounter++}: metaobject(id: "${id}") { id handle }`
        )
        .join("\n");
    })
    .filter(Boolean) // Remove empty strings
    .join("\n");

  if (!queryPart) {
    console.warn("No valid metafields found for the product.");
    return product;
  }

  const query = `query GetMetaobjects { ${queryPart} }`;

  const API_URL = "https://4bz4tg-qg.myshopify.com/api/2025-04/graphql.json";
  const API_TOKEN = "80a45abbc99fa8d887c693c5aae5996e";

  try {
    const response = await axios.post(
      API_URL,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": API_TOKEN,
        },
      }
    );

    const metaarray = response.data.data ? response.data.data : {};
    const metaObjectMap = Object.keys(metaarray).reduce((map, key) => {
      map[metaarray[key].id] = metaarray[key];
      return map;
    }, {});

    product.metafields.forEach((metafield) => {
      if (!metafield || !metafield.value) return;

      let metaObjectIDs;
      try {
        metaObjectIDs = JSON.parse(metafield.value);
      } catch (error) {
        metaObjectIDs = [metafield.value]; // Convert plain string to JSON array
      }

      if (!Array.isArray(metaObjectIDs)) return;

      const mappedValues = metaObjectIDs
        .filter((id) => isValidShopifyGlobalID(id)) // Validate again
        .map((id) => metaObjectMap[id])
        .filter(Boolean); // Remove undefined values

      metafield.metavalue = mappedValues;

      if (mappedValues.length === 0) {
        console.warn(
          `No valid metaobjects found for metafield with key: ${metafield.key}, value: ${metafield.value}`
        );
      }
    });

    return product;
  } catch (error) {
    console.error("Error fetching data from Shopify:", error.response || error);
    throw new Error("Failed to fetch data from Shopify");
  }
};



// export const MetaSingleController = async (data) => {
//   if (!data || !Array.isArray(data.metafields)) {
//     throw new Error("Invalid input data. 'metafields' must be an array.");
//   }

//   let metaobjectCounter = 1;

//   // Filter out null or undefined metafields
//   const validMetafields = data.metafields.filter((metafield) => metafield);

//   // Build the GraphQL query
//   const queryParts = validMetafields.flatMap((metafield) => {
//     try {
//       const metaObjectIDs = JSON.parse(metafield.value);
//       if (!Array.isArray(metaObjectIDs)) return [];

//       return metaObjectIDs
//         .filter((id) => id) // Filter out falsy values
//         .map((id) => `metaobject${metaobjectCounter++}: metaobject(id: "${id}") { id handle }`);
//     } catch (error) {
//       console.warn(`Skipping invalid JSON value in metafield: ${metafield.value}`);
//       return [];
//     }
//   });

//   if (!queryParts.length) {
//     throw new Error("No valid metaobject IDs found in input data.");
//   }

//   const query = `query GetMetaobjects { ${queryParts.join("\n")} }`;

//   const API_URL = "https://4bz4tg-qg.myshopify.com/api/2025-04/graphql.json";
//   const API_TOKEN = "80a45abbc99fa8d887c693c5aae5996e";

//   try {
//     const response = await axios.post(
//       API_URL,
//       { query },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-Shopify-Storefront-Access-Token": API_TOKEN,
//         }
//       }
//     );

//     const metaobjects = response.data.data || {};
//     const metaObjectMap = Object.fromEntries(
//       Object.values(metaobjects).map((obj) => [obj.id, obj])
//     );

//     // Process valid metafields and enrich them with metaobject details
//     const processedData = validMetafields.map((metafield) => {
//       try {
//         const metaObjectIDs = JSON.parse(metafield.value);
//         if (!Array.isArray(metaObjectIDs)) return { ...metafield, metavalue: [] };

//         return {
//           ...metafield,
//           metavalue: metaObjectIDs
//             .map((id) => metaObjectMap[id])
//             .filter(Boolean), // Remove undefined values
//         };
//       } catch (error) {
//         return { ...metafield, metavalue: [] }; // Return metafield with empty metavalue on error
//       }
//     });

//     return processedData;
//   } catch (error) {
//     console.error("Error fetching data from Shopify:", error);
//     throw new Error("Failed to fetch data from Shopify.");
//   }
// };
