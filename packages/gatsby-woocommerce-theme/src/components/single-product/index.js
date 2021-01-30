import React, { useState } from "react";
import AddToCartButton from "../cart/add-to-cart-button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { isEmpty } from "lodash";
import SocialShareCard from "../social-share-card";
import ProductCarousel from "../product-carousel";
import { sanitize } from "../../utils/functions";
import WishListIcon from "../wishlist/wishlist-icon";
import RelatedProducts from "../relatedproduct";
import ProductOption from "../productoption";

const productImagePlaceholder = "https://via.placeholder.com/434";

const SingleProduct = (props) => {
  const allProductsExcept = props.allProducts.filter(
    (el) => el.id !== props.product.id
  );
  const { product } = props;
  const [count, setCount] = useState(1);
  const [variation, setVariation] = useState(null);
  const hasImagesSizes =
    !isEmpty(product.image) && !isEmpty(product.image.mediaDetails.sizes);
  const imgSrcUrl = hasImagesSizes ? product.image.sourceUrl : "";

  const displayProductImages = () => {
    if (!isEmpty(product.galleryImages.nodes)) {
      return <ProductCarousel galleryImages={product.galleryImages} />;
    } else if (!isEmpty(product.image)) {
      return (
        <figure>
          <LazyLoadImage
            alt={product.image.altText ? product.image.altText : ""}
            src={imgSrcUrl} // use normal <img> attributes as props
            effect="blur"
          />
        </figure>
      );
    } else if (!isEmpty(productImagePlaceholder)) {
      return (
        <figure>
          <LazyLoadImage
            alt="default"
            height="450"
            src={productImagePlaceholder}
            width="450"
            effect="blur"
          />
        </figure>
      );
    } else {
      return null;
    }
  };
  const getVariationLength = (el) => {
    if (el) {
      var size = 0,
        key;
      for (key in el) {
        if (el.hasOwnProperty(key)) size++;
      }
      return size;
    } else {
      return 0;
    }
  };
  const handleChangeVarients = (event, name) => {
    setVariation({ ...variation, [name]: event.target.value });
  };
  return (
    // @TODO Need to handle Group products differently.
    !isEmpty(product) && "GroupProduct" !== product.nodeType ? (
      <div className="single-product-page">
        {console.log(product, "product")}
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-6 mb-5 product-image-wrap">
              <div className="product-image">{displayProductImages()}</div>
              <SocialShareCard
                title={product.name}
                sectionTitle="Share this product"
                link={product.uri}
              />
            </div>
            <div className="col-lg-7 col-md-6 mb-5">
              <div className="single-product-desc">
                <h3>{product.name ? product.name : ""}</h3>
                <h6 className="card-subtitle mb-3">{product.price}</h6>

                {!isEmpty(product.description) ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: sanitize(product.description),
                    }}
                  />
                ) : null}

                {product.attributes && (
                  <ProductOption
                    attributes={product.attributes.nodes}
                    handleChangeVarients={handleChangeVarients}
                    variation={variation}
                  />
                )}

                <div className="single-product-add-to-cart">
                  <div className="increament-input">
                    <button
                      className="decriment-btn"
                      onClick={() => setCount(count - 1)}
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                    <input type="number" value={count} />
                    <button
                      className="increament-btn"
                      onClick={() => setCount(count + 1)}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                  {console.log(variation, "variation")}
                  {product.attributes ? (
                    product.attributes.nodes.length ===
                      getVariationLength(variation) && (
                      <AddToCartButton product={product} variation={variation}/>
                    )
                  ) : (
                    <AddToCartButton product={product} />
                  )}

                  <WishListIcon />
                </div>
              </div>
            </div>
          </div>

          <RelatedProducts
            allProducts={allProductsExcept}
            categoriesData={product.categoriesData}
          />
        </div>
      </div>
    ) : null
  );
};

export default SingleProduct;
