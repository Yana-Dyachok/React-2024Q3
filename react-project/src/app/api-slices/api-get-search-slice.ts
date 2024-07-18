import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '../../types/api-interface';
import { PATH_SEARCH } from '../../utils/const/const';

export const apiGetSearchSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: PATH_SEARCH }),
  endpoints: (builder) => ({
    fetchGet: builder.query<ApiResponse, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => {
        const params = new URLSearchParams({
          pageNumber: (page - 1).toString(),
          pageSize: pageSize.toString(),
        }).toString();
        return `${PATH_SEARCH}?${params.toString()}`;
      },
      transformResponse: (response: ApiResponse): ApiResponse => {
        return response as ApiResponse;
      },
    }),
  }),
});

export const { useFetchGetQuery } = apiGetSearchSlice;
