"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobalContext } from "../../../context/store";
import { useRouter } from "next/navigation";
import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pagination } from "flowbite-react";

const ViewProducts = () => {
  const { user } = useGlobalContext();
  const [productList, setProductList] = useState([]);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("men");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);

  const onPageChange = (page) => {
    setLimit(page * 5);
    setSkip(5 * (page - 1));

    setCurrentPage(page);
  };

  async function fetchProductData() {
    try {
      const token = JSON.parse(localStorage.getItem("token"))?.token;
      if (!token) {
        return router.push("/login");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/admin/${activeTab}?limit=${limit}&skip=${skip}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
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
        setProductList(data.products);
        setTotalPages(Math.ceil(data.num / 5));
      }
    } catch (error) {
      console.log("client side", error);
    }
  }

  useEffect(() => {
    if (!user?.admin) {
      router.push("/");
    } else {
      fetchProductData();
    }
  }, [activeTab, currentPage]);

  return (
    <div className="container  mx-auto">
      {/* bg-indigo-200 */}
      <div className="flex flex-wrap -mx-3 mb-5 justify-center">
        <div className="w-full max-w-full px-3 mb-6  mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              <div className="md:px-9 pt-5 flex flex-col items-center justify-center flex-wrap min-h-[70px] pb-0 bg-transparent ">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark">
                    Product List
                  </span>
                  {/* <span className="mt-1 font-medium text-secondary-dark text-lg/normal">
                      All projects from the Loopple team
                    </span> */}
                </h3>
                <div className="md:relative md:flex md:flex-wrap md:items-center md:my-2 absolute">
                  <Button.Group className="scale-[0.8] md:scale-100">
                    <Button color="gray" onClick={() => setActiveTab("men")}>
                      Men
                    </Button>
                    <Button color="gray" onClick={() => setActiveTab("women")}>
                      Women
                    </Button>
                    <Button color="gray" onClick={() => setActiveTab("kids")}>
                      Kids
                    </Button>
                    <Button
                      color="gray"
                      onClick={() => setActiveTab("accessories")}
                    >
                      Accessories
                    </Button>
                    <Button
                      color="gray"
                      onClick={() => setActiveTab("outofStock")}
                    >
                      Sold-out
                    </Button>
                  </Button.Group>
                </div>
              </div>

              <div className="flex-auto block py-8 pt-6 px-9 min-h-72">
                <div className="overflow-x-auto">
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom bg-[#f9fafb] leading-normal">
                      <tr className="font-semibold text-[0.95rem] text-secondary-dark ">
                        <th className="pb-3 text-start min-w-[280px] text-sm pl-4">
                          ProductID/Title
                        </th>
                        <th className="pb-3 text-center min-w-[50px] text-sm">
                          Slug
                        </th>
                        <th className="pb-3 text-center min-w-[70px] text-sm">
                          Type
                        </th>
                        <th className="pb-3 text-center min-w-[70px] text-sm">
                          Category
                        </th>
                        <th className="pb-3 text-center min-w-[100px] text-sm">
                          Color/Size
                        </th>
                        <th className="pb-3 text-center min-w-[70px] text-sm">
                          Price
                        </th>
                        <th className="pb-3 text-center min-w-[100px] text-sm">
                          Available Qty
                        </th>
                        <th className="pb-3 text-center min-w-[100px] overflow-auto text-sm">
                          Description
                        </th>
                        <th className="pb-3 text-end min-w-[100px] text-sm">
                          Created At
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList?.length !== 0 &&
                        productList.map((item) => {
                          return (
                            <tr
                              key={item._id}
                              className="border-b border-dashed last:border-b-0"
                            >
                              <td className="p-3 pl-0">
                                <Link href={`/products/${item?.slug}`}>
                                  <div className="flex items-center">
                                    <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                      <img
                                        src={item?.image}
                                        className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                                        alt=""
                                      />
                                    </div>

                                    <div className="flex flex-col justify-start">
                                      <div className="text-sm font-medium text-gray-900">
                                        {item.title}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        #{item._id}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <span>
                                  <span className="px-2 inline-flex text-xs font-semibold leading-5 rounded-full bg-green-100 text-green-800">
                                    {item?.slug}
                                  </span>
                                </span>
                              </td>
                              <td className="text-sm p-3 pr-0 text-center">
                                {item.gender}
                              </td>
                              <td className="text-sm p-3 pr-0 text-center">
                                {item.category}
                              </td>
                              <td className="p-3 text-center">
                                <span
                                  className="text-xs text-gray-900 px-2 inline-flex font-semibold leading-5 rounded-full"
                                  style={{
                                    backgroundColor: item?.color,
                                    color: "lightgreen",
                                  }}
                                >
                                  {item?.color}
                                </span>
                                <div className="text-sm text-gray-500 mt-1">
                                  {item?.size}
                                </div>
                              </td>
                              <td className="pr-0 text-center">
                                <div className="text-sm text-gray-900 font-semibold">
                                  ₹{item?.price}
                                </div>
                              </td>
                              <td
                                className="text-sm p-3 pr-0 text-center font-semibold"
                                style={{
                                  color:
                                    item?.availableQty === "0"
                                      ? "red"
                                      : "black",
                                }}
                              >
                                {item?.availableQty}
                              </td>
                              <td className="text-sm p-3 pr-0 text-center">
                                {item?.desc}
                              </td>
                              <td className="text-sm p-3 pr-0 text-center">
                                {item?.createdAt.substring(0, 10)}
                              </td>
                              <td className="p-3 pr-0 text-center">
                                <Link
                                  href={`/admin/editProduct?id=${item?._id}&title=${item?.title}&slug=${item?.slug}&gender=${item?.gender}&category=${item?.category}&size=${item?.size}&color=${item?.color}&price=${item?.price}&availableQty=${item?.availableQty}&image=${item?.image}&desc=${item?.desc}`}
                                >
                                  <button className="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center">
                                    <AiOutlineEdit title="Edit" />
                                    {/* <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
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
                                    </span> */}
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {productList.length === 0 ? (
                    <p className="flex justify-center items-center h-full w-full mt-20 text-gray-500 text-sm">
                      No products uploaded yet.
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
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showIcons
            />
          </div>

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

export default ViewProducts;
