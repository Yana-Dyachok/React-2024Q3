import { ApiResponse, Conditions } from '../../types/api-interface';
export const mockResponse: ApiResponse = {
  page: {
    pageNumber: 1,
    pageSize: 10,
    numberOfElements: 10,
    totalElements: 15,
    totalPages: 35,
    firstPage: true,
    lastPage: false,
  },
  sort: {
    clauses: [['column', 'ASC']],
  },
  medicalConditions: [
    {
      uid: '2',
      name: 'ty',
      psychologicalCondition: false,
    },
  ],
};

export const mockGetByIdResponse: Conditions = {
  uid: '2',
  name: 'ty',
  psychologicalCondition: false,
};
