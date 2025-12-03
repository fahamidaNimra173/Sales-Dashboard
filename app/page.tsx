'use client'

// import SideBarDashboard from "@/components/dashboard/sideBar";
import { useAuth } from "@/lib/hooks/useAuth";
import { useSales } from "@/lib/hooks/useSales";
import { SalesFilters } from "@/lib/types";
import { useState } from "react";


export default function Home() {
  //  getting authorization token by using useAuth hook
  const { data: token, isLoading: authLoading, error: authError } = useAuth();
  const [filters, setFilters] = useState<SalesFilters>({
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    priceMin: '',
    email: '',
    phone: '',
    sortBy: 'date',
    sortOrder: 'asc',
    after: '',
    before: '',
  });
  
  //  getting sales data by using useAuth hook 
  const { data: salesData, isLoading: salesLoading, error: salesError } = useSales(filters);
  const updateFilter = (key: keyof SalesFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      // Reset pagination when other filters change
      ...(key !== 'after' && key !== 'before' ? { after: '', before: '' } : {}),
    }));
  };

  // Function to handle sorting
  const handleSort = (field: 'date' | 'price') => {
    const newOrder =
      filters.sortBy === field && filters.sortOrder === 'asc'
        ? 'desc'
        : 'asc';

    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder: newOrder,
      after: '', // Reset pagination on sort
      before: '',
    }));
  };
  // Function to handle pagination
  const handlePageChange = (direction: 'next' | 'prev', token: string) => {
    if (direction === 'next') {
      setFilters((prev) => ({ ...prev, after: token, before: '' }));
    } else {
      setFilters((prev) => ({ ...prev, before: token, after: '' }));
    }
  };

  // handeling loading and error of authorization token
  if (authLoading) {
    <div>
      <h1> the datas are comming... waiting to check authorization</h1>
    </div>
  }
  if (authError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-semibold">Authorization Failed</h2>
          <p className="mt-2">{authError.message}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Sales Dashboard</h1>

      {/* Filter Panel */}
     
      {/* Loading State */}
      {salesLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="text-gray-600 mt-2">Loading sales data...</p>
        </div>
      )}

      {/* Error State */}
      {salesError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
          <p className="font-semibold">Error loading sales data</p>
          <p className="text-sm">{salesError.message}</p>
        </div>
      )}

      {/* Sales Table */}
      {salesData && (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {salesData.results.Sales.length} sales
          </div>

         

          {/* Pagination */}
    
        </>
      )}
    </div>
  );
}
