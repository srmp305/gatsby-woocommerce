import React from "react";
import { isEmpty } from "lodash";
import "./style.scss";
import ClientSearch from "../client-search";
import "../../../images/search-background.png";

const Search = (props) => {
  const {
    products,
    initialProducts,
    categories,
    category,
    engine,
    searchdisable,
    classes,
  } = props;

  const placeholderText = "Search food...";

  return !isEmpty(props.products) ? (
    <div className="search-section py-5">
      {/* Search */}
      <ClientSearch
        classes={classes}
        searchdisable={searchdisable}
        data={props.data}
        products={products}
        initialProducts={initialProducts}
        categories={categories}
        category={category}
        engine={engine}
        placeholder={placeholderText}
      />
    </div>
  ) : (
    ""
  );
};

export default Search;
