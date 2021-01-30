const { ImageFragment } = require("../image/index.js");

const ProductsFragment = `
fragment ProductsFragment on WpProduct {
        id
        databaseId
        nodeType
        link
        description
           attributes {
          nodes {
            id
            label
            name
            options
            position
            variation
            visible
          }
        }
        galleryImages {
          nodes {
            id
            title
            altText
            mediaItemUrl
          }
        }
        image {
		  ...ImageFragment
		}
        productCategories {
          nodes {
            id
            name
          }
        }
        ... on WpSimpleProduct {
          id
          name
          price
        }
           ... on WpSubscriptionProduct {
              id
              name
              price
              trailstart
              trialend
              subscription_length
              status
              sku
              salePrice
              regularPrice
              description
              billingcycle
              billingperiod
            }
        ... on WpVariableProduct {
          id
          name
          price
        }
        ... on WpExternalProduct {
          id
          name
          price
          externalUrl
        }
        ... on WpGroupProduct {
          id
          name
          products {
            nodes {
              ... on WpSimpleProduct {
                id
                name
                price
              }
            }
          }
        }
      }
      ${ImageFragment}
`;

module.exports.ProductsFragment = ProductsFragment;
