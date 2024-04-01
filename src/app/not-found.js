"use client";
import React from "react";

const notFound = () => {
  return (
    <section class="text-gray-600 body-font py-40">
      <div class="container flex px-5 py-5 mx-auto justify-center items-center">
        <div className="pl-7 pr-4">
          <span className="ml-2 text-3xl font-semibold">404</span>
        </div>
        <div className=" md:ml-6 md:py-1 md:pl-8 md:border-l md:border-gray-400	flex flex-col items-center text-base justify-center">
          <p className="text-xl ">Page Not Found</p>
          <p className="mt-1 text-sm">The page you are looking for does not exist. How you got here is a mystery.</p> 
          <p className="text-sm">But you can explore the rest of the website.</p>
        </div>
      </div>
    </section>
  );
};

export default notFound;
