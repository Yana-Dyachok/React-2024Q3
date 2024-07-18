import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Conditions } from '../../types/api-interface';
import { PATH } from '../../utils/const/const';

export const apiGetByIdSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: PATH }),
  endpoints: (builder) => ({
    fetchMedicalConditionById: builder.query<Conditions | null, string>({
      query: (uid) => `?uid=${uid}`,
      transformResponse: (response: { medicalCondition: Conditions }) =>
        response.medicalCondition,
    }),
  }),
});

export const { useFetchMedicalConditionByIdQuery } = apiGetByIdSlice;
