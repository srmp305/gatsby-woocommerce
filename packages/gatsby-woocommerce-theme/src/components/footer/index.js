/**
 * External dependencies.
 */
import React from "react";
import { graphql, StaticQuery } from "gatsby";

/**
 * Internal dependencies.
 */
import "./style.scss";
import { Footer } from "./footer-static";

/**
 * This is default Component Export.
 *
 * @return {*}
 */
export default () => {
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
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
          wp {
            getFooter {
              sidebarOne
            }
          }
          footerMenuItems: allWpMenuItem(
            filter: { locations: { eq: HCMS_MENU_FOOTER } }
          ) {
            edges {
              node {
                id
                databaseId
                title
                url
                label
              }
            }
          }
        }
      `}
      render={(data) => (data ? <Footer data={data} /> : null)}
    />
  );
};
