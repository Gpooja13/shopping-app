"use client";
import Link from "next/link";
import Image from "next/image";
import { IoCartOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import React, { useRef } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { BsBagCheckFill } from "react-icons/bs";


const Navbar = () => {
  const ref = useRef();

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center py-2 shadow-md">
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

      <div className="absolute right-0 md:top-4 top-12 mx-5">
        <button onClick={toggleCart}>
          <IoCartOutline className="text-xl md:text-3xl" />
        </button>
      </div>
      <div
        ref={ref}
        className="absolute w-72 h-full top-0 right-0 bg-[lavender] py-10 px-8 transition-transform transform translate-x-full"
      >
        <h2 className="font-w-6 text-xl text-center mb-6">Shopping cart</h2>
        <span
          className="absolute top-2 right-2 cursor-pointer"
          onClick={toggleCart}
        >
          <IoMdClose className="text-2xl" />
        </span>
        <ol className="list-decimal font-semibold">
          <li>
            <div className="item flex">
              <div className="w-2/3 font-semibold">T-shirt</div>
              <div className="flex items-center justify-center w-1/3 font-semibold text-lg">
                <CiCircleMinus className="cursor-pointer" /><span className="mx-2 text-sm">1</span><CiCirclePlus/>
              </div>
            </div>
          </li>
        </ol>
        <div class="p-2 mt-6 w-full">
          <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm"><BsBagCheckFill className="m-1" />Checkout</button>
          <br/>
          <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm">Clear Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
