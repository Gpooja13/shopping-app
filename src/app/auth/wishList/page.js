"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGlobalContext } from "../../../Context/store";
import { RxCross1 } from "react-icons/rx";

const WishList = () => {
  const { user, wishItems, setWishItems, addToWishList, included } =
    useGlobalContext();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("wishList"));
    if (Array.isArray(storedItems)) {
      setWishItems(storedItems);
    } else {
      setWishItems([]); // Set an empty array if there are no items or if storedItems is not an array
    }
  }, [included]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-12 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          {!user ? (
            <div>
              <Link
                className="mb-3 flex items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mr-2 "
                style={{ backgroundColor: "#3b5998" }}
                href={"/login"}
                role="button"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Login In
              </Link>
            </div>
          ) : wishItems.length === 0 ? (
            <p>No items in wishlist right now.</p>
          ) : (
            wishItems.map((item) => {
              return (
                <div
                  key={item?.slug}
                  className="lg:w-1/5 md:w-1/2 p-4 w-full flex items-center flex-col m-2 shadow-md"
                >
                  <RxCross1
                    className="ml-auto cursor-pointer"
                    title="remove"
                    onClick={() => addToWishList(item)}
                  />
                  <Link href={`products/product/${item?.slug}`}>
                    <div className="block relative rounded overflow-hidden">
                      <Image
                        alt="ecommerce"
                        className=" block"
                        // src="/tshirt.jpg"
                        // src={productData[item.image]}
                        src="https://m.media-amazon.com/images/I/51uGECebmZL._AC_UY1100_.jpg"
                        width={800}
                        height={1500}
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {item?.category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {item?.title}
                      </h2>
                      <div className="mt-1">
                        {item?.size.includes("XS") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            XS
                          </span>
                        )}
                        {item?.size.includes("S") && (
                          <span className="border border-gray-300 px-1 mx-1 rounded-full">
                            S
                          </span>
                        )}
                        {item?.size.includes("M") && (
                          <span className="border border-gray-300 px-1 mx-1 rounded-full">
                            M
                          </span>
                        )}
                        {item?.size.includes("L") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            L
                          </span>
                        )}
                        {item?.size.includes("XL") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            XL
                          </span>
                        )}
                      </div>
                      <p className="mt-1">₹{item?.price}</p>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default WishList;
