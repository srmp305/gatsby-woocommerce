import React from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

const origin = 'undefined' !== typeof window ? window.location.origin : '';
const StripeSubscribeBtn=({orderId,priceId,quantity,amount,payload,variation,productId})=>{
  const handleClick = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        // Replace with the ID of your price
        {price: priceId, quantity: quantity}
      ],
      
      ...payload,
      mode: 'subscription',
      successUrl: `${origin}/success?pid=${productId}&attr1=${variation.attr1}&attr2=${variation.attr2}`,
      cancelUrl: `${origin}/cancel`,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };
  return (
    <button role="link" onClick={handleClick} className="place-order">
    {console.log(payload,'payload',variation)}
      Pay ${amount} to Subscribe
    </button>
  );
}
export default StripeSubscribeBtn