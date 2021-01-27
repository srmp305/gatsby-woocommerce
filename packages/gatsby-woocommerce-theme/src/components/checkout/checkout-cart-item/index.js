import React from 'react';
const CheckoutCartItem = ( { item } ) => {

	return (
		<tr key={ item.productId }>
		<td>
		  <div className="cart-product">
			<div className="cart-product-img">
			<img src={ item.image.sourceUrl } srcSet={ item.image.srcSet } alt={item.image.title}/>
			</div>
			<div className="cart-product-detail">
			  <h4>{ item.name }</h4>                                      
			</div>
		  </div>
		</td>
		{/* <td>2</td> */}
		<td>{ item.totalPrice }</td>
	  </tr>

		
	)
};

export default CheckoutCartItem;
