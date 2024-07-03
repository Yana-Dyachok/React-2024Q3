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

interface MedicalConditions {
  conditions: string[][];
}

export interface ApiResponse {
  page: Page;
  sort: Sort;
  medicalConditions: MedicalConditions;
}
