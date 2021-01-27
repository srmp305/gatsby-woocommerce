import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import Login from "../../components/login";
import Register from "../../components/register";
import { isUserLoggedIn, logOut } from "../../utils/functions";
import { isEmpty } from "lodash";
import "./style.scss";
import loginimg from "../../images/login-img.png";
import CustomerAccount from "../../components/customer-account";

const MyAccount = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState("login");
  useEffect(() => {
    const auth = isUserLoggedIn();

    if (!isEmpty(auth)) {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  const handleLogout = () => {
    logOut();
    setLoggedIn(false);
  };

  return (
    <Layout>
      {loggedIn ? (
        <div className="my-account-page">
          <CustomerAccount handleLogout={handleLogout} />
        </div>
      ) : (
        <div className="account-details">
          <div className="login-page">
            <div className="login-content">
              {userType === "login" && (
                <Login setLoggedIn={setLoggedIn} setUserType={setUserType} />
              )}
              {userType === "register" && (
                <Register setLoggedIn={setLoggedIn} setUserType={setUserType} />
              )}

              <div className="right-block">
                <div className="login-bg">
                  <img src={loginimg} alt="login" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MyAccount;
