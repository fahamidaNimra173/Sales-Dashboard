'use client';

import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { SalesResponse, SalesFilters } from '@/lib/types';

// Function to fetch sales data with filters
async function getSales(filters: SalesFilters): Promise<SalesResponse> {
  // getting token from localStorage for authorization
  const token = localStorage.getItem('authToken') ;

  if (!token) {
    throw new Error('No auth token found');
  }

  // create params object with all the filter values to send with api and get desire data's
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

  console.log(' API Call Parameters:', params);
  // used try catch to hanlde error
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

    console.log('sales res', res.data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(' sales Err:', error.message);
      console.error(' error res', error.response?.data);
    } else {
      console.error('cant get the sales data for unknown error ', error);
    }
    throw error;
  }
}

//useSales hook to manage sales data, salesFilters is imported from types.ts to define types of filter
export function useSales(filters: SalesFilters) {
  console.log(' useSales called with filters:', filters);

  return useQuery({
    queryKey: ['sales', filters], // this will make the query re-run when filters change
    queryFn: () => getSales(filters), // this is the function that actually fetches the sales data
    enabled:
      !!localStorage.getItem('authToken') && // only fetch if user is logged in
      !!filters.startDate && // only fetch if start date is set. i have used default date to show some random sales on table otherwise it will be empty.
      !!filters.endDate, 
    staleTime: 30000, 
    refetchOnWindowFocus: false, // don't automatically refetch when user switches back to tab
  });

}