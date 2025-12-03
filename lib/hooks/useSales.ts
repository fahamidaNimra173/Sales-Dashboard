'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SalesResponse } from '@/lib/types';

// Function to fetch sales data
async function getSales(): Promise<SalesResponse> {
  // Get token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  
  if (!token) {
    throw new Error('No auth token found');
  }

  try {
    const response = await axios.get<SalesResponse>(
      'https://autobizz-425913.uc.r.appspot.com/sales',
      {
        headers: {
          'X-AUTOBIZZ-TOKEN': token,
        },
        params: {
          startDate: '2025-01-01',
          endDate: '2025-01-31',
          priceMin: '',
          email: '',
          phone: '',
          sortBy: 'date',
          sortOrder: 'asc',
          after: '',
          before: '',
        },
      }
    );

    console.log('Sales Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Sales Error:', error);
    throw error;
  }
}

// Hook to manage sales data
export function useSales() {
  return useQuery({
    queryKey: ['sales'],
    queryFn: getSales,
    staleTime: 5 * 60 * 1000,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('authToken'), // Only run if token exists
  });
}