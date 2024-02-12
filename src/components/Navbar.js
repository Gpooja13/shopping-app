"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import React, { useRef, useEffect, useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { BsBagCheckFill } from "react-icons/bs";
import { useGlobalContext } from "../app/Context/store";
import { MdAccountCircle, MdLogin } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation";

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
    subTotal,
    setSubTotal,
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

  useEffect(() => {
    ref.current.classList.add("translate-x-full")
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
    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center py-2 shadow-md">
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
      <div className="logo mx-5">
        <Link href={"/"}>
          <Image src="/logo.webp" alt="logo" width={40} height={40} />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 md:text-md">
          <Link href="/tshirt">
            <li>T-shirt</li>
          </Link>
          <Link href="/hoodie">
            <li>Hoodies</li>
          </Link>
          <Link href="/sticker">
            <li>Stickers</li>
          </Link>
          <Link href="/mug">
            <li>Mugs</li>
          </Link>
        </ul>
      </div>

      <div className="absolute right-0 md:top-4 top-4 mx-5">
        <button onClick={toggleCart}>
          <IoCartOutline className="text-xl md:text-3xl mx-2 md:mx-4" />
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
                <Link href={"/order"}>
                  <li className="py-2 text-sm hover:font-bold">Orders</li>
                </Link>

                <li onClick={logout} className="py-2 text-sm hover:font-bold">
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
              />
            </button>
          )}
        </span>
        {!user.value && (
          <Link href={"/login"}>
            <button>
              <MdLogin className="text-xl md:text-3xl" />
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
            <div className="my-4 font-semibold text-sm">Cart is empty!</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={key}>
                <div className="item flex">
                  <div className="w-2/3 font-semibold">
                    {cart[k].name} ({cart[k].size / cart[k].variant})
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
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                    <CiCirclePlus
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div> Pay ₹{subTotal}</div>
        <div className="p-2 mt-6 w-full">
          <Link href={"/checkout"}>
            <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm">
              <BsBagCheckFill className="m-1" />
              Checkout
            </button>
          </Link>
          <br />
          <button
            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm"
            onClick={clear}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
