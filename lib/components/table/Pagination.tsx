"use client";

import React from "react";
import { getPaginationPages } from "@/lib/utils/helpers";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
  onPageClick: (page: number) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  prevPage,
  nextPage,
  onPageClick,
  onPrevClick,
  onNextClick,
}: PaginationProps) => {
  // if (totalPages < 2) {
  //   return null;
  // }

  return (
    <div className="flex items-center gap-[10px] my-[40px] xl:my-[80px] text-primaryBorder mx-auto">
      {/* Prev button */}
      <button
        onClick={onPrevClick}
        disabled={!prevPage}
        className={`w-[30px] h-[30px] flex items-center justify-center ${
          !prevPage ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
      >
        {"<"}
      </button>

      {/* Page numbers */}
      {getPaginationPages(currentPage, totalPages).map((page, idx) =>
        typeof page === "number" ? (
          <button
            key={page}
            onClick={() => onPageClick(page)}
            className={`w-[30px] h-[30px] flex items-center justify-center border ${
              page === currentPage
                ? "border-primary bg-primary text-white font-bold"
                : "border-primaryBorder"
            }`}
          >
            {page}
          </button>
        ) : (
          <span
            key={`${page}-${idx}`}
            className="w-[30px] h-[30px] flex items-center justify-center select-none"
          >
            &hellip;
          </span>
        )
      )}

      {/* Next button */}
      <button
        onClick={onNextClick}
        disabled={!nextPage}
        className={`w-[30px] h-[30px] flex items-center justify-center ${
          !nextPage ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
