"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { MonthlyRegistration } from "@/lib/types/analytics/analytics.types";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface PropsType {
  data: MonthlyRegistration[];
}

const NewRegistrationChart = ({ data }: PropsType) => {
  const seriesData = [
    {
      name: "New Registrations",
      data: data.map((item) => [
        new Date(`${item.month} ${item.year}`).getTime(),
        item.newRegistration,
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
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
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

export default NewRegistrationChart;
