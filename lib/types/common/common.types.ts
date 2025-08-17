export interface Media {
  id: string;
  collectionName: string;
  filename: string;
  originalName: string;
  extension: string;
  mimetype: string;
  size: number;
  directory: string;
  disk: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: {
    items: T[];
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

export interface Result<T> {
  status: boolean;
  message: string;
  data: T | null;
}

export interface UserFilterOptions {
  name?: string;
  age?: string;
  height?: string;
  weight?: string;
  lookingFor?: string;
  maritalStatus?: string;
  hasChildren?: boolean;
  monthlyIncome?: string;
  religion?: string;
  education?: string;
  politicalView?: string;
  country?: string;
  languageSpoken?: string;
  profession?: string;
  livingArrangement?: string;
  familyMember?: string;
  hasPet?: boolean;
  dietaryPreference?: string;
  joined?: string;
  smokingHabit?: string;
  drinkingHabit?: string;
  healthCondition?: string;
  accountType?: string;
  accountStatus?: string;
}
