import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import { v4 } from "uuid";
import axios from "axios";
import { server } from "../../../config/keys";
import { useMutation } from "@apollo/client";
import REFRESHAUTHTOKEN from "../../../mutations/token-refresh";
const AccountDetails = ({ authData, refreshUser }) => {
  const { user, authToken } = authData;
  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [userData, setUserData] = useState({ firstName: "", lastName: "" });
  const [
    refreshJwtAuthToken,
    { loading: refreshLoading, error: refreshError },
  ] = useMutation(REFRESHAUTHTOKEN, {
    variables: {
      input: {
        clientMutationId: v4(), // Generate a unique id.,
        jwtRefreshToken: authToken,
      },
    },
    onCompleted: (data) => {
      // If error.
      if (!isEmpty(refreshError)) {
        // setErrorMessage(refreshError.graphQLErrors[0].message);
      }
     
    },
    onError: (error) => {
    
      if (error) {
        if (!isEmpty(error)) {
          // setErrorMessage(error.graphQLErrors[0].message);
        }
      }
    },
  });
  const updateUser = async () => {
    const payload = {
      id: user.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
    };
    const res = await axios.post(
      `${server}/wp-json/edit/account/detail`,
      payload
    );
    if (res.status === 200) {
      setSuccessMessage("Data updated successfully...");
      const dt = authData;
      dt.user.firstName = userData.firstName;
      dt.user.lastName = userData.lastName;

      if ("undefined" !== typeof window) {
        localStorage.setItem("auth", JSON.stringify(dt));
        refreshUser();
      }
      // refreshJwtAuthToken();
    }
  
  };
  const handleChange = (e) => {
    setSuccessMessage("");
    setErrorMessage({ ...errorMessage, [e.target.name]: "" });
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.firstName.length < 2) {
      setErrorMessage({ ...errorMessage, ["firstName"]: "Firstname invalid" });
    } else if (userData.lastName.length < 2) {
      setErrorMessage({ ...errorMessage, ["lastName"]: "Lastname invalid" });
    } else {
      updateUser();
    }
  };
  useEffect(() => {
    setUserData({ firstName: user.firstName, lastName: user.lastName });
  }, []);
  if (isEmpty(authData)) {
    return null;
  }
  return (
    // <div className="card-body">
    //   {!isEmpty(user.firstName) ? (
    //     <p>
    //       First Name: <strong>{user.firstName}</strong>
    //     </p>
    //   ) : null}
    //   {!isEmpty(user.lastName) ? (
    //     <p>
    //       Last Name: <strong>{user.lastName}</strong>
    //     </p>
    //   ) : null}
    //   {!isEmpty(user.username) ? (
    //     <p>
    //       Username: <strong>{user.username}</strong>
    //     </p>
    //   ) : null}
    //   {!isEmpty(user.email) ? (
    //     <p>
    //       Email: <strong>{user.email}</strong>
    //     </p>
    //   ) : null}
    // </div>

    <div className="account-page">
      <h2>Account Details</h2>
    
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    

      <div className="account-tab row">
        {/* <Tabs defaultTab="account">
            <TabList>
              <Tab tabFor="account">User Account</Tab>
              <Tab tabFor="password">Change Password</Tab>
            </TabList>
            <TabPanel tabId="account"> */}
        <div className="account-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                placeholder="enter your first name"
                value={userData.firstName}
                className="form-control"
                onChange={handleChange}
                name="firstName"
              />
              {errorMessage.firstName && (
                <p style={{ color: "#ff0000" }}>{errorMessage.firstName}</p>
              )}
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                placeholder="enter your last name"
                value={userData.lastName}
                className="form-control"
              />
              {errorMessage.lastName && (
                <p style={{ color: "#ff0000" }}>{errorMessage.lastName}</p>
              )}
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                placeholder="enter your email"
                value={user.email}
                readOnly={true}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Username *</label>
              <input
                type="text"
                placeholder="enter your display name"
                value={user.username}
                readOnly={true}
                className="form-control"
              />
            </div>
            <div className="form-group full-w">
              <button className="save-changes">Save Changes</button>
            </div>
          </form>
        </div>
        {/* </TabPanel>

         <TabPanel tabId="password">
            <div className="account-form">
                    <form>
                        <div className="form-group">
                            <label>Old password *</label>
                            <input type="password" placeholder="Old password" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>New Password *</label>
                            <input type="password" placeholder="New Password" className="form-control" />
                        </div>
                        <div className="form-group full-w">
                            <label>Confirm Password  *</label>
                            <input type="password" placeholder="Confirm Password" className="form-control" />
                        </div>
                        <div className="form-group full-w">
                          <button className="save-changes">Save Changes</button>
                        </div>
                    </form>
                </div>
            </TabPanel>

          </Tabs> */}
      </div>
    </div>
  );
};

export default AccountDetails;
