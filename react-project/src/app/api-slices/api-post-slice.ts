import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '../../types/api-interface';
import { PATH_SEARCH } from '../../utils/const/const';

export const apiPostSearchSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: PATH_SEARCH }),
  endpoints: (builder) => ({
    fetchPost: builder.query<
      ApiResponse,
      { searchQuery: string; pageSize: number; page: number }
    >({
      query: ({ searchQuery, pageSize, page }) => ({
        url: `${PATH_SEARCH}?pageNumber=${page - 1}&pageSize=${pageSize}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name: searchQuery }),
      }),
      transformResponse: (response: ApiResponse): ApiResponse => {
        return response as ApiResponse;
      },
    }),
  }),
});

export const { useFetchPostQuery } = apiPostSearchSlice;
