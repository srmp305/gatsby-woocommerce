import React from "react";
import Link from "gatsby-link";
import leftimg from "../../../images/home-img-left.png";
import rightimg from "../../../images/home-img-right.png";
import rightimgmbl from "../../../images/home-img-right-mbl.png";

const HomeBanner = ({data}) => {


  return (
    <div className="home-banner">
      
        <div className="banner-bg">

            <div className="left-graphic">
              <img src={leftimg} alt="" />
            </div>
           

            <div className="banner-content">
                <h2>{data.mainBannerHeading}</h2>
                <a href="">{data.mainBannerButtonText}</a>
            </div>

            <div className="right-graphic">
                <img src={rightimg} alt="" />
            </div>
            
            <img className="right-graphic-mbl" src={rightimgmbl} alt="" />
        </div>   
     
    </div>
  );
};

export default HomeBanner;
