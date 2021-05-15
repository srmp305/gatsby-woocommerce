import React, {useEffect, useRef} from "react";
import featurebg from "../../../images/featurebg.png";
import lottie from "lottie-web";

const HomeFeature = ({ data }) => {

  const featured1 = useRef(null);
  const featured2 = useRef(null);
  const featured3 = useRef(null);
  const featured4 = useRef(null);

  useEffect(()=>{
    lottie.loadAnimation({
      container: featured1.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../../images/locally.json')
    })
  }, []);
    useEffect(()=>{
    lottie.loadAnimation({
      container: featured2.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../../images/trusted.json')
    })
  }, []);

    useEffect(()=>{
    lottie.loadAnimation({
      container: featured3.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../../images/miami.json')
    })
  }, []);
    useEffect(()=>{
    lottie.loadAnimation({
      container: featured4.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../../images/weekly.json')
    })
  }, []);
  return (
    <div className="feature-home">
      <img className="feature-graphic" src={featurebg} alt="" />
      <div className="container">
        <div className="feature-content">
          <div className="feature-box">
            <div className="featured1" ref={featured1}></div>
            <h2>{data.featuredHeadingFirst}</h2>
            <p>{data.featuredDescriptionFirst}</p>
          </div>

          <div className="feature-box">
            <div className="featured2" ref={featured2}></div>
            <h2>{data.featuredHeadingSecond}</h2>
            <p>{data.featuredDescriptionSecond}</p>
          </div>
          <div className="feature-box">
            <div className="featured3" ref={featured3}></div>
            <h2>{data.featuredHeadingThird}</h2>
            <p>{data.featuredDescriptionThird}</p>
          </div>
          <div className="feature-box">
            <div className="featured4" ref={featured4}></div>
            <h2>{data.featuredHeadingFourth}</h2>
            <p>{data.featuredDescriptionFourth}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFeature;
