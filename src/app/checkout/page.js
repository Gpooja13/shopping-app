"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useGlobalContext } from "../Context/store";
import Head from "next/head";
import BuyProduct from "@/components/razorpay/BuyProduct";

const Checkout = () => {
  const {
    cart,
    setCart,
    subTotal,
    setSubTotal,
    addToCart,
    removeFromCart,
    clear,
  } = useGlobalContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleChange = async (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "address") {
      setAddress(e.target.value);
    }
    if (e.target.name === "phone") {
      setPhone(e.target.value);
    }
    if (e.target.name === "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        const fetchApi = await fetch("http://localhost:3000/api/pincode");
        const data = await fetchApi.json();
  
        if (Object.keys(data).includes(e.target.value)) {
          setState(data[e.target.value][1]);
          setCity(data[e.target.value][0]);
        }
        else{
          setState("")
          setCity("")
        }
      }
      else{
        setState("")
        setCity("")
      }
    }
    
  };

  useEffect(() => {
    if (
      name.length > 3 &&
      email.length > 3 &&
      phone.length > 10 &&
      address.length > 10 &&
      pincode.length > 5
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  });

  return (
    <div className="container m-auto">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <section className="text-gray-600 body-font relative">
        <div className="container px-8 md:px-5 lg:px-5 py-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Checkout
            </h1>
            <h2 className="font-bold text-lg">1. Delivery Details</h2>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="address"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    onChange={handleChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-16 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="phone"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="pincode"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    onChange={handleChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="city"
                    className="leading-7 text-sm text-gray-600"
                  >
                    City
                  </label>
                  <input
                    value={city}
                    type="text"
                    id="city"
                    name="city"
                    onChange={handleChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="state"
                    className="leading-7 text-sm text-gray-600"
                  >
                    State
                  </label>
                  <input
                    value={state}
                    type="text"
                    id="state"
                    name="state"
                    onChange={handleChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Button
                </button>
              </div> */}

              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <h2 className="font-bold text-lg my-5">2. Review Cart Item</h2>

                <div className=" h-full bg-[lavender] py-16 px-8 z-50">
                  <ol className="list-decimal font-semibold">
                    {Object.keys(cart).length === 0 && (
                      <div className="my-4 font-semibold text-sm">
                        Cart is empty!
                      </div>
                    )}
                    {Object.keys(cart).map((k) => (
                      <li key={k}>
                        <div className="item flex">
                          <div className="mx-4 font-semibold">
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
                    ))}
                  </ol>

                  <div className="p-2 mt-6 w-full">
                    <span className="font-bold">Subtotal: ₹{subTotal}</span>

                    <BuyProduct
                      totalAmount={subTotal}
                      products={cart}
                      name={name}
                      email={email}
                      phone={phone}
                      address={address}
                      pincode={pincode}
                      disabled={disabled}
                    />

                    {/* <Link href={"/checkout"}>
                      <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm">
                        <BsBagCheckFill className="m-1" />
                        Pay ₹{subTotal}
                      </button>
                    </Link> */}
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
