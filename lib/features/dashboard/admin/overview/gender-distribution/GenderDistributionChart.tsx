"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface PropsType {
  male: number;
  female: number;
  other: number;
}

const GenderDistributionChart = ({ male, female, other }: PropsType) => {
  // If all values are 0, use 1 for each to render the chart
  const total = male + female + other;
  const series = total === 0 ? [1, 1, 1] : [male, female, other];

  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Male", "Female", "Other"],
    colors: ["#002F6C", "#8fc0ff", "#81d4fa"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => {
        // If original total is 0, show 0%
        return total === 0 ? "0%" : `${val.toFixed(0)}%`;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
        },
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      width={250}
      height={250}
    />
  );
};

export default GenderDistributionChart;
