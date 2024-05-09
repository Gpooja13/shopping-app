"use client";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../../Context/store";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart } from "react-icons/fa";

const Post = ({ params }) => {
  const slugWord = params.slug;
  const [pin, setPin] = useState("");
  const [serviceable, setServiceable] = useState("");
  const [productOneData, setProductOneData] = useState();
  const [variant, setVariant] = useState();
  const router = useRouter();
  const {
    user,
    cart,
    addToCart,
    wishItems,
    setWishItems,
    buyNow,
    included,
    setIncluded,
  } = useGlobalContext();

  async function fetchProductOneData() {
    const res = await fetch(
      `/api/productDesc/${slugWord}`
    );
    const productOne = await res.json();
    setProductOneData(productOne.productOne);
    setVariant(productOne.variant);
  }

  const checkServiceability = async () => {
    if (pin.length < 6) {
      toast.error("Please enter valid pincode", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: "Bounce",
      });
    } else {
      const fetchApi = await fetch(`/api/pincode`);
      const data = await fetchApi.json();

      if (Object.keys(data).includes(pin)) {
        setServiceable(true);
      } else {
        setServiceable(false);
      }
    }
  };

  const fetchWishList = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"))?.token;

      const response = await fetch(`/api/wishList/wish`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: "Bounce",
        });
        return router.push("/");
      } else {
        setWishItems(data.wish);
        console.log(data.wish);
      }
    } catch (error) {
      console.log("client side", error);
    }
  };

  const addToWishList = async (productID) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"))?.token;

      const exists = wishItems.some((elem) => elem._id === productID);
      console.log(exists);
      if (exists) {
        var response = await fetch(`/api/wishList/sub`, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ _id: productID }),
        });
        setIncluded(false);
        console.log("remove");
      } else {
        var response = await fetch(`/api/wishList/add`, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ _id: productID }),
        });
        setIncluded(true);
        console.log("added");
      }

      const data = await response.json();
      if (data.error) {
        toast.error(data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: "Bounce",
        });
        return router.push("/");
      } else {
        setWishItems(data.updatedList);
      }
    } catch (error) {
      console.log("client side", error);
    }
  };

  const onchange = (e) => {
    const pattern = new RegExp(/^[0-9]{6,6}$/g);
    if (e.target.value.length === 6) {
      if (!pattern.test(e.target.value)) {
        toast.error("Please enter valid pincode", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: "Bounce",
        });
      } else {
        setPin(e.target.value);
      }
    } else if (e.target.value.length > 6) {
      toast.error("Please enter valid pincode", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: "Bounce",
      });
    }
  };

  const refreshVariant = (newsize) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/products/${variant[newsize].slug}`;
    router.push(url);
  };

  useEffect(() => {
    fetchProductOneData();
    fetchWishList();
  }, [included]);

  useEffect(() => {
    if (!user.admin) {
      if (wishItems.some((item) => item?._id === productOneData?._id)) {
        setIncluded(true);
      } else {
        setIncluded(false);
      }
    }
  }, [wishItems]);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto object-cover object-top px-20 rounded"
            src={productOneData?.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <div className="float-right">
              {!user.admin && (
                <button
                  className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-3"
                  onClick={() => {
                    user
                      ? addToWishList(productOneData._id)
                      : router.push("/login");
                  }}
                >
                  {included ? (
                    <FaHeart className="text-red-600" />
                  ) : (
                    <FaHeart />
                  )}
                </button>
              )}
            </div>
            <h2 className="md:text-sm text-xs title-font text-gray-500 tracking-widest">
              BRAND NAME
            </h2>

            <h1 className="text-gray-900 md:text-3xl text-xl title-font font-medium mb-1">
              {productOneData?.title} ({productOneData?.size})
            </h1>
            <div className="flex mb-4">
              {/* <span className="flex items-center">
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
              </span> */}
              {/* <span className="flex ml-5 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
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
              </span> */}
            </div>
            <p className="leading-relaxed">{productOneData?.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3 md:text-[16px] text-sm ">Color</span>

                <div
                  className={`border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none`}
                  style={{ backgroundColor: productOneData?.color }}
                ></div>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3 md:text-[16px] text-sm">Size</span>
                <div className="relative">
                  <select
                    className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                    value={productOneData?.size}
                    onChange={(e) => {
                      refreshVariant(e.target.value);
                    }}
                  >
                    {variant && (
                      <>
                        {Object.keys(variant).includes("XS") && (
                          <option value={"XS"}>XS</option>
                        )}
                        {Object.keys(variant).includes("S") && (
                          <option value={"S"}>S</option>
                        )}
                        {Object.keys(variant).includes("M") && (
                          <option value={"M"}>M</option>
                        )}
                        {Object.keys(variant).includes("L") && (
                          <option value={"L"}>L</option>
                        )}
                        {Object.keys(variant).includes("XL") && (
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
            {productOneData?.availableQty === "0" ? (
              <p className="text-2xl text-red-500 font-semibold">
                Item sold out!
              </p>
            ) : (
              <div className="flex">
                <span className="title-font font-medium md:text-2xl text-xl text-gray-900 mr-4">
                  ₹{productOneData?.price}
                </span>

                <button
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-1 md:px-6 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm items-center "
                  onClick={() => {
                    if (user) {
                      if (
                        cart[slugWord]?.qty < productOneData.availableQty ||
                        !Object.keys(cart).includes(slugWord)
                      ) {
                        addToCart(
                          slugWord,
                          1,
                          productOneData.price,
                          productOneData.title,
                          productOneData.size,
                          productOneData.color,
                          productOneData.availableQty,
                          productOneData.gender,
                          productOneData.image
                        );

                        toast.success("Product added into the cart!", {
                          position: "bottom-center",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          // transition:Bounce ,
                        });
                      }
                      // else if(!Object.keys(cart).includes(slugWord)){

                      //   }
                      else {
                        toast.error("Stock not available", {
                          position: "bottom-center",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          // transition:Bounce ,
                        });
                      }
                    } else {
                      router.push("/login");
                    }
                  }}
                >
                  Add to cart
                </button>
                <button
                  className="flex ml-4 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-sm"
                  onClick={() => {
                    if (user) {
                      if (
                        cart[slugWord]?.qty < productOneData.availableQty ||
                        !Object.keys(cart).includes(slugWord)
                      ) {
                        buyNow(
                          slugWord,
                          1,
                          productOneData.price,
                          productOneData.title,
                          productOneData.size,
                          productOneData.color,
                          productOneData.availableQty,
                          productOneData.gender,
                          productOneData.image
                        );
                        router.push("/auth/checkout");
                      } else {
                        toast.error("Stock not available", {
                          position: "bottom-center",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          // transition:Bounce ,
                        });
                      }
                    } else {
                      router.push("/login");
                    }
                  }}
                >
                  Buy now
                </button>
              </div>
            )}
            <div className="flex flex-col mt-5">
              <div className="mt-6 flex space-x-2 text-sm">
                <input
                  type="text"
                  className="rounded border appearance-none border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10 w-[255px]"
                  onChange={onchange}
                  placeholder="Enter pincode"
                />
                <button
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded items-center"
                  onClick={checkServiceability}
                >
                  Check
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
