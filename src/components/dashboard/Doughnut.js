"use client";
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export default function DoughnutChart({categorySales}) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const categoryArray = [];

  for (const category in categorySales) {
    categoryArray.push(categorySales[category].count);
  }

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Men","Women","Kids","Accessories"],
      datasets: [
        {
          data: categoryArray,
          backgroundColor: ["#36A2EB","#b32536", "#d1cc2e","#82d12e"],
          // hoverBackgroundColor: [
          //     "#8f2c38",
          //     "#FFB1C1",
          //     "rgb(54, 162, 235)"
          // ]
        },
      ],
    };
    const options = {
      plugins: {
        colors: {
          enabled: true,
        },
      },
      cutout: "60%",
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="card flex justify-content-center">
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        className="w-full md:w-30rem"
      />
    </div>
  );
}
