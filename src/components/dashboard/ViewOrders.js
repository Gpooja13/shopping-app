"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "@/Context/store";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { IoSearchOutline } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import { TextInput } from "flowbite-react";

const ViewOrders = ({ orderList, setSearch, search, filterOrders }) => {
  const searchChange = (e) => {
    const pattern = new RegExp(/^[\da-f]{24}$/);
    if (e.target.value.match(pattern)) {
      setSearch(e.target.value);
    }
  };

  return (
    <div className="container  mx-auto">
      {/* bg-indigo-200 */}
      <div className="flex flex-wrap -mx-3 mb-5 justify-center">
        <div className="w-full max-w-full px-3 mb-6  mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              <div className="px-9 pt-5 flex md:flex-row flex-col justify-center items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent ">
                <div >
                  <TextInput
                    className="md:absolute md:w-[42vh] md:left-[35px] "
                    id="search"
                    type="text"
                    sizing="sm"
                    onChange={(e) => searchChange(e)}
                  />
                  <IoSearchOutline
                    className="absolute text-xl left-[280px] md:top-[27px] top-[32px]"
                    onClick={() => {
                      if (search) {
                        filterOrders(search);
                      } else {
                        toast.error("Enter valid Id", {
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
                    }}
                  />
                </div>

                <h3 className="md:flex md:items-start md:justify-center absolute top-20 md:top-5 m-2  ml-0 font-medium md:text-xl/tight text-lg text-dark">
                  RECENT ORDERS
                </h3>
              </div>

              <div className="flex-auto block py-8 md:pt-6 pt-16 px-9 min-h-72">
                <div className="overflow-x-auto">
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom bg-[#f9fafb] leading-normal">
                      <tr className="font-semibold text-[0.95rem] text-secondary-dark ">
                        <th className="pb-3 text-start min-w-[150px] text-sm pl-4">
                          NAME
                        </th>
                        <th className="pb-3 text-center min-w-[100px] text-sm">
                          AMOUNT
                        </th>
                        <th className="pb-3 text-center min-w-[100px] text-sm">
                          STATUS
                        </th>

                        <th className="pb-3 text-center min-w-[100px] text-sm">
                          ADDRESS
                        </th>
                        <th className="pb-3 text-center min-w-[100px] text-sm">
                          CONTACT
                        </th>
                        <th className="pb-3 text-center min-w-[50px] text-sm">
                          CREATED AT
                        </th>
                        <th className="pb-3 text-end min-w-[50px] text-sm"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderList?.length !== 0 &&
                        orderList.map((item) => {
                          return (
                            <tr
                              key={item._id}
                              className="border-b border-dashed last:border-b-0"
                            >
                              <td className="p-3 pl-0">
                                <Link href={"/auth/order?orderid=" + item._id}>
                                  <div className="flex items-center">
                                    <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                      <img
                                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg"
                                        className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                                        alt=""
                                      />
                                    </div>

                                    <div className="flex flex-col justify-start">
                                      <div className="text-sm font-medium text-gray-900">
                                        {item.name}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        #{item._id}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </td>

                              <td className="text-sm p-3 pr-0 text-center">
                                ₹{item.amount}
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <span>
                                  <span className="px-2 inline-flex text-xs font-semibold leading-5 rounded-full bg-green-100 text-green-800">
                                    {item.status}
                                  </span>
                                </span>
                              </td>

                              <td className="p-3 text-center">
                                <div className="text-sm text-gray-900">
                                  {item.address}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {item.pincode}
                                </div>
                              </td>
                              <td className="pr-0 text-center">
                                <div className="text-sm text-gray-900">
                                  {item.phone}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {item.email}
                                </div>
                              </td>
                              <td className="text-sm p-3 pr-0 text-center">
                                {item.createdAt.substring(0, 10)}
                              </td>

                              <td className="p-3 pr-0 text-center">
                                <Link href={"/auth/order?orderid=" + item._id}>
                                  <button className="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center">
                                    <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                      </svg>
                                    </span>
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {orderList.length === 0 ? (
                    <p className="flex justify-center items-center h-full w-full mt-20 text-gray-500 text-sm">
                      No orders yet.
                    </p>
                  ) : (
                    <></>
                  )}
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
  );
};

export default ViewOrders;
