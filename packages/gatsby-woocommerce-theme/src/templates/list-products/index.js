/**
 * External dependencies.
 */
import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Product from "../../components/product";
/**
 * Internal dependencies.
 */

/**
 * This is default Component Export.
 *
 * @return {*}
 */
export default () => {
  return (
    <StaticQuery
      query={graphql`
        query allWpProductQuery {
          products: allWpProduct(limit: 1000) {
            edges {
              node {
                id
                databaseId
                nodeType
                link
                description
                galleryImages {
                  nodes {
                    id
                    title
                    altText
                    mediaItemUrl
                  }
                }
                image {
                  id
                  altText
                  caption
                  sourceUrl
                  mediaDetails {
                    sizes {
                      height
                      width
                      name
                      sourceUrl
                    }
                  }
                }
                productCategories {
                  nodes {
                    id
                    name
                  }
                }
              
                seo {
                  canonical
                  title
                  metaDesc
                  focuskw
                  metaRobotsNoindex
                  metaRobotsNofollow
                  opengraphAuthor
                  opengraphDescription
                  opengraphTitle
                  opengraphDescription
                  opengraphImage {
                    sourceUrl
                  }
                  opengraphUrl
                  opengraphSiteName
                  opengraphPublishedTime
                  opengraphModifiedTime
                  twitterTitle
                  twitterDescription
                  twitterImage {
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      `}
      render={(data) =>
        data ? (
          <>
            <div className="product-container row">
              {data.products.edges.map((product) => (
                <Product
                  key={product.node.id}
                  product={product.node}
                  classes="col-lg-4 col-md-6 mb-5"
                />
              ))}
            </div>
          </>
        ) : null
      }
    />
  );
};
