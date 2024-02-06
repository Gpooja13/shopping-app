"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const TShirt = () => {
  const [productData, setProductData] = useState({});

  async function fetchProductData() {
    const res = await fetch("http://localhost:3000/api/tshirt");
    const products = await res.json();
    setProductData(products);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-12 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          {Object.keys(productData).map((item) => {
            return (
              <div
                key={productData[item].slug}
                className="lg:w-1/5 md:w-1/2 p-4 w-full flex items-center flex-col m-2 shadow-md"
              >
                <Link href={`/products/${productData[item].slug}`}>
                  <div className="block relative rounded overflow-hidden">
                    <Image
                      alt="ecommerce"
                      className=" block"
                      src="/tshirt.jpg"
                      // src={productData[item.image]}
                      width={800}
                      height={1500}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {productData[item].category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {productData[item].title}
                    </h2>
                    <div className="mt-1">
                      {productData[item].size.includes("XS") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          XS
                        </span>
                      )}
                      {productData[item].size.includes("S") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          S
                        </span>
                      )}
                      {productData[item].size.includes("M") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          M
                        </span>
                      )}
                      {productData[item].size.includes("L") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          L
                        </span>
                      )}
                      {productData[item].size.includes("XL") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          XL
                        </span>
                      )}
                    </div>
                    <p className="mt-1">₹{productData[item].price}</p>
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

export default TShirt;
