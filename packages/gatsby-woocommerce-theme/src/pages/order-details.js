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
      <div className="my-account-content order-detail-page">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              {!loading ? (
                <div className="latest-order">
                  <h2>Order Detail</h2>
                  <p>
                    Order ID : <span>{order.number}</span>
                  </p>
                  <p>
                    Order Date :{" "}
                    <span>{getFormattedDate(order.date_created.date)}</span>
                  </p>
                  <p>
                    Payment mode : <span>{order.payment_method_title}</span>
                  </p>
                  <p>
                    Tax amount : <span>{order.total_tax}</span>
                  </p>
                  <p>
                    Order total : <span>{order.total}</span>
                  </p>
                  <p>
                    Order status : <span>{order.status}</span>
                  </p>
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
                </div>
              ) : (
                <div>Please wait ...</div>
              )}
            </div>

            {!loading && (
              <div className="col-md-4">
                <div className="latest-order billing-info">
                  <h2>Billing Information</h2>
                  <h5>
                    {order.billing.first_name} {order.billing.last_name}
                  </h5>
                  <p>Phone: {order.billing.phone}</p>
                  <p>Email: {order.billing.email}</p>
                  <p>Company: {order.billing.company}</p>
                  <p>
                    Address: {order.billing.address_1},{" "}
                    {order.billing.address_2}, {order.billing.city},{" "}
                    {order.billing.state}, {order.billing.country},{" "}
                    {order.billing.postcode}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default OrderDetails;
