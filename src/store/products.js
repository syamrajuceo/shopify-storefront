import { shopifyClient } from "../config/shopifyClient";
import Metacontroller from "../utils/Metacontroller";
import useShopifyStore from "./useShopifyStore";

export const fetchAllProducts = async () => {
  const query = `
      query {
        products(first: 100) {
          edges {
            node {
              id
              title
              descriptionHtml
              description
              vendor
              handle
              productType
              options {
                name
                values
              }
              variants(first: 100) {
                edges {
                  node {
                    id
                    priceV2 {
                      amount
                      currencyCode
                    }
                    compareAtPriceV2 {
                      amount
                      currencyCode
                    }
                    availableForSale
                    sku
                    quantityAvailable
                  }
                }
              }
              images(first: 100) {
                edges {
                  node {
                    id
                    url
                    altText
                  }
                }
              }
              metafields(identifiers: [
              {namespace: "shopify", key: "color-pattern"},
              {namespace: "shopify", key: "age-group"},
              {namespace: "shopify", key: "eyewear-frame-design"},
              {namespace: "shopify", key: "target-gender"},
              {namespace: "shopify", key: "fabric"},
              {namespace: "shopify", key: "lens_polarization"},
              {namespace: "custom", key: "express_delivery"}
              {namespace: "custom", key: "free_delivery"}
            ]) {
              namespace
              key
              value
              type
              description
            }
            }
          }
        }
      }
    `;

  try {
    const response = await shopifyClient.post("", { query });
    // console.log("response: " + JSON.stringify(response));
    const products = response.data.data.products.edges.map((edge) => {
      const product = edge.node;

      // Safely map metafields if they exist and are not null
      const metafields = product.metafields
        ? product.metafields
            .filter((mf) => mf !== null)
            .map((mf) => ({
              key: mf.key,
              value: mf.value,
              namespace: mf.namespace,
              type: mf.type,
              description: mf.description,
            }))
        : [];
      return {
        ...product,
        metafields,
      };
    });

    const newProduct = await Metacontroller(products);

    // Store products in Zustand
    useShopifyStore.getState().setProducts(newProduct);
    return newProduct;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};

// export const fetchProductById = async (variantId) => {
//   const query = `
//     query fetchProductByVariant($id: ID!) {
//       productVariant(id: $id) {
//         id
//         priceV2 {
//           amount
//           currencyCode
//         }
//         sku
//         product {
//           id
//           title
//           descriptionHtml
//           productType
//           images(first: 1) {
//             edges {
//               node {
//                 src
//                 altText
//               }
//             }
//           }
//         }
//       }
//     }
//   `;

//   try {
//     const response = await shopifyClient.post('', {
//       query,
//       variables: { id: variantId },
//     });

//     const variant = response.data.data.productVariant;

//     if (!variant) {
//       console.error('Product variant not found');
//       throw new Error('No product variant found');
//     }

//     // Return both the variant and product details
//     return {
//       title: variant.product.title,
//       descriptionHtml: variant.product.descriptionHtml,
//       productType: variant.product.productType,
//       price: variant.priceV2.amount,
//       currency: variant.priceV2.currencyCode,
//       sku: variant.sku,
//       image: variant.product.images.edges[0]?.node.src || '',
//       altText: variant.product.images.edges[0]?.node.altText || '',
//     };
//   } catch (error) {
//     console.error('Error fetching product by variant ID:', error.message);
//     throw error;
//   }
// };

export const fetchVariantsByProductId = async (productId) => {
  const query = `
    query fetchVariants($id: ID!) {
      product(id: $id) {
        variants(first: 10) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyClient.post("", {
      query,
      variables: { id: productId },
    });

    const variants = response.data.data.product.variants.edges;
    return variants.map((variant) => variant.node);
  } catch (error) {
    console.error("Error fetching variants:", error.message);
    throw error;
  }
};

export const fetchAllCollections = async () => {
  const query = `
    query {
      collections(first: 100) {
        edges {
          node {
            id
            title
            description
            handle
            updatedAt
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyClient.post("", { query });
    const collections = response.data.data.collections.edges.map(
      (edge) => edge.node
    );
    return collections;
  } catch (error) {
    console.error("Error fetching collections:", error.message);
    throw error;
  }
};

export const fetchCollectionByHandle = async (collectionHandle) => {
  const query = `
    query FetchCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        description
        handle
        updatedAt
        image {
          src
          altText
        }
      }
    }
  `;

  try {
    const response = await shopifyClient.post("", {
      query,
      variables: { handle: collectionHandle },
    });

    const collection = response.data.data.collection;
    if (!collection) {
      throw new Error(
        `Collection with handle "${collectionHandle}" not found.`
      );
    }
    return collection;
  } catch (error) {
    console.error("Error fetching collection:", error.message);
    throw error;
  }
};

export const fetchCollectionsWithProducts = async () => {
  const query = `
    query {
      collections(first: 100) {
        edges {
          node {
            id
            title
            description
            handle
            products(first: 1000) {
              edges {
                node {
                  id
                  title
                  description
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyClient.post("", { query });
    console.log("response : ",response)
    if (
      !response.data ||
      !response.data.data ||
      !response.data.data.collections
    ) {
      throw new Error("Collections data is not available.");
    }
    const collections = response.data.data.collections.edges.map((edge) => ({
      ...edge.node,
      products: edge.node.products.edges.map((productEdge) => productEdge.node),
    }));
    return collections;
  } catch (error) {
    console.error("Error fetching collections with products:", error.message);
    throw error;
  }
};

export const fetchCollectionsWithMetafields = async () => {
  const query = `
    query {
      collections(first: 100) {
        edges {
          node {
            id
            title
            handle
            metafields(identifiers: [
              { namespace: "custom", key: "collection_type" },
              { namespace: "custom", key: "theme" }
            ]) {
              namespace
              key
              value
              type
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyClient.post("", { query });
    const collections = response.data.data.collections.edges.map((edge) => ({
      ...edge.node,
      metafields: edge.node.metafields || [],
    }));
    return collections;
  } catch (error) {
    console.error("Error fetching collections with metafields:", error.message);
    throw error;
  }
};
