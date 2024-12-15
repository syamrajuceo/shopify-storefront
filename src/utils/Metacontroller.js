import axios from "axios";

const Metacontroller = async (data) => {
  const queryParts = [];
  let metaobjectCounter = 1;

  // Pre-build a map of metaobject IDs for quick lookup later
  const buildQueryPart = (dataobj) => {
    return dataobj.metafields
      .map((metobj) => {
        let metaObjectIDs;

        // Parse the value only once
        try {
          metaObjectIDs = JSON.parse(metobj.value);
        } catch (error) {
          return ''; // Skip invalid JSON values
        }

        if (!Array.isArray(metaObjectIDs)) return ''; // Skip if not an array

        // Filter out null or undefined values and generate query part
        return metaObjectIDs
          .filter((id) => id !== null && id !== undefined)
          .map((id) => `metaobject${metaobjectCounter++}: metaobject(id: "${id}") { id handle }`)
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

  const API_URL = "https://4bz4tg-qg.myshopify.com/api/2024-10/graphql.json";
  const API_TOKEN = "aae77a75514b280e61a74cc7ee993635";

  try {
    const response = await axios.post(API_URL, { query }, {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": API_TOKEN,
      },
    });

    // Map metaobject details into a quick lookup map
    const metaarray = response.data.data ? response.data.data : {};
    const metaObjectMap = Object.keys(metaarray).reduce((map, key) => {
      map[metaarray[key].id] = metaarray[key];
      return map;
    }, {});

    // Process data with the metaobject map
    const processedData = data.map((dataobj) => {
      dataobj.metafields.forEach((metafield) => {
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

export default Metacontroller;
