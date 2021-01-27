import React from "react";
import Link from "gatsby-link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import product1 from "../../images/product1.png";
import product2 from "../../images/product2.png";
import product3 from "../../images/product3.png";
import product4 from "../../images/product4.png";
import { isEmpty } from "lodash";
import AddToCartButton from "../cart/add-to-cart-button";
import AddToWishList from "../wishlist/add-to-wishlist";
import FilteredRelatedProduct from "./filtered-related-product";
const productImagePlaceholder = "https://via.placeholder.com/434";
const RelatedProducts = ({ allProducts, categoriesData }) => {
  return (
    <div className="related-products">
      <h2>{categoriesData.length ? "Related" : `Some other`} Products</h2>
      <div className="product-container row">
        {/* <div className="col-lg-3 col-md-6 mb-5">
                    <Link to={"/"} className="product-image">
                        <figure>
                            <LazyLoadImage
                                alt="default"
                                height="450"
                                src={product1}
                                width="450"
                                effect="blur"
                            />
                        </figure>
                  
                    </Link>
                    <div className="card-body text-center">
                    <h3 className="card-header">Frozen Strawberry Daiquiry</h3>
                    <h6 className="card-subtitle">$79.00</h6>
                    <div>
                        <button className="btn-cart">
                            Add to cart
                        </button>
                        <p className="mt-2" style={{ color: "transparent" }}>
                            Adding to Cart...
                        </p>
                    </div>
                        <div className="wishlist-container">
                            <button className="wishlist-btn btn -mt-2">
                                <i className="heart-icon"><span className="heart"/></i>
                            </button>  
                        </div>
                    </div>
                </div> */}
        {!categoriesData.length ? (
          allProducts.map((product, i) => {
            const hasImagesSizes =
              !isEmpty(product.image) &&
              !isEmpty(product.image.mediaDetails.sizes);
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
                            alt={
                              product.image.altText ? product.image.altText : ""
                            }
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
        ) : (
          <>
            <FilteredRelatedProduct
              allProducts={allProducts}
              categoriesData={categoriesData}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
