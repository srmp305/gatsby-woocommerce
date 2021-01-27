import React, { useState } from "react";
import Link from "gatsby-link";
import leftimg from "../../../images/home-img-left.png";
import rightimg from "../../../images/home-img-right.png";
import { emailRegex } from "../../../config/keys.js";
import { userInstance } from "../../../config/axios.js";
import axios from "axios";
const Subscribe = ({data}) => {
  const [formData, setFormData] = useState({ email: "" });
  const [formDataError, setFormDataError] = useState({ email: false });
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    if (success) {
      setSuccess(false);
    }
    setFormData({ [e.target.name]: e.target.value });
    setFormDataError({ [e.target.name]: false });
  };

  const { email } = formData;

  const onSubmit = async () => {
    if (!emailRegex.test(email)) {
      setFormDataError({ email: true });
    } else {
      const request = await userInstance.post("/wp-json/form/v1/subscribe", {
        gatsbyinput: {
          email,
        },
      });
      if (request.status === 200) {
        setSuccess(true);
        setFormData({ email: "" });
      }

     
    }
  };
  return (
    <div className="subscribe">
      <div className="subscribe-bg">
        <div className="container">
          <div className="subscribe-content">
            <h2>{data.subscribeHeading}</h2>
            <p>
             {data.subscribeDescription}
            </p>
          </div>
          <div className="subscribe-form">
            <input
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              className="form-control"
              placeholder={data.subscribeInputPlaceholderText}
            />
            <button onClick={onSubmit}>{data.subscribeButtonText}</button>
            {formDataError.email && (
              <div className="error">Please provide valid email</div>
            )}
            {success && <div className="success">Thank you!</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
