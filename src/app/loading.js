"use client";
import React from "react";
import { Spinner } from "flowbite-react";

const loading = () => {
  return (
    <div className="flex justify-center w-full h-[80vh]">
      <div className="flex flex-wrap m-10">
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      </div>
    </div>
  );
};

export default loading;
