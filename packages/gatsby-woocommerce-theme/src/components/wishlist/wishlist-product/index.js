import React from "react";
import Link from "gatsby-link";
import AddToCartButton from "../../cart/add-to-cart-button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { isEmpty } from "lodash";
import { removeWishListProduct } from "../../../utils/functions";

const productImagePlaceholder = "https://via.placeholder.com/434";

const WishlistProduct = (props) => {

	const { product/* , setWishList, wishlistData */ } = props;
	
	const imgSrcUrl = product?.image?.sourceUrl ? product.image.sourceUrl : '';

	const handleRemoveFromWishList = (id) => {
		const arr=JSON.parse(localStorage.getItem('arr'))
		for (let [key, value] of Object.entries(arr)) {
			// console.log(key, value);
			if(arr[key].productId==id)
			removeWishListProduct(arr[key].itemId)
		}
		// debugger
		// removeProductFromWishList(product.productId, wishlistData, setWishList)
	}
	
	return (
		// @TODO Need to handle Group products differently.
		product.map(p => {
			// debugger
			return (
				!isEmpty(p.node) && "GroupProduct" !== p.node.type ? (
					<div className="col-lg-4 col-md-6 mb-5">
						<Link to={p.node.link} className="product-image">
							{!isEmpty(p.node.image) ? (
								<figure>
									<LazyLoadImage
										alt={p.node.image.altText ? p.node.image.altText : ""}
										src={p.node?.image?.sourceUrl ? p.node.image.sourceUrl : ''} // use normal <img> attributes as props
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
							<h3 className="card-header">{p.node.name ? p.node.name : ""}</h3>
							<h6 className="card-subtitle">{p.node.price}</h6>
							{'EXTERNAL' !== p.node.type ? <AddToCartButton product={p.node} /> : (
								<div className="mb-5">
									<a href={p.node.externalUrl} target="_blank" rel="noreferrer nofollow">
										<button className="btn btn-outline-dark">Buy Now</button>
									</a>
								</div>
							)}
							<div className="mb-2" style={{ marginTop: '-10px' }}>
								<button onClick={()=>{handleRemoveFromWishList(p.node.databaseId)} }className="btn btn-outline-dark">Remove from wishlist</button>
							</div>
						</div>
					</div>
				) : null
			)
		}));
};

export default WishlistProduct;
