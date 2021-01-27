import React from 'react';
import CheckoutCartItem from "../checkout-cart-item";

const Index = ( { cart } ) => {

	return (
		<>
			{ cart ? (
				<>

            <div className="cart-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          {/* <th>qty</th> */}
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
   
					  { cart.products.length && (
							cart.products.map( item => (
								<CheckoutCartItem key={ item.productId } item={ item } />
							) )
						) }

                       
                      </tbody>
                    </table>
                    <div className="checkout-subtotal">
                        <span>Subtotal</span>
                        <span>{ cart.totalProductsPrice }</span>
                    </div>

                     <div className="checkout-shipping">
                       <h4>Shipping</h4>
                       <div className="shipping-list">
                        {/* <input type="radio" name="free" checked={true}/> */}
                         <div className="shipping-details">
                            <h6>Shipping charges</h6>
                            <p>Giving information on its origins, as well as a random Lipsum generator</p>
                          </div>
                          <div className="shipping-price">
                             <h5>$0.00</h5>
                          </div>
                       </div>
                       {/* <div className="shipping-list">
                        <input type="radio" name="free" />
                         <div className="shipping-details">
                            <h6>Other Shipping Method</h6>
                          </div>
                       </div> */}
                    </div> 


                    <div className="checkout-total">
                        <span>Total</span>
                        <span>{ cart.totalProductsPrice }</span>
                    </div>

              </div>

	
				</>
			) : '' }
		</>
	)
};

export default Index;
