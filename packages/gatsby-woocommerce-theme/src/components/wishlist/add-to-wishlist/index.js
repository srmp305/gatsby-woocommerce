import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { addToWishList, isProductInWishList } from "../../../utils/functions";
import Link from "gatsby-link";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import "./style.scss";

export const WooCommerceWishlist = new WooCommerceRestApi({
  url: "https://admin.sergiosmarketplace.com/",
  consumerKey: "ck_1ffa458f741c39832479533965140e3f53ab9da9",
  consumerSecret: "cs_bf0f9d779e2744e45b94aaab00f47d9e7d035960",
  wpAPI: true,
  version: "wc/v3",
  queryStringAuth: true,
});

const AddToWishList = ({ product }) => {
  const [isInWishList, setInWishList] = useState(false);

  /* eslint-disable */
  useEffect(() => {
    const isItemInWishList = isProductInWishList(product.productId);
    setInWishList(isItemInWishList);
  }, [isInWishList]);

  if (isEmpty(product)) {
    return null;
  }

  const handleAddToWishList = () => {
    const productData = {
      node: {
        id: product.id,
        externalUrl: !isEmpty(product.externalUrl) ? product.externalUrl : "",
        productId: product.productId,
        image: {
          id: !isEmpty(product.image.id) ? product.image.id : "",
          altText: !isEmpty(product.image.altText) ? product.image.altText : "",
          sourceUrl: !isEmpty(product.image.sourceUrl)
            ? product.image.sourceUrl
            : "",
        },
        link: product.link,
        name: product.name,
        price: product.price,
        type: product.type ? product.type : product.nodeType,
      },
    };
    fetch("https://admin.sergiosmarketplace.com/wp-json/get/allcustomer/id")
      .then((res) => {
        const userId = res.json().then((data) => {
          const authLogin = JSON.parse(localStorage.getItem("auth"));
          const { email } = authLogin.user;
          if (email) {
            const dataUser = data.filter((d) => d.email === email);
            console.log(dataUser[0].databaseId);
            getData(dataUser[0].databaseId);
          }
        });
      })
      .catch((err) => console.log(err));

    addToWishList(productData);
    setInWishList(true);
  };

  const getData = (id) => {
    WooCommerceWishlist.get(`wishlist/get_by_user/${id}`)
      .then((res) => {
        const key = res.data[0].share_key;
        localStorage.setItem('shareKey', key)
        postdata(key);
      })
      .catch((err) => err);
  };

  const postdata = (shareKey) => {
    WooCommerceWishlist.post(`wishlist/${shareKey}/add_product`, {
      product_id: product.databaseId,
      variation_id: 0,
      meta: ["test"],
    })
      .then((res) => res.data)
      .catch((err) => err);
  };

  return (
    <div className="wishlist-container">
      {/*Add ot wishlist buttnon*/}
      {!isInWishList ? (
        <button
          onClick={() => handleAddToWishList()}
          className="wishlist-btn btn -mt-2"
        >
          <i className="heart-icon">
            <span className="heart" />
          </i>
        </button>
      ) : (
        // View
        <Link to="/wishlist">
          <button className="wishlist-btn woo-next-view-cart-btn btn">
            <i className="heart-icon">
              <span className="heart added" />
            </i>
          </button>
        </Link>
      )}
    </div>
  );
};

export default AddToWishList;
