import React from "react";
import Link from "gatsby-link";

const TrackOrders = () => {
  return (
    <div className="track-orders">
      <h2>Track My Order</h2>
      <p>
        To track your order please enter your Order ID in the box below and
        press the "Track" button. This was given to you on your receipt and in
        the confirmation email you should have received.
      </p>

      <div className="track-content">
        <form>
          <div className="form-group">
            <label>Order ID</label>
            <input
              type="text"
              placeholder="enter your order id"
              className="form-control"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrackOrders;
