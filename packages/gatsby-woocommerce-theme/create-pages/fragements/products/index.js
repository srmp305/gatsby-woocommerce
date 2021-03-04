const { ImageFragment } = require("../image/index.js");

const ProductsFragment = `
fragment ProductsFragment on WpProduct {
        id
        databaseId
        nodeType
        link
        shortDescription
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
          shortDescription
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
              stripePriceId
              stripeProductId
            }
            ... on WpVariablesubscriptionProduct {
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
              allvariations
            }
        ... on WpVariableProduct {
          id
          name
          shortDescription
          price
        }
        ... on WpExternalProduct {
          id
          name
          price
          shortDescription
          externalUrl
        }
        ... on WpGroupProduct {
          id
          name
          shortDescription
          products {
            nodes {
              ... on WpSimpleProduct {
                id
                name
                price
                shortDescription
              }
            }
          }
        }
      }
      ${ImageFragment}
`;

module.exports.ProductsFragment = ProductsFragment;
