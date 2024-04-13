"use client";

import React, { useEffect } from "react";
import Chart from "chart.js/auto";

export default function BarGraph({monthSales}) {
  const orderArray = [];
  const salesArray = [];

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    for (const month in monthSales) {
      orderArray.push(monthSales[month].count);
      salesArray.push((monthSales[month].sales)/1000);
    }

    const data = {
      labels:Object.keys(monthSales),
      datasets: [
        {
          label: "Monthly Orders Placed",
          backgroundColor: "#1b72a1",
          data: orderArray,
        },
        {
          label: "Monthly Sales in k",
          backgroundColor: "#1ea11b",
          data: salesArray,
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 1.2,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    const ctx = document.getElementById("chart").getContext("2d");
    let chart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    return () => {
      // Cleanup function to destroy existing chart
      chart.destroy();
    };
  }, [orderArray,salesArray]);

  return (
    <div className="chart-container" style={{ position: "relative", height: "50vh", width: "50vw" }}>
      <canvas id="chart"></canvas>
    </div>
  );
}
