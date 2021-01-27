import React from "react";
import Layout from "../components/layout";
import CheckoutForm from "../components/checkout/checkout-form";
import cartproduct1 from "../images/cartproduct1.png";
import cartproduct2 from "../images/cartproduct2.png";


const Checkout = () => (
  <Layout>
    <div className="checkout-page">
      <div className="container">      
        <CheckoutForm />

        {/* <div className="row">
 
          <div className="col-md-4">

            <div className="checkout-sidebar">

              <div className="payment-method">
                <h3>Payment Method</h3>
                <div className="payment-list">
                    <ul>
                      <li><input type="radio" name="payment" /> Direct Bank Transfer</li>
                      <li><input type="radio" name="payment" /> PAY WITH PAYPAL</li>
                      <li><input type="radio" name="payment" /> CREDIT CARD (STRIPE)</li>
                    </ul>
                </div>
                <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
              
                <button className="place-order">Place Order</button>
              
              </div>

            </div>

          </div>

        </div>  */}

      </div>
    </div>
  </Layout>
);

export default Checkout;
