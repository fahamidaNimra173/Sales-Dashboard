'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthResponse } from '@/lib/types';

// function to get authorization token
async function getAuthorize(): Promise<string> {
  try {
    
    const response = await axios.post<AuthResponse>(
      'https://autobizz-425913.uc.r.appspot.com/getAuthorize',
      {
        tokenType: 'frontEndTest',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Auth Response:', response.data);
    
    // // Store token in localStorage

      localStorage.setItem('authToken', response.data.token);
    
    
    return response.data.token;
  } catch (error) {
    console.error('Auth Error:', error);
    throw error;
  }
}

// Hook to manage auth
export function useAuth() {
  return useQuery({
    queryKey: ['auth'],
    queryFn: getAuthorize,
    staleTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 1,
  });
}