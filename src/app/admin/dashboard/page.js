"use client";
import BarGraph from "@/components/dashboard/BarGraph";
import DoughnutChart from "@/components/dashboard/Doughnut";
import ViewOrders from "@/components/dashboard/ViewOrders";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../Context/store";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import React from "react";

const Dashboard = () => {
  const { user } = useGlobalContext();
  const [monthSales, setMonthSales] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const router = useRouter();
  const [orderList, setOrderList] = useState([]);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"))?.token;
      if (!token) {
        return router.push("/login");
      }

      var response = await fetch(
        `/api/admin/viewOrders/${search}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

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

  const filterOrders = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"))?.token;
    if (!token) {
      return router.push("/login");
    }
    if (id) {
      const response = await fetch(
        `/api/admin/viewOrders/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

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
      }
    }
  };

  useEffect(() => {
    if(search==="")
    fetchOrders();
  }, [search]);

  return (
    <div className="flex flex-col my-12">
      <h2 className="m-auto">MONTHLY REPORT</h2>
      <div className="flex md:flex-row flex-col justify-around items-center container mx-auto p-12">
        <section>
          <DoughnutChart categorySales={categorySales} />
        </section>
        <section>
          <BarGraph monthSales={monthSales} />
        </section>
      </div>
      <div className="max-h-[60vh] overflow-y-auto">
        <ViewOrders
          orderList={orderList}
          setSearch={setSearch}
          search={search}
          filterOrders={filterOrders}
        />
      </div>
    </div>
  );
};

export default Dashboard;
