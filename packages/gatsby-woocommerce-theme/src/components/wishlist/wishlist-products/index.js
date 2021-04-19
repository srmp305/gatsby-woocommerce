import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import GET_PRODUCTS from "../../../queries/get-products";
import {
  addWishListToLocalStorage,
  getWishListProducts, GetWishListIds
} from "../../../utils/functions";
import { isEmpty } from "lodash";
import WishlistProduct from "../wishlist-product";

const WishlistProducts = (/* { setWishList } */) => {
  /**
   * We get the product data from localStorage first and set it to the 'products' initial value
   * so that it can be used even when offline.
   */
  // debugger
  const [productIds, setProductIds] = useState([]);
  const [products, setProducts] = useState([]);
  // const [ids, setIds] = useState();
  // const productIds = !isEmpty(wishListProducts)
  //   ? wishListProducts.productIds
  //   : [];

  // const cmsProd = 12575

  // Get Cart Data.
  const [getWishList, { loading }] = useLazyQuery(GET_PRODUCTS, {
    variables: {
      include: productIds.length ? productIds : [],
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      // If the request is sucessfull updated products with fresh data
      if (!isEmpty(data.products.edges)) {
        setProducts(data.products.edges);
        console.log("data", data.products.edges)

        // Update the localStorage with fresh data( this is will ensure data is not stale ).
        // debugger
        //   addWishListToLocalStorage({
        //     productIds: productIds,
        //     products: data.products.edges,
        //   });
      }
    },
    onError: (e) => {
      // debugger
      const prod = getWishListProducts();
      setProducts(prod);
      console.log("error", e)
    },
  })

  /* const shareKey = localStorage.getItem("shareKey");
  const fetchProd = () => {
    fetch(`https://admin.sergiosmarketplace.com/wp-json/wc/v3/wishlist/${shareKey}/get_products`)
      .then((res) => {
        res.json().then((data) => {
          console.log("Products: ", data);
          // setIds(data);
        });
      })
      .catch((err) => err);
  }; */
  useEffect(() => {
    // debugger
     GetWishListIds().then((ids) => {
      console.log(ids)
      // debugger
      setProductIds(ids)
    })
  }, [])
  /* eslint-disable */
  useEffect(() => {
    // debugger
    getWishList();
    // fetchProd();
  }, [productIds]);

  // debugger
  if (!products.length && !loading) {
    // debugger
    return null;
  }
  return (
    <div className="container my-5">
      <div className="container">
        <div className="product-container row">
          {!loading ? (
            // !isEmpty(products) &&
            // products.length &&
            // products.map((product) => {
            //   return (
            <WishlistProduct
              // key={product.node.id}
              product={products}
              // getWishList={getWishList}
              // setWishList={setWishList}
            // wishlistData={ids}
            />
          ) : (
            // );
            // }
            // {
            <div style={{ height: "630px" }}>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistProducts;
