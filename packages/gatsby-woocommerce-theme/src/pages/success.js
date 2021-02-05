import React from "react"
import Layout from "../components/layout";
import success from "../images/success-icon.svg";
const PaymentSuccessPage = ()=>{
    
    return(
         <Layout>
        <div className="message-content">
          <div className="messagae-box">
                <img src={success} alt="" />
                <h2>Payment Completed</h2>
                <p>Thank you your payment has been completed.</p>
          </div>
          </div>
         </Layout>
    )
}

export default PaymentSuccessPage