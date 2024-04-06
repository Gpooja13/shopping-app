"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Order = () => {
  const [orderData, setOrderData] = useState({ products: {} });
  const searchParams = useSearchParams();
  const orderid = searchParams.get("orderid");

  const fetchOrderDetail = async () => {
    const response = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: orderid }),
    });
    const data = await response.json();
    setOrderData(data);
    
    return data;
  };

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  const orderProducts = orderData.products;

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 pb-24 pt-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME
            </h2>
            <h1 className="text-gray-900 text-2xl title-font font-medium mb-4">
              Order Id: {orderid}
            </h1>
            <p className="leading-relaxed mb-4">
              Your order has been successfully placed
            </p>
            <p className="leading-relaxed mb-4">
              Your payment status is: {orderData.status}
            </p>

            <div className="flex mb-4">
              <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                Item Description
              </a>
              <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                Quantity
              </a>
              <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 text-right">
                Item Total
              </a>
            </div>

            {Object.keys(orderProducts).map((item) => {
              return (
                <div
                  key={item}
                  className="flex border-b border-gray-200 py-2 justify-between"
                >
                  <span className="text-gray-500">
                    {orderData.products[item].name}
                  </span>
                  <span className=" text-gray-900">
                    {orderData.products[item].qty}
                  </span>
                  <span className=" text-gray-900">
                    {orderData.products[item].price}
                  </span>
                </div>
              );
            })}

            <div className="flex justify-between my-5">
              <button className="flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Track order
              </button>
              <span className="title-font font-medium text-xl text-gray-900">
                Subtotal: ₹{orderData.amount}
              </span>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/6 w-full lg:h-36 h-64 object-cover object-center rounded"
            src="https://dummyimage.com/400x400"
          />
        </div>
      </div>
    </section>
  );
};

export default Order;
