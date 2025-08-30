"use client";

import React, { useEffect } from "react";
import { UserCard } from "@/lib/components/card";
import { User } from "@/lib/types/user/user.types";
import { Pagination } from "@/lib/components/table";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Translation dictionary
const translations: Record<string, Record<string, string>> = {
  en: {
    noProfiles:
      "No recommended profiles found. Please update your profile to receive better recommendations.",
  },
  fr: {
    noProfiles:
      "Aucun profil recommandé trouvé. Veuillez mettre à jour votre profil pour recevoir de meilleures recommandations.",
  },
  es: {
    noProfiles:
      "No se encontraron perfiles recomendados. Por favor, actualice su perfil para recibir mejores recomendaciones.",
  },
};

interface PropsType {
  allRecommendedUsersData: {
    users: User[];
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

const AllRecommendedUsers = ({ allRecommendedUsersData }: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { currentPage, totalPages, prevPage, nextPage } =
    allRecommendedUsersData.paginationInfo;

  const { language } = useLanguageStore();
  const t = translations[language];

  // Helper to build URL with updated page param
  const getUrlWithPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  // On initial render, if no page param in URL, set it to currentPage
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
    <div className="w-full flex flex-col justify-between items-start">
      <div className="w-full p-3 lg:p-0">
        {allRecommendedUsersData.users.length > 0 ? (
          <div className="w-full flex flex-wrap items-start justify-start gap-[8px] md:gap-[25px]">
            {allRecommendedUsersData.users.map((user) => (
              <UserCard
                returnUrl="/recommended-matches"
                key={user.id}
                user={user}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-[600px] text-center flex items-center justify-center min-h-[60vh] text-black text-[20px] font-medium py-8">
            {t.noProfiles}
          </div>
        )}
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
  );
};

export default AllRecommendedUsers;
