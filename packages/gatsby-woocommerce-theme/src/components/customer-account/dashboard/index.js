import React, { useState } from "react";
import { isEmpty } from "lodash";
import order1 from "../../../images/order-latest.png";
import payment from "../../../images/PayPal.png";
import Link from "gatsby-link";
const Dashboard = ({ authData, orders, loading, billing, children }) => {
  const [showall, setShowall] = useState(false);
  if (isEmpty(authData)) {
    return null;
  }

  const { user } = authData;

  return (
    <>
      {/* <div className="card-body">
      <div className="">
        {!isEmpty(user.firstName) || !isEmpty(user.lastName) ? (
          <p>
            Hello{" "}
            <strong>
              {user.firstName} {user.lastName}!
            </strong>
          </p>
        ) : (
          <p>
            Hello <strong>{user.username}!</strong>
          </p>
        )}
        <section>
          From your account dashboard you can view your recent orders, manage
          your shipping and billing addresses
        </section>
      </div>
    </div> */}

      <div className="dashboard">
        <h2>Dashboard</h2>

        <div className="dashboard-content">
          <div className="row">
            <div className="col-md-6">
              <div className="latest-order">
                <h3>Latest Order</h3>
                {orders.length ? (
                  <>
                    {orders.map((el, i) => {
                      if (!showall) {
                        if (i < 5) {
                          return (
                            <div className="latet-order-list">
                              <div className="latest-order-detail">
                                <img
                                  src={el.products && el.products[0].image_url}
                                  alt=""
                                />
                                <div className="latest-order-info">
                                  <h4>
                                    {el.products && el.products[0].item_name}
                                  </h4>
                                  <span>
                                    {el.products && el.products[0].quantity} X{" "}
                                    {el.products && el.products[0].item_name}{" "}
                                  </span>
                                  <Link to={`/order-details?orderId=${el.id}`}>
                                    ..order details
                                  </Link>
                                </div>
                              </div>

                              <div className="latest-order-price">
                                <h5>
                                  {el.currency === "USD" ? "$" : el.currency}{" "}
                                  {el.total}
                                </h5>
                              </div>
                            </div>
                          );
                        }
                      } else {
                        return (
                          <div className="latet-order-list">
                            <div className="latest-order-detail">
                              <img
                                src={el.products && el.products[0].image_url}
                                alt=""
                              />
                              <div className="latest-order-info">
                                <h4>
                                  {el.products && el.products[0].item_name}
                                </h4>
                                <span>
                                  {el.products && el.products[0].quantity} X{" "}
                                  {el.products && el.products[0].item_name}{" "}
                                </span>
                                <Link to={`/order-details?orderId=${el.id}`}>
                                  ..order details
                                </Link>
                              </div>
                            </div>

                            <div className="latest-order-price">
                              <h5>
                                {el.currency === "USD" ? "$" : el.currency}{" "}
                                {el.total}
                              </h5>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </>
                ) : (
                  <>
                    {loading ? (
                      <div>Loading please wait...</div>
                    ) : (
                      <div>No orders found</div>
                    )}
                  </>
                )}

                {!showall ? (
                  <>
                    {orders.length ? (
                      <button
                        onClick={() => setShowall(true)}
                        className="view-all-order"
                      >
                        View All Order
                      </button>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => setShowall(false)}
                    className="view-all-order"
                  >
                    View Latest Order
                  </button>
                )}
              </div>
            </div>

            <div className="col-md-6">
              {billing && <div className="address-account">{children}</div>}

              {/* <div className="address-account">
                <span>Detault Shipping Adddress</span>
                <h2>Michele Angela</h2>
                <h4>312-567-8866</h4>
                <p>4473 Happy Hollow Road, Garland, North Carolina 28441</p>
                <button className="addtess-btn">Change</button>
              </div>

              <div className="payment-method">
                <span>Default Payment Method</span>
                <img src={payment} alt="" />
                <h2>Michele Angela</h2>
                <p>mi*****@gmail.com</p>
                <button className="payment-btn">Change</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
