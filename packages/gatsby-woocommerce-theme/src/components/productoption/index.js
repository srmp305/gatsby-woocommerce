import React from "react";
import Link from "gatsby-link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import product1 from "../../images/product1.png";
import product2 from "../../images/product2.png";
import product3 from "../../images/product3.png";
import product4 from "../../images/product4.png";

const ProductOption = () => {
  return (
    <div className="product-option">
      <div className="option-include">
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
      </div>

      <div className="select-option">
        <h2>Select Options</h2>
        <form>
          <div className="form-group">
            <label>Choice #1 *</label>
            <select className="form-control">
              <option>Beef Empandas</option>
              <option>Chicken Empanda</option>
              <option>Spinach Emanadas</option>
              <option>Ham Croquetas</option>
              <option>Guava Pastries</option>
            </select>
          </div>
          <div className="form-group">
            <label>Choice #2 *</label>
            <select className="form-control">
              <option>Beef Empandas</option>
              <option>Chicken Empanda</option>
              <option>Spinach Emanadas</option>
              <option>Ham Croquetas</option>
              <option>Guava Pastries</option>
            </select>
          </div>
          <div className="form-group">
            <label>Choice #3 *</label>
            <select className="form-control">
              <option>Beef Empandas</option>
              <option>Chicken Empanda</option>
              <option>Spinach Emanadas</option>
              <option>Ham Croquetas</option>
              <option>Guava Pastries</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductOption;
