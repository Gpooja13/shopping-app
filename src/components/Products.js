"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { LiaArrowCircleUpSolid } from "react-icons/lia";
import SideBar from "./SideBar";
import { useGlobalContext } from "../Context/store";

const Products = ({ groupType }) => {
  const [productData, setProductData] = useState({});
  const [allCategory, setAllCategory] = useState([]);
  const [allColor, setAllColor] = useState([]);
  const [allSize, setAllSize] = useState(["All", "XS", "S", "M", "L", "XL"]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filter, setFilter] = useState(false);
  const [scrollDown, setScrollDown] = useState(false);
  const {
    sorting,
    sort,
    setSort,
    uniqueData,
    selectedColor,
    setSelectedColor,
    selectedCategory,
    setSelectedCategory,
    selectedPrice,
    setSelectedPrice,
    selectedSize,
    setSelectedSize,
    filtering,
  } = useGlobalContext();

  async function fetchProductData() {
    const res = await fetch(`/api/${groupType}`);
    const products = await res.json();
    setProductData(sorting(products, sort));

    setAllCategory(uniqueData(products, "category"));
    setAllColor(uniqueData(products, "color"));
    setMinPrice(Math.min(...uniqueData(products, "price")));
    setMaxPrice(Math.max(...uniqueData(products, "price")));

    if (selectedCategory || selectedSize || selectedColor || selectedPrice) {
      setProductData(
        filtering(
          products,
          selectedCategory,
          selectedSize,
          selectedColor,
          selectedPrice
        )
      );
    }
  }

  const onTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [sort, selectedCategory, selectedSize, selectedColor, selectedPrice]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledToTop = window.scrollY === 0;
      setScrollDown(!isScrolledToTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <SideBar
        filter={filter}
        setFilter={setFilter}
        allCategory={allCategory}
        allSize={allSize}
        allColor={allColor}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
      <div className="container md:pb-24 py-10 md:pt-12 mx-auto">
        <div className="flex justify-around items-center mb-12">
          <div className="p-1 border ">
            <BiFilterAlt
              title="Filter"
              className="text-2xl"
              onClick={() => setFilter(!filter)}
            />
          </div>
          <span className="text-sm hidden md:block">
            {Object.keys(productData).length} products available
          </span>

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
                className="lg:w-1/5 md:w-1/2 md:p-4 p-12 w-full flex items-center flex-col m-2 shadow-md"
              >
                <Link href={`/products/${productData[item]?.slug}`}>
                  <div className="block relative rounded overflow-hidden">
                    <Image
                      alt="ecommerce"
                      className=" block"
                      // src="/tshirt.jpg"
                      src={productData[item].image}
                      // src="https://m.media-amazon.com/images/I/51uGECebmZL._AC_UY1100_.jpg"
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
      {scrollDown && (
        <button className="sticky bottom-10 left-[1250px]" onClick={onTop}>
          <LiaArrowCircleUpSolid className="text-4xl md:text-[2.5rem] md:mx-1" />
        </button>
      )}
    </section>
  );
};

export default Products;
