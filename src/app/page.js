"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "./Context/store";
import ImageCarausel from "@/components/ImageCarousel";
import PageSection from "@/components/PageSection";

export default function Home() {
  const {
    cart,
    setCart,
    subTotal,
    setSubTotal,
    addToCart,
    removeFromCart,
    clear,
  } = useGlobalContext();

  return (
    <main>
      <div>
        <ImageCarausel />
      </div>
      <PageSection />
    </main>
  );
}
