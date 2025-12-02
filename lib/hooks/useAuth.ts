'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { AuthResponse } from '@/lib/types';

// Function to get authorization token
async function getAuthorize(): Promise<string> {
  const response = await axiosInstance.post<AuthResponse>('/getAuthorize', {
    tokenType: 'frontEndTest',
  });
  
  // Store token in localStorage
  localStorage.setItem('authToken', response.data.token);
  
  return response.data.token;
}

// Hook to manage auth
export function useAuth() {
  return useQuery({
    queryKey: ['auth'],
    queryFn: getAuthorize,
    staleTime: 2 * 60 * 60 * 1000, // 2 hours (token validity)
    gcTime: 2 * 60 * 60 * 1000, // Keep in cache for 2 hours
    retry: 1,
  });
}