"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGlobalContext } from "../../Context/store";
import { RxCross1 } from "react-icons/rx";

const WishList = () => {
  const { wishItems, setWishItems, addToWishList,included } = useGlobalContext();

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
          {wishItems.length === 0 ? (
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
                  <Link href={`/products/${item?.slug}`}>
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
