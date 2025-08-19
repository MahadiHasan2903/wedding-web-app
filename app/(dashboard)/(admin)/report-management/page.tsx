import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { getQueryParam } from "@/lib/utils/helpers";
import { getServerSessionData } from "@/lib/config/auth";

const ReportManagement = dynamic(
  () =>
    import("@/lib/features/dashboard/admin/report-management/ReportManagement"),
  { ssr: false }
);

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ReportManagementPage = async ({ searchParams }: PropsType) => {
  const { accessToken } = await getServerSessionData();

  const page = Number(getQueryParam(searchParams, "page", 1));
  const pageSize = Number(getQueryParam(searchParams, "pageSize", 20));
  const dateRange = getQueryParam(searchParams, "dateRange", "");

  // Get the all reports data based on the search parameters
  const allReportsData = await api.reports.getAllReports(
    accessToken,
    page,
    pageSize,
    {
      dateRange,
    }
  );

  return (
    <div className="w-full h-full py-0 lg:py-[45px]">
      <ReportManagement allReportsData={allReportsData} />
    </div>
  );
};

export default ReportManagementPage;
