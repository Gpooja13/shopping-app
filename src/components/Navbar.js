"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import React, { useRef, useEffect, useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { BsBagCheckFill } from "react-icons/bs";
import { useGlobalContext } from "../Context/store";
import { MdAccountCircle, MdLogin } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [dropDown, setDropDown] = useState(false);
  const ref = useRef();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const location = usePathname();
  const {
    cart,
    setCart,
    saveCart,
    numOfItems,
    subTotal,
    addToCart,
    removeFromCart,
    clear,
  } = useGlobalContext();

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(Math.random());
    router.push("/");
    toast.success("🦄 Your have been successfully logged out", {
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
  };

  const linkToItem = (slug) => {
    let url = `http://localhost:3000/products/${slug}`;
    window.location = url;
  };

  useEffect(() => {
    ref.current.classList.add("translate-x-full");
    const startLoadingBar = () => {
      setProgress(100);
    };

    startLoadingBar();

    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (err) {
      console.log(err);
      localStorage.clear();
    }
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
    }
    setKey(Math.random());
  }, [location]);

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center shadow-md">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition:Bounce
      />

      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
          <div className="pl-7 pr-4">
            <Link
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
              href={"/"}
            >
              <Image src="/logo.webp" alt="logo" width={40} height={40} />
              <span className="ml-2 text-xl">ShopMe</span>
            </Link>
          </div>
          <nav className="md:mr-auto md:ml-6 md:py-1 md:pl-6 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <Link href="/tshirt" className="mr-8 hover:text-gray-900">
              T-shirt
            </Link>
            <Link href="/hoodie" className="mr-8 hover:text-gray-900">
              Hoodies
            </Link>
            <Link href="/sticker" className="mr-8 hover:text-gray-900">
              Stickers
            </Link>
            <Link href="/mug" className="mr-8 hover:text-gray-900">
              Mugs
            </Link>
          </nav>
          <div className="absolute right-20 md:top-5 top-5 mx-8 z-50">
            {(
              <Link href="/wishList">
              <button>
                <FaRegHeart
                  className="text-xl md:text-2xl mx-2 md:mx-4"
                  title="WishList"
                />
              </button>
              </Link>
            )}
          </div>
          <div className="absolute right-0 md:top-4 top-4 mx-7 z-50">
            <button onClick={toggleCart}>
              <IoCartOutline
                className="text-xl md:text-3xl mx-2 md:mx-4"
                title="Cart"
              />
              {numOfItems === 0 ? (
                <></>
              ) : (
                <span className="rounded-full text-white bg-red-600 absolute bottom-[25px] right-[43px] w-[13px] h-[14px] text-xs font-medium">
                  {numOfItems}
                </span>
              )}
            </button>
            <span
              onMouseOver={() => setDropDown(true)}
              onMouseLeave={() => setDropDown(false)}
            >
              {dropDown && (
                <div className="absolute right-[-10px] bg-white top-8 py-2 rounded-md px-5 w-36 cursor-pointer shadow-lg border">
                  <ul>
                    <Link href={"/account"}>
                      <li className="py-2 text-sm hover:font-semibold">
                        My Account
                      </li>
                    </Link>
                    <Link href={"/orders"}>
                      <li className="py-2 text-sm hover:font-bold">Orders</li>
                    </Link>
                    <Link href={"/contact"}>
                      <li className="py-2 text-sm hover:font-bold">
                        Contact Us
                      </li>
                    </Link>

                    <li
                      onClick={logout}
                      className="py-2 text-sm hover:font-bold"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
              {user.value && (
                <button>
                  <MdAccountCircle
                    className="text-xl md:text-3xl"
                    onMouseOver={() => setDropDown(true)}
                    onMouseLeave={() => setDropDown(false)}
                    title="My Account"
                  />
                </button>
              )}
            </span>
            {!user.value && (
              <Link href={"/login"}>
                <button>
                  <MdLogin className="text-xl md:text-3xl" title="Login" />
                </button>
              </Link>
            )}
          </div>

          <div
            ref={ref}
            className="absolute w-72 h-full top-0 right-0 bg-[lavender] py-10 px-8 transition-transform transform translate-x-full z-50 overflow-y-auto"
          >
            <h2 className="font-w-6 text-xl text-center mb-6">Shopping cart</h2>
            <span
              className="absolute top-2 right-2 cursor-pointer"
              onClick={toggleCart}
            >
              <IoMdClose className="text-2xl" />
            </span>
            <ol className="list-decimal font-semibold">
              {Object.keys(cart).length === 0 && (
                <div className="my-4 font-semibold text-sm ml-[60px] mt-10">
                  Cart is empty!
                </div>
              )}
              {Object.keys(cart).map((k) => {
                return (
                  <li key={key}>
                    <div className="item flex">
                      <div
                        className="w-2/3 font-semibold cursor-pointer"
                        onClick={() => linkToItem(cart[k])}
                      >
                        {cart[k].name} ({cart[k].size} / {cart[k].variant})
                      </div>
                      <div className="flex items-center justify-center w-1/3 font-semibold text-lg">
                        <CiCircleMinus
                          className="cursor-pointer"
                          onClick={() => {
                            removeFromCart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].size,
                              cart[k].variant
                            );
                          }}
                          title="Sub"
                        />
                        <span className="mx-2 text-sm">{cart[k].qty}</span>
                        <CiCirclePlus
                          className="cursor-pointer"
                          onClick={() => {
                            addToCart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].size,
                              cart[k].variant
                            );
                          }}
                          title="Add"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
            {numOfItems ? (
              <div className="flex justify-center font-semibold mt-5">
                Pay ₹{subTotal}
              </div>
            ) : (
              <></>
            )}

            <div className="p-2 mt-6 w-full">
              <Link href={"/checkout"}>
                {numOfItems ? (
                  <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm">
                    <BsBagCheckFill className="m-1" />
                    Checkout
                  </button>
                ) : (
                  <button
                    className="flex mx-auto text-white bg-indigo-400 border-0 py-2 px-8 focus:outline-none  rounded text-sm"
                    disabled
                  >
                    <BsBagCheckFill className="m-1" />
                    Checkout
                  </button>
                )}
              </Link>
              <br />
              <button
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm w-[150px] justify-center"
                onClick={clear}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
