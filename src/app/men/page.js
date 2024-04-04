"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import SideBar from "@/components/SideBar";
import { useGlobalContext } from "@/Context/store";

const Men = () => {
  const [productData, setProductData] = useState({});
  const [allCategory, setAllCategory] = useState([]);
  const [allColor, setAllColor] = useState([]);
  const { sorting, sort, setSort } = useGlobalContext();

  const uniqueData = (data, property) => {
    let newVal = Object.keys(data).map((curElem) => {
      if (property === "category") {
        return data[curElem].category;
      }
      if (property === "color") {
        return data[curElem].color;
      }
      if (property === "brand") {
        return data[curElem].brand;
      }
      if (property === "price") {
        return data[curElem].price;
      }
    });
    newVal = ["All", ...new Set(newVal)];
    console.log(newVal);
    return newVal;
  };

  async function fetchProductData() {
    const res = await fetch("http://localhost:3000/api/men");
    const products = await res.json();
    setProductData(sorting(products, sort));

    setAllCategory(uniqueData(products, "category"));
    setAllColor(uniqueData(products, "color"));
  }

  useEffect(() => {
    fetchProductData();
  }, [sort]);

  return (
    <section className="text-gray-600 body-font">
      <SideBar allCategory={allCategory} allColor={allColor} />
      <div className="container pb-24 pt-12 mx-auto">
        <div className="flex justify-around items-center mb-12">
          <div className="p-2 border ">
            <FaFilter title="Filter" />
          </div>
          <span className="text-sm">69 products available</span>

          <div>
            <label htmlFor="sort" className="text-sm">
              Sort by:{" "}
            </label>
            <select
              name="sort"
              id="sort"
              className="text-sm pr-0"
              onClick={(e) => setSort(e.target.value)}
            >
              <option value="default" className="text-sm">
                Default
              </option>
              <option value="lowest-highest" className="text-sm">
                Price-High to Low
              </option>
              <option value="highest-lowest" className="text-sm">
                Price-Low to High
              </option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap -m-4 justify-center">
          {/* {Object.keys(productData).length===0 && <p>Sorry all the products are cuurently out of stock. New stock comming soon. Stay tuned!</p>} */}
          {Object.keys(productData).map((item) => {
            return (
              <div
                key={productData[item]?.slug}
                className="lg:w-1/5 md:w-1/2 p-4 w-full flex items-center flex-col m-2 shadow-md"
              >
                <Link href={`/products/${productData[item]?.slug}`}>
                  <div className="block relative rounded overflow-hidden">
                    <Image
                      alt="ecommerce"
                      className=" block"
                      // src="/tshirt.jpg"
                      // src={productData[item.image]}
                      src="https://m.media-amazon.com/images/I/51uGECebmZL._AC_UY1100_.jpg"
                      width={800}
                      height={1500}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {productData[item]?.category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {productData[item]?.title}
                    </h2>
                    <div className="mt-1">
                      {productData[item]?.size.includes("XS") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          XS
                        </span>
                      )}
                      {productData[item]?.size.includes("S") && (
                        <span className="border border-gray-300 px-1 mx-1 rounded-full">
                          S
                        </span>
                      )}
                      {productData[item]?.size.includes("M") && (
                        <span className="border border-gray-300 px-1 mx-1 rounded-full">
                          M
                        </span>
                      )}
                      {productData[item]?.size.includes("L") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          L
                        </span>
                      )}
                      {productData[item]?.size.includes("XL") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          XL
                        </span>
                      )}
                    </div>
                    <p className="mt-1">₹{productData[item]?.price}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Men;
