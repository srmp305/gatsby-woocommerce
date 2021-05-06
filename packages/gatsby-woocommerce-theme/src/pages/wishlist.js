import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import WishlistProducts from "../components/wishlist/wishlist-products";
import { GetWishListIds } from "../utils/functions";
import { isEmpty } from "lodash";
import Link from "gatsby-link";

const WishList = () => {
  const [ auth, setAuth ] = useState(undefined);

  useEffect(() => {
	  setAuth(localStorage.getItem("auth"))
  },[])

  if (auth === null) {
    window.location.href = window.location.href.replace(
      "wishlist",
      "my-account"
    );
  }

  const [loading, setLoading] = useState(true);
  const [wishList, setWishList] = useState("");
  useEffect(() => {
    fetcData();
  }, []);
  const fetcData = async () => {
    const k = await GetWishListIds();
    setWishList(k);
    setLoading(false);
  };
  console.log(isEmpty(wishList));
  if (loading) return null;

  return (
    <Layout>
      <div className="container my-5">
        <h1 className="mt-5 mb-4">Wishlist</h1>
        {
          !isEmpty(wishList) ? (
            <WishlistProducts setWishList={setWishList} />
          ) : (
            <>
              <p>No items in wishlist</p>
              <Link to="/shop">
                <button className="btn btn-outline-dark">Shop</button>
              </Link>
            </>
          )
        }
      </div>
    </Layout>
  );
};

export default WishList;
