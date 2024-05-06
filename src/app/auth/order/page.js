"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Order = () => {
  const [orderData, setOrderData] = useState({ products: {} });
  const searchParams = useSearchParams();
  const orderid = searchParams.get("orderid");
  const router = useRouter();

  const fetchOrderDetail = async () => {
    const token = JSON.parse(localStorage.getItem("token"))?.token;
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ id: orderid }),
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
      setOrderData(data);
    }

    return data;
  };

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  const orderProducts = orderData.products;

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container mx-5 pb-12 pt-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className=" w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME
            </h2>
            <h1 className="text-gray-900 md:text-2xl text-xl title-font font-medium mb-4">
              Order Id: {orderid}
            </h1>
            <p className="leading-relaxed mb-4 ">
              Your order has been successfully placed.
            </p>
            <p className="leading-relaxed pb-6">
              Your payment status is: {orderData.status}
            </p>

            <div className="container  mx-auto">
              {/* bg-indigo-200 */}
              <div className="flex flex-wrap -mx-3 mb-5 justify-center">
                <div className="w-full max-w-full  mx-auto">
                  <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white md:m-5 lg:m-5">
                    <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                      <div className="flex-auto block py-8 pt-6 md:px-9 px-4 min-h-72">
                        <div className="overflow-x-auto">
                          <table className="w-full my-0 align-middle text-dark border-neutral-200">
                            <thead className="align-bottom bg-[#f9fafb] leading-normal">
                              <tr className="font-semibold text-[0.95rem] text-secondary-dark ">
                                <th className="pb-3 text-center min-w-[300px] text-sm pl-4">
                                  DESCRIPTION
                                </th>

                                <th className="pb-3 text-center min-w-[100px] text-sm">
                                  QUANTITY
                                </th>
                                <th className="pb-3 text-center min-w-[140px] text-sm">
                                  SIZE/COLOR
                                </th>

                                <th className="pb-3 text-center min-w-[100px] text-sm">
                                  SUBTOTAL
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.keys(orderProducts).map((item,index) => {
                                return (
                                  <tr
                                    key={index}
                                    className="border-b border-dashed last:border-b-0"
                                  >
                                    <td className="p-3 pl-0">
                                      <Link href={`/products/${item}`}>
                                        <div className="flex items-center">
                                          <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                            <img
                                              src={
                                                orderData.products[item].image
                                              }
                                              alt="image"
                                              className="w-16 h-16 rounded-full mx-3"
                                            />
                                          </div>

                                          <div className="flex flex-col justify-start">
                                            <div className=" ">
                                              {orderData.products[item].name}
                                            </div>
                                          </div>
                                        </div>
                                      </Link>
                                    </td>

                                    <td className=" p-3 pr-0 text-center">
                                      {orderData.products[item].qty}N
                                    </td>

                                    <td className=" p-3 pr-0 text-center">
                                      {orderData.products[item].size}/
                                      {orderData.products[item].variant}
                                    </td>

                                    <td className=" p-3 pr-0 text-center">
                                      ₹{orderData.products[item].price}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          <div className="flex justify-between w-[90%] m-5">
                            <button className="flex  text-white bg-indigo-300 border-0 py-2 px-6 focus:outline-none  rounded">
                              Track order
                            </button>
                            <span className="title-font font-medium text-xl text-gray-900">
                              Total amount: ₹{orderData.amount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-5">
                  {/* <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
            <p className="text-sm text-slate-500 py-1">
              {" "}
              Tailwind CSS Component from{" "}
              <a
                href="https://www.loopple.com/theme/riva-dashboard-tailwind?ref=tailwindcomponents"
                className="text-slate-700 hover:text-slate-900"
                target="_blank"
              >
                Riva Dashboard
              </a>{" "}
              by{" "}
              <a
                href="https://www.loopple.com"
                className="text-slate-700 hover:text-slate-900"
                target="_blank"
              >
                Loopple Builder
              </a>
              .{" "}
            </p>
          </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
