"use client";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../Context/store";
// import { useRouter } from "next/router";

const Post = ({ params }) => {
  const slugWord = params.slug;
  const [pin, setPin] = useState("");
  const [serviceable, setServiceable] = useState("");
  const [productOneData, setProductOneData] = useState();
  const [variant, setVariant] = useState();
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  // const router = useRouter();
  const {
    cart,
    setCart,
    subTotal,
    setSubTotal,
    addToCart,
    removeFromCart,
    buyNow,
    clear,
  } = useGlobalContext();

  async function fetchProductOneData() {
    const res = await fetch(
      `http://localhost:3000/api/productDesc/${slugWord}`
    );
    const productOne = await res.json();
    setProductOneData(productOne.productOne);
    setVariant(productOne.variant);
    setColor(productOne.color);
    setSize(productOne.size);
    console.log(productOne.productOne);
    console.log(productOne.variant);
  }

  const checkServiceability = async () => {
    const fetchApi = await fetch("http://localhost:3000/api/pincode");
    const data = await fetchApi.json();

    if (data.includes(parseInt(pin))) {
      setServiceable(true);
    } else {
      setServiceable(false);
    }
  };

  const onchange = (e) => {
    setPin(e.target.value);
  };

  const refreshVariant = (newcolor, newsize) => {
    let url = `http://localhost:3000/product/${variants[newcolor][newsize][slug]}`;
    window.location = url;
  };

  useEffect(() => {
    fetchProductOneData();
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto object-cover object-top px-20 rounded"
            src="/tshirt.jpg"
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {productOneData && productOneData.title} (
              {productOneData && productOneData.size}/
              {productOneData && productOneData.color})
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">
              {productOneData && productOneData.desc}
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {variant &&
                  Object.keys(variant).includes("red") &&
                  Object.keys(variant)["red"].includes("size") && (
                    <button
                      className={`border-2 bg-red-300 rounded-full w-6 h-6 focus:outline-none ${
                        color === "red" ? "border-black" : "border-grey-300"
                      }`}
                    ></button>
                  )}
                {variant && Object.keys(variant).includes("pink") && (
                  <button className="border-2 border-pink-300 rounded-full w-6 h-6 focus:outline-none"></button>
                )}
                {variant &&
                  Object.keys(variant).includes("blue") &&
                  Object.keys(variant)["red"].includes(size) && (
                    <button className="border-2 border-blue-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  )}

                {/* <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button> */}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select
                    className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                    value={size}
                    onChange={(e) => refreshVariant(color, e.target.value)}
                  >
                    {variant && color && variant[color] && (
                      <>
                        {variant[color].includes("XS") && (
                          <option value={"XS"}>XS</option>
                        )}
                        {variant[color].includes("S") && (
                          <option value={"S"}>S</option>
                        )}
                        {variant[color].includes("M") && (
                          <option value={"M"}>M</option>
                        )}
                        {variant[color].includes("L") && (
                          <option value={"L"}>L</option>
                        )}
                        {variant[color].includes("XL") && (
                          <option value={"XL"}>XL</option>
                        )}
                      </>
                    )}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ₹{productOneData && productOneData.price}
              </span>

              <button
                className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-sm"
                onClick={() => {
                  addToCart(
                    slugWord,
                    1,
                    productOneData.price,
                    productOneData.title,
                    size,
                    color
                  );
                }}
              >
                Add to cart
              </button>
              <button
                className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-sm"
                onClick={() => {
                  buyNow(
                    slugWord,
                    1,
                    productOneData.price,
                    productOneData.title,
                    size,
                    color
                  );
                  // router.push("/checkout");
                }}
              >
                Buy now
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
            <div className="flex flex-col mt-3">
              <div className="mt-6 flex space-x-2 text-sm">
                <input
                  type="text"
                  className="px-2 border-2"
                  onChange={onchange}
                  placeholder="Enter pincode"
                />
                <button
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  onClick={checkServiceability}
                >
                  Check pincode
                </button>
              </div>
              <div>
                {serviceable && (
                  <div className="text-green-700 text-sm mt-2">
                    This pincode is serviceable.
                  </div>
                )}
                {!serviceable && serviceable !== "" && (
                  <div className="text-red-700 text-sm mt-2">
                    Sorry! We dont deliver to this pincode.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
