import React, { useState, useEffect } from "react";
import "./style.scss";
import Dashboard from "./dashboard";
import Orders from "./orders";
import { isUserLoggedIn } from "../../utils/functions";
import Logout from "./logout";
import Addresses from "./addresses";
import AccountDetails from "./account-details";
import user from "../../images/img-profile.png";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import dashboard from "../../images/dashboard-icon.png";
import order from "../../images/order-icon.png";
import track from "../../images/track-icon.png";
import payment from "../../images/payment-icon.png";
import address from "../../images/address-icon.png";
import account from "../../images/account-icon.png";
import logout from "../../images/logout-icon.png";
import TrackOrders from "./trackorder";
import PaymentMethod from "./paymentmethod";
import { isEmpty } from "lodash";
import { userInstance } from "../../config/axios.js";
import axios from "axios";

// const tabItems = [
//   {
//     id: 1,
//     title: "Dashboard",
//     icon: "tabitem__icon tab-dashboard",
//     content: <Dashboard authData={auth} />,
//   },
//   {
//     id: 2,
//     title: "Orders",
//     icon: "tabitem__icon tab-users",
//     content: <Orders authData={auth} />,
//   },
//   {
//     id: 3,
//     title: "Addresses",
//     icon: "tabitem__icon tab-addresses",
//     content: <Addresses authData={auth} />,
//   },
//   {
//     id: 4,
//     title: "Account Details",
//     icon: "tabitem__icon tab-account-details",
//     content: <AccountDetails authData={auth} />,
//   },
//   {
//     id: 5,
//     title: "Logout",
//     icon: "tabitem__icon tab-logout",
// 	content: "",
//   },
// ];

// const TabItemComponent = ({
//   icon = "",
//   title = "",
//   onItemClicked = () => console.error("You passed no action to the component"),
//   isActive = false,
// }) => {
//   return (
//   	<div className={isActive ? "tabitem" : "tabitem tabitem--inactive"}>
// 	    <button
// 		    onClick={onItemClicked}
// 		    style={{ width: '100%' }}
// 	    >
// 		    <i className={icon} />
// 		    <p className="tabitem__title">{title}</p>
// 	    </button>
//     </div>
//   );
// };

const CustomerAccount = ({ handleLogout }) => {
  const [auth, setAuth] = useState(isUserLoggedIn());
  const [orders, setOrders] = useState([]);
  const [billing, setBilling] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = auth;
  const getOrders = async () => {
    setLoading(true);
    const payload = { customerdata: { id: "" } };
    const res = await userInstance.post("/wp-json/get/customer/order", payload);
    if (res.status === 200) {
      const ty = res.data.filter((el) => el.billing.email === user.email);
     
      if (ty.length) {
        setOrders(ty);
      }

      setLoading(false);
    }
  };
  const refreshUser = () => {
    setAuth(isUserLoggedIn());
  };
  const getBillingInfo = async () => {
    // setLoading(true);
    const res = await userInstance.get(
      `/wp-json/get/billing/details/?email=${user.email}`
    );

    if (res.status === 200) {
      setBilling(res.data);
      // setLoading(false);
    }
  };
  useEffect(() => {
    getOrders();
    getBillingInfo();
  }, []);

  return (
    <div className="my-account-wrapper">
      <div className="my-account-header">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="user-info">
                <h3>My Account</h3>
                <h5>
                  {" "}
                  {!isEmpty(user.firstName) || !isEmpty(user.lastName) ? (
                    <>
                      Welcome Back{" "}
                      <strong>
                        {user.firstName} {user.lastName}!
                      </strong>
                    </>
                  ) : (
                    <>
                      Welcome Back <strong>{user.username}!</strong>
                    </>
                  )}
                </h5>
                <p>
                  From your account dashboard you can view your recent orders,
                  manage your shipping and billing addresses, and edit your
                  password and account details.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="user-info">
                <img src={user} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-account-content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Tabs defaultTab="vertical-tab-one" vertical>
                <TabList>
                  <Tab tabFor="vertical-tab-one">
                    <img src={dashboard} alt="" /> Dashboard
                  </Tab>
                  <Tab tabFor="vertical-tab-two">
                    <img src={order} alt="" /> Orders
                  </Tab>

                  <Tab tabFor="vertical-tab-three">
                    <img src={address} alt="" />
                    Billing Information
                  </Tab>
                  <Tab tabFor="vertical-tab-four">
                    <img src={account} alt="" /> Account Details
                  </Tab>
                  <button className="rwt__tab " onClick={handleLogout}>
                    <img src={logout} alt="" /> Logout
                  </button>
                </TabList>
                <TabPanel tabId="vertical-tab-one">
                  <Dashboard
                    authData={auth}
                    orders={orders}
                    loading={loading}
                    billing={billing}
                  >
                    <Addresses
                      authData={auth}
                      billing={billing}
                      getBillingInfo={getBillingInfo}
                    />
                  </Dashboard>
                </TabPanel>
                <TabPanel tabId="vertical-tab-two">
                  <Orders orders={orders} />
                </TabPanel>

                <TabPanel tabId="vertical-tab-three">
                  <Addresses
                    title={true}
                    authData={auth}
                    billing={billing}
                    getBillingInfo={getBillingInfo}
                  />
                </TabPanel>
                <TabPanel tabId="vertical-tab-four">
                  <AccountDetails authData={auth} refreshUser={refreshUser} />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAccount;
