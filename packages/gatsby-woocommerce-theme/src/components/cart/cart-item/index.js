import React, { useState } from 'react';
import { v4 } from "uuid";
import { getUpdatedItems } from "../../../utils/functions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import cartSpinnerGif from '../../../images/cart-spinner.gif';
import './style.scss';
import isEmpty from "validator/es/lib/isEmpty";
import cartclose from "../../../images/close.png";
const CartItem = ( {
	                   item,
	                   products,
	                   updateCartProcessing,
	                   handleRemoveProductClick,
	                   updateCart,
                   } ) => {

	const [productCount, setProductCount] = useState( item.qty );

	/*
	 * When user changes the qty from product input update the cart in localStorage
	 * Also update the cart in global context
	 *
	 * @param {Object} event event
	 *
	 * @return {void}
	 */
	const handleQtyChange = ( event, cartKey, type ) => {

		if ( process.browser ) {

			event.stopPropagation();
			let newQty;

			// If the previous update cart mutation request is still processing, then return.
			if ( updateCartProcessing || ( 'decrement' === type && 1 === productCount ) ) {
				return;
			}

			if ( !isEmpty( type ) ) {
				newQty = 'increment' === type ? productCount + 1 : productCount - 1;
			} else {
				// If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
				newQty = ( event.target.value ) ? parseInt( event.target.value ) : 1;
			}

			// Set the new qty in state.
			setProductCount( newQty );

			if ( products.length ) {

				const updatedItems = getUpdatedItems( products, newQty, cartKey );

				updateCart( {
					variables: {
						input: {
							clientMutationId: v4(),
							items: updatedItems
						}
					},
				} );
			}

		}
	};

	return (
		<tr>
			<td>
				<div className="cart-product">
				<button onClick={ ( event ) => handleRemoveProductClick( event, item.cartKey, products ) } className="close-btn"><img src={cartclose} alt="" /></button>
				<div className="cart-product-img">
					<LazyLoadImage
						alt={item.image.title}
						src={! isEmpty( item.image.sourceUrl ) ? item.image.sourceUrl : ''} // use normal <img> attributes as props
						effect="blur"
					/>
				</div>
				<div className="cart-product-detail">
					<h4>{ item.name }</h4>
					<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
				</div>
				</div>
			</td>
			<td>
			<div className="increament-input">
				<button className="decriment-btn" onClick={( event ) => handleQtyChange( event, item.cartKey, 'decrement' )}><i className="fa fa-minus"></i></button>
				<input
				type="number"
				min="1"
				data-cart-key={ item.cartKey }
				className={ `woo-next-cart-qty-input form-control ${ updateCartProcessing ? 'woo-next-cart-disabled' : '' } ` }
				value={ productCount }
				onChange={ ( event ) => handleQtyChange( event, item.cartKey, '' ) }
			/>
				<button className="increament-btn" onClick={( event ) => handleQtyChange( event, item.cartKey, 'increment' )}><i className="fa fa-plus"></i></button>
				{ updateCartProcessing ?
			<img className="woo-next-cart-item-spinner" src={ cartSpinnerGif } alt="spinner"/> : '' }
			</div>
			</td>
			<td>{ ( 'string' !== typeof item.price ) ? item.price.toFixed( 2 ) : item.price }</td>
			<td>{( 'string' !== typeof item.totalPrice ) ? item.totalPrice.toFixed( 2 ) : item.totalPrice }</td>
		</tr>

	)
};

export default CartItem;
