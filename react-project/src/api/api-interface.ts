export interface Page {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
}

interface Sort {
  clauses: string[][];
}

export interface Conditions {
  uid: string;
  name: string;
  psychologicalCondition: boolean;
}

export interface ApiResponse {
  page: Page;
  sort: Sort;
  medicalConditions: Conditions[];
}
