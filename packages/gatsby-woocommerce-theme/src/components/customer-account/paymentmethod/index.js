import React from "react";
import Link from "gatsby-link";
import payment from "../../../images/PayPal.png";
import payment2 from "../../../images/payment2.png";
import payment3 from "../../../images/payment3.png";

const PaymentMethod = () => {
  return (
    <div className="payment-method-page">
      <div className="payment-method-header">
        <div className="payment-title">
          <h2>Payment Method</h2>
          <p>
            The following billing addresses will be used on the checkout page by
            default.
          </p>
        </div>
        <a href="#" className="add-payment-btn">
          Add New Payment Method
        </a>
      </div>

      <div className="payment-method-content">
        <div className="payment-method">
          <img src={payment} alt="" />
          <h2>Michele Angela</h2>
          <p>mi*****@gmail.com</p>
          <button className="delete-payment-btn">Delete</button>
          <button className="payment-btn">Edit</button>
        </div>

        <div className="payment-method">
          <img src={payment2} alt="" />
          <h2>***** ***** **** 42995</h2>
          <p>Mastercard</p>
          <button className="delete-payment-btn">Delete</button>
          <button className="payment-btn">Edit</button>
        </div>

        <div className="payment-method">
          <img src={payment3} alt="" />
          <h2>**** **** **** 5556</h2>
          <p>Visa</p>
          <button className="delete-payment-btn">Delete</button>
          <button className="payment-btn">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
