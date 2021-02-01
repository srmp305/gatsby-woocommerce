import React from 'react';
import CheckoutCartItem from "../checkout-cart-item";

const Index = ( { cart, count } ) => {

	return (
		<>
			{ cart ? (
				<>

            <div className="cart-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Product details</th>
                          {/* <th>qty</th> */}
                          <th> </th>
                        </tr>
                      </thead>
                      <tbody>
   
				
								<CheckoutCartItem key={ cart.productId } item={ cart } count={count}/>
						

                       
                      </tbody>
                    </table>
                    <div className="checkout-subtotal">
                        <span>Subtotal</span>
                        <span>${ cart.price*count }</span>
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
                        <span>${ cart.price*count}</span>
                    </div>

              </div>

	
				</>
			) : '' }
		</>
	)
};

export default Index;
