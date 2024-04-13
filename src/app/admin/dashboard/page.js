"use client";
import BarGraph from "@/components/dashboard/BarGraph";
import DoughnutChart from "@/components/dashboard/Doughnut";
import ViewOrders from "@/components/dashboard/ViewOrders";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "@/context/store";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import React from "react";

const page = () => {
  const { user } = useGlobalContext();
  const [monthSales, setMonthSales] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const router = useRouter();
  const [orderList, setOrderList] = useState([]);


  const fetchOrders = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"))?.token;
      if (!token) {
        return router.push("/login");
      }

      const response = await fetch("http://localhost:3000/api/admin/viewOrders", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: "Bounce",
        });
        return router.push("/");
      } else {
        setOrderList(data.o);
        setMonthSales(data.ordersByMonth);
        setCategorySales(data.ordersByGender);
      }
    } catch (error) {
      console.log("client side", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col my-12">
    <h2 className="m-auto">MONTHLY REPORT</h2>
      <div className="flex justify-around items-center container mx-auto p-12">
        <section>
          <DoughnutChart categorySales={categorySales} />
        </section>
        <section>
          <BarGraph monthSales={monthSales}/>
        </section>
      </div>
      <div className="max-h-[60vh] overflow-y-auto">
        <ViewOrders orderList={orderList} />
      </div>
    </div>
  );
};

export default page;
