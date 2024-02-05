// "use client";
import Link from "next/link";
import Image from "next/image";
// import { useEffect } from "react";

export async function fetchProductData() {
  const res = await fetch("http://localhost:3000/api/product");
  const products = await res.json();
  return products;
}

const TShirt = async () => {

  const productData = await fetchProductData();
  // useEffect(()=>{
   

  // },[])
  
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-12 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          {productData.map((item) => {
            return (
              <div key={item.slug} className="lg:w-1/5 md:w-1/2 p-4 w-full flex items-center flex-col m-2 shadow-md">
                <Link href={`/products/${item.slug}`}>
                  <div className="block relative rounded overflow-hidden">
                    <Image
                      alt="ecommerce"
                      className=" block"
                      src="/tshirt.jpg"
                      width={800}
                      height={1500}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {item.category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {item.title}
                    </h2>
                    <p className="mt-1">₹{item.price}</p>
                    <p className="mt-1">{item.size}</p>
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
