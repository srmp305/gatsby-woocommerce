import React from "react";
import { useQuery } from "@apollo/client";
import GET_CUSTOMER_ORDER from "../../../queries/get-customer-orders";
import { isEmpty } from "lodash";
import { getFormattedDate } from "../../../utils/functions";
import Link from "gatsby-link";

const Orders = ({ orders }) => {
  // const {
  //   user: { id },
  // } = authData;

  // // Get Cart Data.
  // const { data } = useQuery(GET_CUSTOMER_ORDER, {
  //   variables: {
  //     id: id,
  //   },
  // });

  // if (isEmpty(data)) {
  //   return null;
  // }

  // const {
  //   customer: { orders },
  // } = data;

  // console.warn( 'prder', orders );

  return (
    // <div className="">
    //   {!isEmpty(orders.edges)
    //     ? orders.edges.map((order) => {
    //         return (
    //           <div className="" key={order.node.orderId}>
    //             <div className="card-header">
    //               <h4>Order #{order.node.orderId}</h4>
    //               <time>Order Placed: {getFormattedDate(order.node.date)}</time>
    //               <div>Payment Method: {order.node.paymentMethodTitle}</div>
    //               <div>Order Status: {order.node.status}</div>
    //               <div>Total: {order.node.total}</div>
    //             </div>
    //             <div className="card-body">
    //               {order.node.lineItems.edges.map((item) => {
    //                 return (
    //                   <div className="order-item" key={item.node.product.id}>
    //                     <h5>{item.node.product.name}</h5>
    //                   </div>
    //                 );
    //               })}
    //             </div>
    //           </div>
    //         );
    //       })
    //     : (
    //     	<div className="p-3">
    //         <h4 className="mb-3">No orders found</h4>
    //         <Link to="/"><button className="btn-outline-dark" style={{ fontSize: '12px', padding: '8px 12px' }}>Shop now</button></Link>
    //       </div>
    //     )}
    // </div>

    <div className="my-orders">
      <h2>Orders</h2>
      <p>
        You can see your order status here...
      </p>

      <div className="cart-table">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.length ? (
              orders.map((el, i) => {
                return (
                  <tr>
                    <td>{el.id}</td>
                    <td>{getFormattedDate(el.date_created.date)}</td>
                    <td className={el.status}>
                      <span>{el.status}</span>
                    </td>
                    <td className="order-price">
                      {el.currency === "USD" ? "$" : el.currency} {el.total} <span>for {el.products && el.products.length} product{el.products && el.products.length > 1 ? "s" : ""}</span>
                    </td>
                    <td>
                      <Link to={`/order-details?orderId=${el.id}`} className="view-order-btn">
                        View order
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No orders
                </td>
              </tr>
            )}

            {/* <tr>
              <td>#OR2122GBP</td>
              <td>January 28, 2020</td>
              <td className="processing">
                <span>Processing</span>
              </td>
              <td className="order-price">
                $40.00 <span>for 2 items</span>
              </td>
              <td>
                <a href="#" className="view-order-btn">
                  View order
                </a>
              </td>
            </tr>

            <tr>
              <td>#OR2122GBP</td>
              <td>January 28, 2020</td>
              <td className="cancelled">
                <span>Cancelled</span>
              </td>
              <td className="order-price">
                $40.00 <span>for 2 items</span>
              </td>
              <td>
                <a href="#" className="view-order-btn">
                  View order
                </a>
              </td>
            </tr>

            <tr>
              <td>#OR2122GBP</td>
              <td>January 28, 2020</td>
              <td className="completed">
                <span>Completed</span>
              </td>
              <td className="order-price">
                $40.00 <span>for 2 items</span>
              </td>
              <td>
                <a href="#" className="view-order-btn">
                  View order
                </a>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
