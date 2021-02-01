import React from "react";
const CheckoutCartItem = ({ item,count }) => {
  return (
    <tr key={item.productId}>
      <td>
        <div className="cart-product">
          <div className="cart-product-img">
            <img
              src={item.image.sourceUrl}
              srcSet={item.image.srcSet}
              alt={item.image.title}
            />
          </div>
          <div className="cart-product-detail">
            <h4>{item.name}</h4>
            <p style={{margin:0}}>Billing cycle: {item.billingcycle}</p>
             <p style={{whiteSpace:'nowrap'}}>Billing period: {item.billingperiod ? item.billingperiod + "ly" : ''}</p>
          </div>
        </div>
      </td>
      {/* <td>2</td> */}
      <td style={{textAlign:'right'}}>${item.price} x {count}</td>
    </tr>
  );  
};

export default CheckoutCartItem;
