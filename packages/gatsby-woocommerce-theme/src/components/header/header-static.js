import React from "react";
import Link from "gatsby-link";

/**
 * Internal dependencies.
 */
import Nav from "./nav";
import "./style.scss";
import defaultSiteLogoUrl from "../../images/sergio-logo-default.svg";
import CartIcon from "../cart/cart-icon";
import WishListIcon from "../wishlist/wishlist-icon";
import user from "../../images/user-outline.svg";

const Header = ({ data }) => {
  const {
    headerMenuItems,
  } = data;
 // const siteLogoURL = siteLogoUrl ? siteLogoUrl : defaultSiteLogoUrl;


  
  return (
    <div className="header-wrapper">

        <div className="header-section">

          <div className="container">

              <div className="row">

                <div className="col-md-5">
                  <div className="main-menu">
                      <Nav headerMenuItems={headerMenuItems} />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="main-logo">
                    <Link to="/">
                        <img
                          className="logo-img"
                          //src={siteLogoURL}
                          src={defaultSiteLogoUrl}
                          alt="logo"
                        />
                    </Link>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="cart-icon-wrap">
                    <WishListIcon/>
                    <div className="user-account">
                    <Link to="/my-account/"> <img src={user} alt="" /></Link>
                       
                        {/* <ul className="user-account-menu">
                            <li><Link to="/my-account/">Login</Link></li>
                            <li><Link to="/my-account/">Register</Link></li>
                        </ul> */}
                    </div>
                    <CartIcon/> 
                    <Link className="get-started" to="/">Get Started</Link>                   
                  </div>
                </div>

              </div>

          </div>

        </div>

    </div>
    
  );
};

/**
 *  Exporting Just the footer as well without static query for storybook,
 *  as static query does not work in storybook
 */
export { Header };





