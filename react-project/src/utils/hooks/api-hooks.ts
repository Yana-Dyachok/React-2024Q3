import { useState, useEffect } from 'react';
import fetchMedicalConditionById from '@/app/api/api-get-byid';
import fetchDataConditions from '@/app/api/api-post';
import fetchData from '@/app/api/api-get';
import { Conditions, ApiResponse } from '@/types/api-interface';

export const useFetchMedicalConditionById = (uid: string) => {
  const [data, setData] = useState<Conditions | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchMedicalConditionById(uid);
        if (result) {
          setData(result);
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError('An error occurred while fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [uid]);

  return { data, error, isLoading };
};

export const useFetchPostQuery = (
  searchQuery: string,
  pageSize: number,
  page: number,
) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchDataConditions(searchQuery, pageSize, page);
        if (result) {
          setData(result);
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError('An error occurred while fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, pageSize, page]);

  return { data, error, isLoading };
};

export const useFetchMedicalConditions = (page: number, pageSize: number) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setIsLoading(true);
      try {
        const result = await fetchData(page, pageSize);
        setData(result);
      } catch (error) {
        setError('An error occurred while fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, [page, pageSize]);

  return { data, error, isLoading };
};
