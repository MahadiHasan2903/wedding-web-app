"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import ReportActionForm from "./ReportActionForm";
import { Pagination } from "@/lib/components/table";
import { CardTitle } from "@/lib/components/heading";
import { filter } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import FilterReportDropdown from "./FilterReportDropdown";
import { ImageWithFallback } from "@/lib/components/image";
import { Report } from "@/lib/types/reports/reports.types";
import { formatDateString3 } from "@/lib/utils/date/dateUtils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PropsType {
  allReportsData: {
    allReports: Report[];
    paginationInfo: {
      totalItems: number;
      itemsPerPage: number;
      currentPage: number;
      totalPages: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
      prevPage: number | null;
      nextPage: number | null;
    };
  };
}

const ReportManagement = ({ allReportsData }: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const { currentPage, totalPages, prevPage, nextPage } =
    allReportsData.paginationInfo;

  // Memoize the admin list to prevent unnecessary re-renders
  const data = useMemo(
    () => allReportsData.allReports || [],
    [allReportsData.allReports]
  );

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate a URL with updated page query param
  const getUrlWithPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Automatically sync the current page in URL if it's not present
  useEffect(() => {
    if (!searchParams.get("page")) {
      router.replace(getUrlWithPage(currentPage));
    }
  }, [searchParams, currentPage, pathname, router]);

  // Handler to update route with selected page
  const handlePageChange = (page: number | null) => {
    if (page && page !== currentPage) {
      router.push(getUrlWithPage(page));
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-white rounded-none lg:rounded-[10px]">
        <div className="w-full py-[17px] lg:py-[25px] border-b-[1px] lg:border-b-[3px] border-light">
          <div className="w-full px-[17px] lg:px-[36px] flex items-center justify-between gap-6">
            <CardTitle title="Reports & Abuses" className="shrink-0" />
            <div className="w-fit shrink-0 relative" ref={dropdownRef}>
              <CommonButton
                label="Filter Reports"
                className="w-fit flex shrink-0 items-center gap-[5px] hover:bg-light text-[12px] font-normal p-[8px] lg:p-[10px] rounded-full border border-primaryBorder"
                startIcon={
                  <ImageWithFallback
                    src={filter}
                    width={13}
                    height={13}
                    alt="filter"
                  />
                }
                onClick={() => setIsFilterOpen((prev) => !prev)}
              />

              {isFilterOpen && (
                <FilterReportDropdown setIsFilterOpen={setIsFilterOpen} />
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b-[1px] lg:border-b-[3px] border-light">
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Reported At
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Reported On
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Report type
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Status
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length <= 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-5 text-[14px] text-gray-500"
                  >
                    No report found
                  </td>
                </tr>
              ) : (
                data.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b-[1px] lg:border-b-[3px] border-light transition hover:bg-light"
                  >
                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[150px]">
                      {formatDateString3(report.createdAt)}
                    </td>
                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[150px]">
                      Message
                    </td>
                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] capitalize text-left whitespace-nowrap min-w-[100px]">
                      {report.type}
                    </td>
                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] capitalize text-left whitespace-nowrap min-w-[100px]">
                      <div
                        className={`${
                          report.status === "resolved"
                            ? "text-green bg-[#D0FFEF]"
                            : "text-red bg-[#FFE2E6]"
                        } w-fit flex items-center gap-1 text-[12px] font-normal rounded-full px-[15px] py-[6px]`}
                      >
                        <div
                          className={`${
                            report.status === "resolved" ? "bg-green" : "bg-red"
                          } w-[5px] h-[5px] rounded-full`}
                        />
                        <p className="whitespace-nowrap">{report.status}</p>
                      </div>
                    </td>
                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[100px]">
                      <CommonButton
                        label="View Details"
                        className="w-fit text-[10px] px-[14px] py-[10px] rounded-[40px] border border-primaryBorder hover:bg-primary hover:text-white transition-all"
                        onClick={() => {
                          setSelectedReport(report);
                          setOpen(true);
                        }}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="w-full flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
            onPageClick={(page) => handlePageChange(page)}
            onPrevClick={() => handlePageChange(prevPage)}
            onNextClick={() => handlePageChange(nextPage)}
          />
        </div>
      </div>
      {open && selectedReport && (
        <ReportActionForm
          open={open}
          setOpen={setOpen}
          reportDetails={selectedReport}
        />
      )}
    </div>
  );
};

export default ReportManagement;
