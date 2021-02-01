import React, { useContext,useState } from "react";
import "./style.scss";
import { AppContext } from "../../context/AppContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMutation, useQuery } from "@apollo/client";
import { v4 } from "uuid";
import { isEmpty } from "lodash";
import Link from "gatsby-link";
import closeicon from "../../../images/Delete.svg";
import closeimg from "../../../images/close-icon.png";
import { getFormattedCart, getUpdatedItems } from "../../../utils/functions";
import UPDATE_CART from "../../../mutations/update-cart";
import GET_CART from "../../../queries/get-cart";
const CartDropDown = ({ isDropdownOpen, setIsDropdownOpen }) => {
  const [cart, setCart] = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);

 // Get Cart Data.
  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // console.warn( 'completed GET_CART', data );

      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });
 
  // Update Cart Mutation.
  const [updateCart, { loading: updateCartProcessing }] = useMutation(
    UPDATE_CART,
    {
      onCompleted: () => {
        refetch();
      },
      onError: (error) => {
        if (error) {
          setRequestError(error.graphQLErrors[0].message);
        }
      },
    }
  );

 
  /*
   * Handle remove product click.
   *
   * @param {Object} event event
   * @param {Integer} Product Id.
   *
   * @return {void}
   */
  const handleRemoveProductClick = (event, cartKey, products) => {
    event.stopPropagation();
    if (products.length) {
      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems,
          },
        },
      });
    }
  };

  if (null === cart || !Object.keys(cart).length) {
    return null;
  }

  const productsCount = cart.totalProductsCount ? cart.totalProductsCount : "";
  const totalPrice = cart.totalProductsPrice ? cart.totalProductsPrice : "";

  const productImagePlaceholder = "https://via.placeholder.com/70";
  return (
    <div className={`shopping-cart ${isDropdownOpen ? "is-open" : ""}`}>
      <div
        className="cart-close-button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span>Cart</span>
        <img src={closeimg} alt="close" />
      </div>

      <ul className="shopping-cart-items">
        {cart?.products.map((product) => (
          <li className="clearfix" key={product.productId}>
            {!isEmpty(product.image) ? (
              <figure>
                <div className="cart-remove">
                  <img src={closeicon} alt="close"  onClick={ ( event ) => handleRemoveProductClick( event, product.cartKey, cart?.products ) }/>
                </div>
                <LazyLoadImage
                  alt={product.image.altText ? product.image.altText : ""}
                  src={product.image.sourceUrl} // use normal <img> attributes as props
                  effect="blur"
                  height="70"
                  width="70"
                />
              </figure>
            ) : !isEmpty(productImagePlaceholder) ? (
              <figure>
                <LazyLoadImage
                  alt="default"
                  height="70"
                  src={productImagePlaceholder}
                  width="70"
                  effect="blur"
                />
              </figure>
            ) : null}
            <span className="item-name">{product.name}</span>
            <span className="item-price">{product.totalPrice}</span>
            <span className="item-quantity">Quantity: {product.qty}</span>
          </li>
        ))}
      </ul>

      <div className="shopping-cart-header">
        <div className="cart-icon-wrp">
          {/* <Link to="/cart">
						{/* eslint-disable */}
          {/* <span className="cart-icon" role="img"><img src={cartimg} alt="cart" /></span>
						<span className="badge">{ productsCount }</span>
					</Link> */}
          <span>Total:</span>
        </div>
        <div className="shopping-cart-total">
          <span className="main-color-text">{totalPrice}</span>
        </div>
      </div>
      <Link to="/checkout" className="button">
        Checkout
      </Link>
    </div>
  );
};

export default CartDropDown;
