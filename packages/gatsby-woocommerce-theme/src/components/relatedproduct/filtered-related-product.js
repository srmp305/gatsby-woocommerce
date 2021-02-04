import React from "react";
import AddToCartButton from "../cart/add-to-cart-button";
import AddToWishList from "../wishlist/add-to-wishlist";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { isEmpty } from "lodash";
import Link from "gatsby-link";
const productImagePlaceholder = "https://via.placeholder.com/434";
const FilteredRelatedProduct = ({ allProducts, categoriesData }) => {
  const data = [];
  categoriesData.forEach((element) => {
    const t = allProducts.filter(
      (el) =>
        el.categoriesData.length &&
        el.categoriesData.filter((ell) => ell === element).length
    );
    t.forEach((el) => data.push(el));
  });
  return (
    <>
      {allProducts.map((product, i) => {
        const hasImagesSizes =
          !isEmpty(product.image) && !isEmpty(product.image.mediaDetails.sizes);
        const imgSrcUrl = hasImagesSizes
          ? product.image.mediaDetails.sizes[3].sourceUrl
          : "";
        const imgWidth = hasImagesSizes
          ? product.image.mediaDetails.sizes[3].width
          : 320;
        const imgHeight = hasImagesSizes
          ? product.image.mediaDetails.sizes[3].height
          : 320;
        return (
          <>
            {!isEmpty(product) &&
            "GroupProduct" !== product.nodeType &&
            i < 4 ? (
              <div className="col-lg-3 col-md-6 mb-5">
                <Link to={product.link} className="product-image">
                  {!isEmpty(product.image) ? (
                    <figure>
                      <LazyLoadImage
                        alt={product.image.altText ? product.image.altText : ""}
                        height={imgHeight}
                        src={imgSrcUrl}
                        width={imgWidth}
                        effect="blur"
                      />
                    </figure>
                  ) : !isEmpty(productImagePlaceholder) ? (
                    <figure>
                      <LazyLoadImage
                        alt="default"
                        height="450"
                        src={productImagePlaceholder}
                        width="450"
                        effect="blur"
                      />
                    </figure>
                  ) : null}
                </Link>
                <div className="card-body text-center">
                  <h3 className="card-header">
                    {product.name ? product.name : ""}
                  </h3>
                  <h6 className="card-subtitle">{product.price}</h6>
                  <AddToCartButton product={product} />
                  <AddToWishList product={product} />
                </div>
              </div>
            ) : null}
          </>
        );
      })
      }
    </>
  );
};
export default FilteredRelatedProduct;
