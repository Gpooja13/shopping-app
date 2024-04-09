"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/store";
import ImageCarausel from "@/components/ImageCarousel";
import PageSection from "@/components/PageSection";
import PageSection2 from "@/components/PageSection2";
import PageSection3 from "@/components/PageSection3";
import PageSection4 from "@/components/PageSection4";
import Pagesection5 from "@/components/Pagesection5";

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
      <ImageCarausel />
      <PageSection2 />
      <PageSection3 />
      <PageSection4 />
      <Pagesection5 />
      <PageSection />
    </main>
  );
}
