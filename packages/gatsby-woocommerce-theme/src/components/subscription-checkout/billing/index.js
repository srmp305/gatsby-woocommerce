import React,{useEffect} from "react";
import countryList from "./../country-list";
import Error from "./../error";
import { isUserLoggedIn } from "../../../utils/functions";
import { isEmpty } from "lodash";
import CreateAccount from "../create-account";
import { navigate } from "gatsby";
const Billing = ({ input, handleOnChange, handleBillingAutoFill, billing }) => {
  const auth = isUserLoggedIn();
  const handleBilling = (e) => {
    handleBillingAutoFill(e.target.checked);
  };
useEffect(()=>{
    if (!auth) {
    navigate("/my-account");
  }
},[])
  return (
    <React.Fragment>
      <h3>Billing Details</h3>
      {billing && billing.billing_first_name && (
        <div style={{ width: "100%" }}>
          <label>
            <input type="checkbox" onChange={handleBilling} /> Use default
            billing information
          </label>
        </div>
      )}
      <div className="form-group">
        <label>First Name *</label>
        <input
          className="form-control"
          type="text"
          placeholder="enter your first name"
          onChange={handleOnChange}
          value={input.firstName}
          name="firstName"
          id="first-name"
        />
        <Error errors={input.errors} fieldName={"firstName"} />
      </div>

      <div className="form-group">
        <label>Last Name *</label>
        <input
          className="form-control"
          type="text"
          placeholder="enter your last name"
          onChange={handleOnChange}
          value={input.lastName}
          name="lastName"
          id="last-name"
        />
        <Error errors={input.errors} fieldName={"lastName"} />
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          className="form-control"
          type="email"
          placeholder="enter your email"
          onChange={handleOnChange}
          value={input.email}
          name="email"
          id="email"
        />
        <Error errors={input.errors} fieldName={"email"} />
      </div>

      <div className="form-group">
        <label>Phone Number *</label>
        <input
          className="form-control"
          type="text"
          placeholder="enter your phone number"
          onChange={handleOnChange}
          value={input.phone}
          name="phone"
          id="phone"
        />
        <Error errors={input.errors} fieldName={"phone"} />
      </div>

      <div className="form-group full-w">
        <label>Company Name</label>
        <input
          className="form-control"
          type="text"
          placeholder="enter company name"
          onChange={handleOnChange}
          value={input.company}
          name="company"
          id="company-name"
        />
        <Error errors={input.errors} fieldName={"company"} />
      </div>

      <h3>Shipping Informations</h3>

      <div className="form-group full-w">
        <label>Country / Region *</label>
        <select
          onChange={handleOnChange}
          value={input.country}
          name="country"
          className="form-control"
          id="country-select"
        >
          <option value="">Select a country...</option>
          {countryList.length &&
            countryList.map((country, index) => (
              <option key={`${country}-${index}`} value={country.countryCode}>
                {country.countryName}
              </option>
            ))}
        </select>
        <Error errors={input.errors} fieldName={"country"} />
      </div>

      <div className="form-group full-w">
        <label>Street Address *</label>
        <input
          className="form-control"
          type="text"
          placeholder="house number and street name"
          onChange={handleOnChange}
          value={input.address1}
          name="address1"
          id="street-address"
        />
        <Error errors={input.errors} fieldName={"address1"} />
      </div>

      <div className="form-group full-w">
        <label>Apartement, suite, unit, etc. (optional)</label>
        <input
          className="form-control"
          type="text"
          placeholder="house number and street name"
          onChange={handleOnChange}
          value={input.address2}
          name="address2"
          id="address-2"
        />
      </div>

      <div className="form-group half-w">
        <label>Town / City *</label>
        <input
          className="form-control"
          type="text"
          placeholder="enter city"
          onChange={handleOnChange}
          value={input.city}
          name="city"
          id="city"
        />
        <Error errors={input.errors} fieldName={"city"} />
      </div>

      <div className="form-group half-w">
        <label>State *</label>
        <input
          onChange={handleOnChange}
          value={input.state}
          type="text"
          name="state"
          className="form-control"
          id="state"
        />
        <Error errors={input.errors} fieldName={"state"} />
      </div>

      <div className="form-group half-w">
        <label>ZIP *</label>
        <input
          className="form-control"
          type="text"
          placeholder="enter your zip code"
          onChange={handleOnChange}
          value={input.postcode}
          name="postcode"
          id="post-code"
        />
        <Error errors={input.errors} fieldName={"postcode"} />
      </div>

      {/* {isEmpty(auth) ? (
        <CreateAccount handleOnChange={handleOnChange} input={input} />
      ) : null} */}

      {/* <h3>Additional Informations</h3>

      <div className="form-group full-w">
        <label>Order Note (optional)</label>
        <textarea
          onChange={handleOnChange}
          defaultValue={input.customerNote}
          placeholder="enter your messages"
          name="customerNote"
          className="form-control"
          id="order-notes"
        />
        <Error errors={input.errors} fieldName={"customerNote"} />
      </div> */}
    </React.Fragment>
  );
};

export default Billing;
