'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { SalesResponse, SalesFilters } from '@/lib/types';

// Function to fetch sales data
async function getSales(filters: SalesFilters): Promise<SalesResponse> {
  // Get token from localStorage
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    throw new Error('No auth token found');
  }

  const response = await axiosInstance.get<SalesResponse>('/sales', {
    headers: {
      'X-AUTOBIZZ-TOKEN': token, // Add token to header
    },
    params: {
      startDate: filters.startDate,
      endDate: filters.endDate,
      priceMin: filters.priceMin || '',
      email: filters.email || '',
      phone: filters.phone || '',
      sortBy: filters.sortBy || 'date',
      sortOrder: filters.sortOrder || 'asc',
      after: filters.after || '',
      before: filters.before || '',
    },
  });

  return response.data;
}

// Hook to manage sales data
export function useSales(filters: SalesFilters) {
  return useQuery({
    queryKey: ['sales', filters], // Re-fetch when filters change
    queryFn: () => getSales(filters),
    enabled: !!filters.startDate && !!filters.endDate, // Only fetch if dates exist
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}