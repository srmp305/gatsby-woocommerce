import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import GET_PRODUCTS from "../../../queries/get-products";
import {
  addWishListToLocalStorage,
  getWishListProducts,
  GetWishListIds,
} from "../../../utils/functions";
import { isEmpty } from "lodash";
import WishlistProduct from "../wishlist-product";

const WishlistProducts = ({ setWishList }) => {
  /**
   * We get the product data from localStorage first and set it to the 'products' initial value
   * so that it can be used even when offline.
   */
  const [productIds, setProductIds] = useState([]);
  const [products, setProducts] = useState([]);

  // Get Cart Data.
  const [getWishList, { loading }] = useLazyQuery(GET_PRODUCTS, {
    variables: {
      include: productIds.length ? productIds : [12575],
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      // If the request is sucessfull updated products with fresh data
      if (!isEmpty(data.products.edges)) {
        setProducts(data.products.edges);
        console.log("data", data.products.edges);
      }
    },
    onError: (e) => {
      const prod = getWishListProducts();
      setProducts(prod);
      console.log("error", e);
    },
  });

  useEffect(() => {
    GetWishListIds().then((ids) => {
      console.log(ids);
      setProductIds(ids);
    });
  }, []);
  /* eslint-disable */
  useEffect(() => {
    getWishList();
  }, [productIds]);

  if (!products.length && loading) {
    return null;
  }
  return (
    <div className="container my-5">
      <div className="container">
        <div className="product-container row">
          {!loading ? (
            <WishlistProduct
              product={products}
              getWishList={getWishList}
              setWishList={setWishList}
            />
          ) : (
            <div style={{ height: "630px" }}>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistProducts;
