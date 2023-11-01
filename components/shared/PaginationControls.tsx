"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  totalPages,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "10";
  // const totalPages = Math.ceil(totalData / Number(per_page))
  const pagesToDisplay: number[] = [];
  const pagesLen = totalPages / 5;
  for (let i = 1; i <= pagesLen; i++) {
    let multiples = 5 * i;
    pagesToDisplay.push(multiples);
  }

  return (
    <div className="flex h-7">
      <button
        className="border-2 border-black rounded-l-sm px-2 disabled:bg-gray-900 disabled:text-white"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        &lt;
      </button>
      <div className="border-y-2 border-black px-2">
        {page} / {totalPages}
      </div>

      <button
        className="border-2 border-black rounded-r-sm px-2 disabled:bg-gray-900 disabled:text-white"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        &gt;
      </button>
      
    </div>
  );
};

export default PaginationControls;
