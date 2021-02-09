import React from "react"
import Layout from "../components/layout";
import close from "../images/close-icon.svg";
const CancelSuccessPage = ()=>{
    return(
        <Layout>
        <div className="message-content">
          <div className="messagae-box">
                <img src={close} alt="" />
                <h2>Payment Cancelled</h2>
                <p>Please try again try again later.</p>
          </div>
          </div>
          
        </Layout>
    )
}

export default CancelSuccessPage