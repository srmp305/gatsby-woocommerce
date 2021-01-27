import React, { useState, useRef } from "react";
import Layout from "../components/layout";
import phone from "../images/phone-icon.svg";
import email from "../images/mail-icon.svg";
import { emailRegex } from "../config/keys.js";
import { userInstance } from "../config/axios.js";
import { graphql, StaticQuery } from "gatsby";
import axios from "axios";
const Contact = ({ data }) => {
  const {
    wpPage: { wpContactQuery },
  } = data;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const formFieldRefName = useRef(null);
  const formFieldRefEmail = useRef(null);
  const formFieldRefMessage = useRef(null);
  const [formDataError, setFormDataError] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    if (success) {
      setSuccess(false);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormDataError({ ...formDataError, [e.target.name]: false });
  };

  const { name, email, message } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      formFieldRefName.current.focus();
      setFormDataError({ ...formDataError, name: true });
    } else if (!emailRegex.test(email)) {
      formFieldRefEmail.current.focus();
      setFormDataError({ ...formDataError, email: true });
    } else if (message === "") {
      formFieldRefMessage.current.focus();
      setFormDataError({ ...formDataError, message: true });
    } else {
      const request = await userInstance.post("/wp-json/form/v1/submit", {
        gatsbyinput: {
          name,
          email,
          address: message,
        },
      });
      if (request.status === 200) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    }
  };
  return (
    <Layout>
      <div className="contact-page">
        <div className="container">
          <div className="contact-page-content">
            <div className="row">
              <div className="col-md-5">
                <div className="contact-info">
                  <h2>{wpContactQuery.contactHeading}</h2>
                  <p>{wpContactQuery.contactDescription} </p>
                  <ul>
                    <li>
                      <img src={phone} alt="" />{" "}
                      {wpContactQuery.mobileNumberText}
                    </li>
                    <li>
                      <img src={email} alt="" /> {wpContactQuery.emailText}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-7">
                <div className="contact-form">
                  {success && (
                    <div className="success">
                      Details submitted successfully.
                    </div>
                  )}
                  <form onSubmit={onSubmit}>
                    <div className="form-group">
                      <label>{wpContactQuery.nameLabel} *</label>
                      <input
                        ref={formFieldRefName}
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        placeholder={wpContactQuery.namePlaceholderText}
                        className="form-control"
                      />
                      {formDataError.name && (
                        <div className="error">Name cannot be blank.</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>{wpContactQuery.emailLabel} *</label>
                      <input
                        ref={formFieldRefEmail}
                        type="email"
                        value={email}
                        name="email"
                        onChange={handleChange}
                        placeholder={wpContactQuery.emailPlaceholderText}
                        className="form-control"
                      />
                      {formDataError.email && (
                        <div className="error">Email not valid.</div>
                      )}
                    </div>
                    <div className="form-group full-w">
                      <label>{wpContactQuery.messageLabel} *</label>
                      <textarea
                        name="message"
                        ref={formFieldRefMessage}
                        value={message}
                        onChange={handleChange}
                        placeholder={wpContactQuery.messagePlaceholderText}
                        className="form-control"
                      ></textarea>
                      {formDataError.message && (
                        <div className="error">Message cannot be blank.</div>
                      )}
                    </div>
                    <div className="form-group full-w">
                      <button className="send-btn" type="submit">
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default () => {
  return (
    <StaticQuery
      query={graphql`
        query wpContactPageQuery {
          wpPage(uri: { eq: "/contacts/" }) {
            id
            wpContactQuery {
              addressFooter
              contactDescription
              contactHeading
              contactTitleFooter
              emailLabel
              emailPlaceholderText
              emailText
              fieldGroupName
              instagramTitleFooter
              locationTitleFooter
              messageLabel
              messagePlaceholderText
              mobileNumberText
              nameLabel
              namePlaceholderText
              phoneNumberFooter
              phoneTitleFooter
            }
          }
        }
      `}
      render={(data) => (data ? <Contact data={data} /> : null)}
    />
  );
};
