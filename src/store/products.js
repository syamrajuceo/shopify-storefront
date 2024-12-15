import { shopifyClient } from "../config/shopifyClient";
import Metacontroller from "../utils/Metacontroller";
import useShopifyStore from "./useShopifyStore";

export const fetchAllProducts = async () => {
  const query = `
      query {
        products(first: 10) {
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
              variants(first: 10) {
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
              images(first: 10) {
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
      const metafields = product.metafields? product.metafields
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
