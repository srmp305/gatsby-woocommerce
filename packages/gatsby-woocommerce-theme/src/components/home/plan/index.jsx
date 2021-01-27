import React from "react";
import Link from "gatsby-link";
import oval from "../../../images/plan-oval.png";
import food from "../../../images/plan-food.png";
import planbgmbl from "../../../images/planbg-mbl.png";

const HomePlan = ({data}) => {


  return (
    <div className="plan-home">
        <div className="convenient">
           {data.middleInfoImage && <img className="planbgmbl" src={planbgmbl} alt="" />}
              <div className="plan-box">                
                <div className="plan-heading">{data.middleInfoHeading}</div>
                <div className="plan-text ">
                  {data.middleInfoDescription}
                </div>
                <a href="">{data.middleInfoButtonText}</a>
              </div>
              <div className="overlap-plan">
                <img className="oval-plan" alt="" src={oval}/>
               {data.middleInfoImage &&  <img className="plan-food" alt="" src={data.middleInfoImage.sourceUrl}/>}
              </div>
            </div> 
    </div>
  );
};

export default HomePlan;
