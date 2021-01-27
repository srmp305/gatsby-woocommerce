import React from "react";
import Link from "gatsby-link";
import featurebg from "../../../images/featurebg.png";
import featureicon1 from "../../../images/featureicon1.png";
import featureicon2 from "../../../images/featureicon2.png";
import featureicon3 from "../../../images/featureicon3.png";
import featureicon4 from "../../../images/featureicon4.png";

const HomeFeature = ({ data }) => {
  return (
    <div className="feature-home">
      <img className="feature-graphic" src={featurebg} alt="" />
      <div className="container">
        <div className="feature-content">
          <div className="feature-box">
            {data.featuredIconFirst && (
              <img src={data.featuredIconFirst.sourceUrl} alt="" />
            )}
            <h2>{data.featuredHeadingFirst}</h2>
            <p>{data.featuredDescriptionFirst}</p>
          </div>

          <div className="feature-box">
            {data.featuredIconSecond && (
              <img src={data.featuredIconSecond.sourceUrl} alt="" />
            )}
            <h2>{data.featuredHeadingSecond}</h2>
            <p>{data.featuredDescriptionSecond}</p>
          </div>
          <div className="feature-box">
            {data.featuredIconThird && (
              <img
                src={data.featuredIconThird && data.featuredIconThird.sourceUrl}
                alt=""
              />
            )}
            <h2>{data.featuredHeadingThird}</h2>
            <p>{data.featuredDescriptionThird}</p>
          </div>
          <div className="feature-box">
            {data.featuredIconFourth && (
              <img src={data.featuredIconFourth.sourceUrl} alt="" />
            )}
            <h2>{data.featuredHeadingFourth}</h2>
            <p>{data.featuredDescriptionFourth}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFeature;
