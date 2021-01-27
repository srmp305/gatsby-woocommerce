import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { server } from "../config/keys";
import axios from "axios";
import { getFormattedDate } from "../utils/functions";
import Link from "gatsby-link";
const OrderDetails = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const getOrder = async (id) => {
    setLoading(true);
    const res = await axios.get(`${server}/wp-json/get/order/${id}`);
    if (res.status === 200) {
      setOrder(res.data[0]);
      setLoading(false);
    }
  };
  useEffect(() => {
    const orderId = "undefined" !== typeof window ? window.location.search : "";
    if (orderId.split("=")[1].length) {
      const id = orderId.split("=")[1];
      getOrder(id);
    }
  }, []);
  return (
    <Layout>    
      <div className="container">
        <div className="col-md-6">
          {!loading ? (
            <div className="latest-order">
              <h3>Order ID : {order.number}</h3>
              <h3>Order Date : {getFormattedDate(order.date_created.date)}</h3>
              <h3>Payment mode : {order.payment_method_title}</h3>
              <h3>Tax amount : {order.total_tax}</h3>
              <h3>Order total : {order.total}</h3>
              <h3>Order status : {order.status}</h3>
              {order.products.map((el, i) => {
                return (
                  <div className="latet-order-list">
                    <div className="latest-order-detail">
                      <img src={el.image_url} alt="" />
                      <div className="latest-order-info">
                        <h4>{el.item_name}</h4>
                        <span>
                          {el.quantity} X {el.item_name}{" "}
                        </span>
                      </div>
                    </div>

                    <div className="latest-order-price">
                      <h5>$ {el.product_price}</h5>
                    </div>
                  </div>
                );
              })}

              <h2>Billing Information</h2>
              <h3>
                {order.billing.first_name} {order.billing.last_name}
              </h3>
              <h3>{order.billing.phone}</h3>
              <h3>{order.billing.email}</h3>
              <h3>{order.billing.address_1}</h3>
              <h3>{order.billing.address_2}</h3>
              <h3>{order.billing.company}</h3>
              <h3>{order.billing.city}</h3>
              <h3>{order.billing.state}</h3>
              <h3>{order.billing.country}</h3>
              <h3>{order.billing.postcode}</h3>
            </div>
          ) : (
            <div>Please wait ...</div>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default OrderDetails;
