import React, { useState, useContext, useEffect } from "react";
import Billing from "../billing";
import YourOrder from "../your-order";
import PaymentModes from "../payment-mode";
import { AppContext } from "../../context/AppContext";
import validateAndSanitizeCheckoutForm from "../../../validator/checkout";
import { useMutation, useQuery } from "@apollo/client";
import { getFormattedCart, createCheckoutData } from "../../../utils/functions";
import OrderSuccess from "../order-success";
import GET_CART from "../../../queries/get-cart";
import CHECKOUT_MUTATION from "../../../mutations/checkout";
import CheckoutError from "../checkout-error";
import { userInstance } from "../../../config/axios.js";
import axios from "axios";
import { isUserLoggedIn } from "../../../utils/functions";
import { server } from "../../../config/keys";
import StripeCheckout from "../../../stripe";
const auth = isUserLoggedIn();
const CheckoutForm = ({ product, count, variation }) => {
  const initialState = {
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
    createAccount: false,
    username: "",
    password: "",
    customerNote: "",
    paymentMethod: "",
    isPaid: false,
    errors: null,
    transactionId: null,
  };

  // Use this for testing purposes, so you dont have to fill the checkout form over an over again.
  // const initialState = {
  //   firstName: "Imran",
  //   lastName: "Sayed",
  //   address1: "109 Hills Road Valley",
  //   address2: "Station Road",
  //   city: "Pune",
  //   state: "Maharastra",
  //   country: "IN",
  //   postcode: "400298",
  //   phone: "9959338989",
  //   email: "codeytek.academy@gmail.com",
  //   company: "Tech",
  //   createAccount: false,
  // username: '',
  // password: '',
  // customerNote: "My Order notes",
  //   paymentMethod: "cod",
  //   errors: null,
  // };

  const [cart, setCart] = useState(getFormattedCart(product));
  const [validated, setValidated] = useState(false);
  const [billing, setBilling] = useState(null);
  const [input, setInput] = useState(initialState);
  const [orderData, setOrderData] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(null);
  const [checkoutResponse, setCheckoutResponse] = useState(null);
  const getBillingInfo = async () => {
    // setLoading(true);
    if (auth && auth.user) {
      const res = await userInstance.get(
        `/wp-json/get/billing/details/?email=${auth.user.email}`
      );
      if (res.status === 200) {
        setBilling(res.data);
        // setLoading(false);
      }
    }
  };

  const handleBillingAutoFill = (tt) => {
    if (tt) {
      const dt = {
        firstName: billing.billing_first_name,
        lastName: billing.billing_last_name,
        company: billing.billing_company,
        country: billing.billing_country,
        address1: billing.billing_address_1,
        address2: billing.billing_address_2,
        city: billing.billing_city,
        state: billing.billing_state,
        createAccount: false,
        postcode: billing.billing_postcode,
        phone: billing.billing_phone,
        email: billing.billing_email,
        username: "",
        password: "",
        customerNote: "",
        paymentMethod: "",
        isPaid: false,
        errors: null,
        transactionId: null,
      };
      setInput(dt);
    } else {
      const dt = {
        firstName: "",
        lastName: "",
        company: "",
        country: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postcode: "",
        phone: "",
        email: "",
        createAccount: false,
        username: "",
        password: "",
        customerNote: "",
        paymentMethod: "",
        isPaid: false,
        errors: null,
        transactionId: null,
      };
      setInput(dt);
    }
  };
  // Get Cart Data.
  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // console.warn( 'completed GET_CART' );

      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));
      // Update cart data in React Context.
      // setCart(updatedCart);
    },
  });

  // Checkout or CreateOrder Mutation.
  // const [
  //   checkout,
  //   { data: checkoutResponse, loading: checkoutLoading },
  // ] = useMutation(CHECKOUT_MUTATION, {
  //   variables: {
  //     input: orderData,
  //   },
  //   onCompleted: () => {
  //     // console.warn( 'completed CHECKOUT_MUTATION' );
  //     refetch();
  //   },
  //   onError: (error) => {
  //     if (error) {
  //       setRequestError(error.graphQLErrors[0].message);
  //     }
  //   },
  // });

  /*
   * Handle form submit.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const submitOrderFinal = async (isPaid, transactionId) => {
    setCheckoutLoading(true);
    const payload = {
      product_id: product.databaseId,
      attributes: variation,
      quantity: count,
      email: input.email,
      first_name: input.firstName,
      last_name: input.lastName,
      user_email: auth ? auth.user.email : null,
      billing_address_1: input.address1,
      billing_address_2: input.address2,
      billing_city: input.city,
      billing_postcode: input.postcode,
      billing_country: input.country,
      billing_state: input.state,
    };
    const res = await axios.post(
      `${server}/wp-json/create/order/subscription`,
      payload
    );
    if (data) {
      setCheckoutLoading(false);
      setCheckoutResponse("Subscribed successfully..");
    } else {
      setCheckoutLoading(false);
      setCheckoutResponse("Something went wrong. Please try again later.");
    }
    console.log("000", res);
    // setOrderData(checkOutData);
    setRequestError(null);
  };
  const getPaymentResponse = (payment) => {
    if (payment && payment.data.status === "succeeded") {
      submitOrderFinal(true, payment.data.balance_transaction);
    } else {
      submitOrderFinal(false, "00000000");
    }
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const result = validateAndSanitizeCheckoutForm(input);
    if (!result.isValid) {
      setInput({ ...input, errors: result.errors });
      return;
    }
    if (input.paymentMethod === "cod") {
      submitOrderFinal(false, `cod_${new Date().getTime()}`);
    } else {
      setValidated(true);
    }
  };

  /*
   * Handle onchange input.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleOnChange = (event) => {
    setValidated(false);
    if ("createAccount" === event.target.name) {
      const newState = { ...input, [event.target.name]: !input.createAccount };
      setInput(newState);
    } else {
      const newState = { ...input, [event.target.name]: event.target.value };
      setInput(newState);
    }
  };
  useEffect(() => {
    getBillingInfo();
  }, []);
  // useEffect(() => {
  //   if (null !== orderData) {
  //     // Call the checkout mutation when the value for orderData changes/updates.
  //     /* eslint-disable */
  //     checkout();
  //   }
  // }, [orderData]);
  const getCartTotal = (product) => {
    if (product) {
      return parseInt(product.price * count * 100);
    } else {
      return false;
    }
  };

  return (
    <>
      {console.log(product, "getFormattedCart(product)")}
      {!checkoutResponse ? (
        <form onSubmit={handleFormSubmit} className="woo-next-checkout-form">
          <div className="row">
            <div className="col-md-12">
              <h2>Subscription checkout</h2>
            </div>

            <div className="col-md-8">
              <div className="checkout-form">
                <Billing
                  billing={billing}
                  input={input}
                  handleOnChange={handleOnChange}
                  handleBillingAutoFill={handleBillingAutoFill}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="checkout-sidebar">
                {/*Payment*/}
                <h3>Your subscription</h3>

                <YourOrder cart={product} count={count} />
                {!validated && (
                  <PaymentModes input={input} handleOnChange={handleOnChange} />
                )}

                <div className="payment-btn-info">
                  <p>
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our privacy policy.
                  </p>

                  {!validated && (
                    <button className="place-order" type="submit">
                      Place Order
                    </button>
                  )}

                  {input.paymentMethod === "stripe" &&
                    getCartTotal(product) &&
                    validated && (
                      <StripeCheckout
                        input={input}
                        useremail={auth ? auth.user.email : null}
                        sendPaymentResponse={getPaymentResponse}
                        amount={getCartTotal(product)}
                      />
                    )}
                </div>
                {/* Checkout Loading*/}
                {checkoutLoading && <p>Processing Order...</p>}
                {requestError && <CheckoutError requestError={requestError} />}
              </div>
            </div>
          </div>
        </form>
      ) : (
        ""
      )}

      {/*Show message if Order Success*/}
      <OrderSuccess response={checkoutResponse} />
    </>
  );
};

export default CheckoutForm;
