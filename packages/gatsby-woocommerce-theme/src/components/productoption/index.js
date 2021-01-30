import React from "react";
import Link from "gatsby-link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import product1 from "../../images/product1.png";
import product2 from "../../images/product2.png";
import product3 from "../../images/product3.png";
import product4 from "../../images/product4.png";

const ProductOption = ({ attributes, handleChangeVarients, variation }) => {
  return (
    <div className="product-option">
      {/* <div className="option-include">
        <h2>Related Products</h2>
        <ul>
          <li>
            HAM Croquetas <span>(14 pieces)</span>
          </li>
          <li>
            Chicken Empanda <span>(14 pieces)</span>
          </li>
          <li>
            Beef Empanada <span>(5 pieces)</span>{" "}
          </li>
          <li>
            Spinach Empanada <span>(5 pieces)</span>
          </li>
          <li>
            Guava Pastry <span>(5 pieces)</span>
          </li>
        </ul>
      </div> */}

      <div className="select-option">
        {/* <h2>Select Options</h2> */}
        <form>
          {attributes.map((el) => {
            return (
              <div className="form-group" key={el.id}>
                <label>{el.label}*</label>
                <select
                  className="form-control"
                  onChange={(event) => handleChangeVarients(event, el.name)}
                >
                  {variation && variation[el.name] ? null : (
                    <option>Select</option>
                  )}
                  {el.options.map((el) => {
                    return <option>{el}</option>;
                  })}
                </select>
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
};

export default ProductOption;
