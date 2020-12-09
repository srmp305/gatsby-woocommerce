import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import Login from "../../components/login";
import Register from "../../components/register";
import { isUserLoggedIn, logOut } from "../../utils/functions";
import { isEmpty } from 'lodash';
import "./style.scss";
import CustomerAccount from "../../components/customer-account";

const MyAccount = () => {
  const [loggedIn, setLoggedIn] = useState(false);

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
      {!loggedIn ? (
        <div className="my-account-page">
            <CustomerAccount handleLogout={handleLogout} />
        </div>
      ) : (
        <div className="account-details">
          <div className="container">
            <div className="row">
                 <div className="col-md-12">
                    <Login setLoggedIn={setLoggedIn} />
                    <Register setLoggedIn={setLoggedIn} />
                  </div>
              </div>
            </div>
        </div>
      )}
    </Layout>
  );
};

export default MyAccount;
