'use client';

import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { SalesResponse, SalesFilters } from '@/lib/types';

// Function to fetch sales data with filters
async function getSales(filters: SalesFilters): Promise<SalesResponse> {
  // Only access localStorage on client
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  if (!token) {
    throw new Error('No auth token found');
  }

  // Build API parameters from filters
  const params = {
    startDate: filters.startDate,
    endDate: filters.endDate,
    priceMin: filters.priceMin || '',
    email: filters.email || '',
    phone: filters.phone || '',
    sortBy: filters.sortBy || 'date',
    sortOrder: filters.sortOrder || 'asc',
    after: filters.after || '',
    before: filters.before || '',
  };

  console.log('API Call Parameters:', params);

  try {
    const res = await axios.get<SalesResponse>(
      'https://autobizz-425913.uc.r.appspot.com/sales',
      {
        headers: {
          'X-AUTOBIZZ-TOKEN': token,
        },
        params: params,
      }
    );

    console.log('Sales Response:', res.data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Sales Axios Error:', error.message);
      console.error('Response Data:', error.response?.data);
    } else {
      console.error('Unknown Sales Error:', error);
    }
    throw error;
  }
}

// Hook to fetch sales data with React Query
export function useSales(filters: SalesFilters) {
  console.log('useSales called with filters:', filters);

  const isClient = typeof window !== 'undefined'; // check if running on browser
  const hasToken = isClient && !!localStorage.getItem('authToken');

  return useQuery({
    queryKey: ['sales', filters], // re-fetch when filters change
    queryFn: () => getSales(filters),
    enabled:
      isClient && // only run on client
      hasToken && // only run if token exists
      !!filters.startDate &&
      !!filters.endDate,
    staleTime: 30000,
    refetchOnWindowFocus: false, // don't auto refetch on tab focus
  });
}
