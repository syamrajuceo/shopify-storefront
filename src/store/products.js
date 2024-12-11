import { shopifyClient } from "../config/shopifyClient";
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
              vendor
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
            }
          }
        }
      }
    `;

  try {
    const response = await shopifyClient.post("", { query });
    // console.log("response: " + JSON.stringify(response));
    const products = response.data.data.products.edges.map((edge) => edge.node);

    // console.log("Fetched products: ", products);

    // Store products in Zustand
    useShopifyStore.getState().setProducts(products);

    return products;
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
    return variants.map(variant => variant.node);
  } catch (error) {
    console.error("Error fetching variants:", error.message);
    throw error;
  }
};

