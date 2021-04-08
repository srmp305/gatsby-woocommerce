import Link from 'gatsby-link';
import { normalizePath, sanitize } from '../../utils/functions';

import address from '../../images/addressicon.svg';
import phone from '../../images/phoneicon.svg';
import fb from '../../images/facebook.svg';
import twitter from '../../images/twitter.svg';
import insta from '../../images/instagram.svg';
// import InstaFeed from '../instafeed/instafeed';

import React from 'react';

export const FooterLayout = ({ data }) => {
  const {
    wp: {
      getFooter: { sidebarOne },
    },
    footerMenuItems,
    wpPage: { wpContactQuery },
  } = data;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          {sidebarOne ? (
            <div className="footer-box footer-one">
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitize(sidebarOne),
                }}
                className="footer__sidebar-one"
              />

              <div className="social-icon">
                <ul>
                  <li>
                    <a href="">
                      <img src={fb} alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img src={twitter} alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img src={insta} alt="" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : null}

          {footerMenuItems.edges.length ? (
            <div className="footer-box footer-two">
              <h2>Explore</h2>
              <ul>
                {footerMenuItems.edges.map((menu) => (
                  <li key={menu.node.databaseId}>
                    <Link className="header-nav__menu-link" to={menu.node.url}>
                      <i className="fa fa-angle-right"></i> {menu.node.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ''
          )}

          <div className="footer-box footer-three">
            <h2>{wpContactQuery.contactTitleFooter}</h2>

            <div className="address-box">
              <img src={address} alt="" />
              <h4>{wpContactQuery.locationTitleFooter}</h4>
              <p>{wpContactQuery.addressFooter}</p>
            </div>

            <div className="address-box">
              <img src={phone} alt="" />
              <h4>{wpContactQuery.phoneTitleFooter}</h4>
              <p>{wpContactQuery.phoneNumberFooter}</p>
            </div>
          </div>

          <div className="footer-box footer-four">
            <h2>{wpContactQuery.instagramTitleFooter}</h2>

            <div className="insta-post">
              {/* <InstaFeed /> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 *  Exporting Just the footer as well without static query for storybook,
 *  as static query does not work in storybook
 */
// export { FooterLayout };
