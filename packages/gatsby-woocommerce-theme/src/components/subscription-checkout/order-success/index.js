import React from "react";

const OrderSuccess = (props) => {
  const { response } = props;

  if (!response) {
    return null;
  }

 

  // window.location.href = responseData.redirect;

  return (
    <div className="container">
     
        <div>
          <h2>{response} </h2>
         
        </div>
     
    </div>
  );
};

export default OrderSuccess;
