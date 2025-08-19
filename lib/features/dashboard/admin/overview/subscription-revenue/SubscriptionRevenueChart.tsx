"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { MonthlyRevenue } from "@/lib/types/analytics/analytics.types";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface PropsType {
  data: MonthlyRevenue[];
}

const SubscriptionRevenueChart = ({ data }: PropsType) => {
  const seriesData = [
    {
      name: "New Registrations",
      data: data.map((item) => [
        new Date(`${item.month} ${item.year}`).getTime(),
        item.totalAmount,
      ]),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      fontFamily: "Inter, sans-serif",
      stacked: false,
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    colors: ["#264e82"],
    dataLabels: { enabled: false },
    markers: { size: 0 },
    fill: {
      type: "solid",
      colors: ["#B2C0D3"],
    },

    stroke: { width: 5, curve: "smooth" },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "MMM yyyy",
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val}`,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
    },
  };

  return (
    <div id="LineChart" className="-ml-5">
      <ReactApexChart
        options={options}
        series={seriesData}
        type="area"
        height={330}
        width={"100%"}
      />
    </div>
  );
};

export default SubscriptionRevenueChart;
