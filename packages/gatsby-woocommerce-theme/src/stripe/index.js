import React from "react";
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import { server } from "../config/keys";
import axios from "axios";
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
    };
  }
  onToken = (token) => {
    this.setState({ loader: true });

    const payload = {
      amount: this.props.amount * 100,
      stripeToken: token.id,
      description: "Order payment",
      billing_details: {
        address: {
          city: token.card.address_city,
          country: token.card.address_country,
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          postal_code: token.card.address_zip,
          state: null,
        },
        email: token.email,
        name: this.props.input.firstName,
        phone: this.props.input.phone,
      },
      currency: "USD",
      customer: this.props.useremail,
    };
    axios
      .post(`${server}/wp-json/create/stripe/pay`, payload)
      .then((data) => {
        this.props.sendPaymentResponse(data);
        this.setState({ loader: false });
      })
      .catch((error) => {
        this.props.sendPaymentResponse(false);
        this.setState({ loader: false });
      });
    // console.log(token,'token')
  };
  onClosed = (onclosed) => {};

  render() {
    return (
      <>
        {this.state.loader && (
          <div className="ty-yrs">
            <div className="yse-87">Please wait...</div>
          </div>
        )}
        <StripeCheckout
          stripeKey={process.env.GATSBY_STRIPE_PUBLISHABLE_KEY}
          name="Sergio's Marketplace" // the pop-in header title
          description="Order payment" // the pop-in header subtitle
          image="https://admin.sergiosmarketplace.com/wp-content/uploads/2020/12/cropped-home-sergio-logo.png" // the pop-in header image (default none)
          ComponentClass="div"
          panelLabel="Pay" // prepended to the amount in the bottom pay button
          amount={this.props.amount} // cents
          token={this.onToken}
          currency="USD"
          closed={this.onClosed}
          // onOpen={this.onOpen}
        >
          <button className="place-order">
            PAY ${this.props.amount / 100}
          </button>
        </StripeCheckout>
      </>
    );
  }
}
