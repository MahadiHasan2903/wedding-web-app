import { fetchTyped } from "../client";
import { BASE_URL } from "@/lib/config/constants";
import { User } from "@/lib/types/user/user.types";

interface GetAllUsersResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    items: User[];
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
}

interface GetUserDetails {
  status: number;
  success: boolean;
  message: string;
  data: User;
}

const users = {};

export default users;
