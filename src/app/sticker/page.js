import Link from "next/link";
import Image from "next/image";

const Sticker = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-12 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
         
         
        <div className="lg:w-1/5 md:w-1/2 p-4 w-full flex items-center flex-col m-2 shadow-md">
            <Link href={"/products/abc"}>
              <div className="block relative rounded overflow-hidden">
                <Image
                  alt="ecommerce"
                  className="h-[36vh] block"
                  src="/sticker.jpg"
                  width={800}
                  height={1500}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  T-Shirt
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  The Catalyzer
                </h2>
                <p className="mt-1">₹499.00</p>
                <p className="mt-1">XS S M L XL</p>
              </div>
            </Link>
          </div>


          <div className="lg:w-1/5 md:w-1/2 p-4 w-full flex items-center flex-col m-2 shadow-md">
            <Link href={"/products/abc"}>
              <div className="block relative rounded overflow-hidden">
                <Image
                  alt="ecommerce"
                  className="h-[36vh] block"
                  src="/sticker.jpg"
                  width={800}
                  height={1500}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  T-Shirt
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  The Catalyzer
                </h2>
                <p className="mt-1">₹499.00</p>
                <p className="mt-1">XS S M L XL</p>
              </div>
            </Link>
          </div>


          <div className="lg:w-1/5 md:w-1/2 p-4 w-full flex items-center flex-col m-2 shadow-md">
            <Link href={"/products/abc"}>
              <div className="block relative rounded overflow-hidden">
                <Image
                  alt="ecommerce"
                  className="h-[36vh] block"
                  src="/sticker.jpg"
                  width={800}
                  height={1500}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  T-Shirt
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  The Catalyzer
                </h2>
                <p className="mt-1">₹499.00</p>
                <p className="mt-1">XS S M L XL</p>
              </div>
            </Link>
          </div>


          <div className="lg:w-1/5 md:w-1/2 p-4 w-full flex items-center flex-col m-2 shadow-md">
            <Link href={"/products/abc"}>
              <div className="block relative rounded overflow-hidden">
                <Image
                  alt="ecommerce"
                  className="h-[36vh] block"
                  src="/sticker.jpg"
                  width={800}
                  height={1500}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  T-Shirt
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  The Catalyzer
                </h2>
                <p className="mt-1">₹499.00</p>
                <p className="mt-1">XS S M L XL</p>
              </div>
            </Link>
          </div>

          
          
          
        </div>
      </div>
    </section>
  );
};

export default Sticker;
