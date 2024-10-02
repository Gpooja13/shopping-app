import React from 'react'
import Link from 'next/link'

const PageSection2 = () => {
  return (
    <section className="text-gray-600 md:mt-8 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full transform transition duration-300 hover:scale-105 ">
        <Link href="/products/women" className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" 
          // src="https://dummyimage.com/420x260"
          // src='https://source.unsplash.com/featured/450x300/?t-shirt'
          src="/tshirt.jpg"
          />
        </Link>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">T-shirt</h2>
          {/* <p className="mt-1">$16.00</p> */}
        </div>
      </div>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full transform transition duration-300 hover:scale-105">
        <Link href="/products/women" className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" 
          // src='https://source.unsplash.com/featured/450x300/?shirt'
          src="/shirt.webp"
          />
        </Link>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">Shirt</h2>
          {/* <p className="mt-1">$21.15</p> */}
        </div>
      </div>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full transform transition duration-300 hover:scale-105">
        <Link href="/products/women" className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" 
          // src='https://source.unsplash.com/featured/450x300/?dress'
          src="/dress.webp"
          />
        </Link>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">Dress</h2>
          {/* <p className="mt-1">$12.00</p> */}
        </div>
      </div>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full transform transition duration-300 hover:scale-105">
        <Link href="/products/women" className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" 
          // src='https://source.unsplash.com/featured/450x300/?sweatshirt'
          src="/hood.jpg"
          />
        </Link>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">Sweatshirt</h2>
          {/* <p className="mt-1">$18.40</p> */}
        </div>
      </div>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full transform transition duration-300 hover:scale-105">
        <Link href="/products/women" className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" 
          // src='https://source.unsplash.com/featured/450x300/?cup'
          src="/cup.webp"
          />
        </Link>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">Cup</h2>
          {/* <p className="mt-1">$16.00</p> */}
        </div>
      </div>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full transform transition duration-300 hover:scale-105">
        <Link href="/products/women" className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" 
          // src='https://source.unsplash.com/featured/450x300/?fashion accessories'
          src="/access.webp"
          />
        </Link>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">Accessories</h2>
          {/* <p className="mt-1">$21.15</p> */}
        </div>
      </div>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full transform transition duration-300 hover:scale-105">
        <Link href="/products/women" className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" 
          // src='https://source.unsplash.com/featured/450x300/?blouse'
          src="/top.webp"
          />
        </Link>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">TopWear</h2>
          {/* <p className="mt-1">$12.00</p> */}
        </div>
      </div>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full transform transition duration-300 hover:scale-105">
        <Link href="/products/women" className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" 
          // src='https://source.unsplash.com/featured/450x300/?jeans'
          src="/denim.jpg"
          />
        </Link>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">Denims</h2>
          {/* <p className="mt-1">$18.40</p> */}
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default PageSection2