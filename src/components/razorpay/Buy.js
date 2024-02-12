"use client";
import React, { useState } from "react";
import { BsBagCheckFill } from "react-icons/bs";

const Buy = ({ makePayment, totalAmount, disabled, products }) => {
  const [isLoading, setIsLoading] = useState(false);
 
  return (
    <div>
      <button
        className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm disabled:opacity-50 disabled:hover:bg-indigo-500"
        onClick={() => {
          makePayment({ products });
        }}
        disabled={isLoading ? isLoading : disabled}
      >
        <BsBagCheckFill className="m-1" />
        {isLoading ? "Processing..." : `Pay ₹${totalAmount}`}
      </button>
    </div>
  );
};

export default Buy;
