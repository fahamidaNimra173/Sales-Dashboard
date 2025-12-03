'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useSales } from '@/lib/hooks/useSales';
import { SalesFilters } from '@/lib/types';

import SalesTable from '@/components/dashboard/SalesTable';
import Pagination from '@/components/dashboard/Pagination';
import AllFilters from '@/components/dashboard/AllFilters';
import { IterationCw } from 'lucide-react';


// Define the type for filter updates from FilterPanel
interface FilterValues {
  startDate: string;
  endDate: string;
  priceMin: string;
  email: string;
  phone: string;
}

export default function DashboardPage() {
  const { data: token, isLoading: authLoading, error: authError } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);


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

  // Debug: Log filters whenever they change
  useEffect(() => {
    console.log('Filters updated:', filters);
  }, [filters]);

  const { data: salesData, isLoading: salesLoading, error: salesError, refetch } = useSales(filters);

  // Debug: Log sales data
  useEffect(() => {
    if (salesData) {
      console.log(' Sales Data:', salesData);
      console.log(' Number of sales:', salesData.results.Sales.length);
      console.log(' Before token:', salesData.pagination.before);
      console.log(' After token:', salesData.pagination.after);
    }
  }, [salesData]);

  // Function to handle filter changes from FilterPanel
  const handleFiltersChange = (newFilters: FilterValues) => {
    console.log('Updating filters with:', newFilters);
    setFilters((prev) => ({
      ...prev,
      startDate: newFilters.startDate,
      endDate: newFilters.endDate,
      priceMin: newFilters.priceMin,
      email: newFilters.email,
      phone: newFilters.phone,
      after: '', // Reset pagination when filters change
      before: '',
    }));
  };

  // Function to handle sorting
  const handleSort = (field: 'date' | 'price') => {
    console.log('Sorting by:', field);
    const newOrder =
      filters.sortBy === field && filters.sortOrder === 'asc'
        ? 'desc'
        : 'asc';



    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder: newOrder,
      after: '', // Reset pagination
      before: '',
    }));
  };

  // Function to handle pagination
  const handlePageChange = (direction: 'next' | 'prev', token: string) => {
   

    if (direction === 'next') {
      setCurrentPage(prev => prev + 1);

      setFilters(prev => ({
        ...prev,
        after: token,
        before: '',
      }));
    } else {
      setCurrentPage(prev => Math.max(1, prev - 1));

      setFilters(prev => ({
        ...prev,
        before: token,
        after: '',
      }));
    }
  };


  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: '#a7cc3a', borderTopColor: 'transparent' }}></div>
            <div className="absolute inset-2 rounded-full border-4 border-b-transparent animate-spin" style={{ borderColor: '#f490b5', borderBottomColor: 'transparent', animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h2 className="text-2xl font-bold" style={{ color: '#a7cc3a' }}>Authorizing...</h2>
          <p className="mt-2" style={{ color: '#f490b5' }}>Getting access token</p>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="text-center bg-black p-8 rounded-lg border-2" style={{ borderColor: '#f490b5' }}>
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold" style={{ color: '#f490b5' }}>Authorization Failed</h2>
          <p className="mt-4 text-white">{authError.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 rounded-lg font-medium text-black transition-all"
            style={{ backgroundColor: '#a7cc3a' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header Section */}
      <div className="border-b-2" style={{ borderColor: '#a7cc3a', backgroundColor: 'black' }}>
        <div className="container mx-auto p-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ color: '#a7cc3a' }}>
                Sales Dashboard
              </h1>
              <p className="text-sm" style={{ color: '#f490b5' }}>
                Monitor and analyze your sales data in real-time
              </p>
            </div>
            <div className="flex gap-3">

              {salesData && (
                <button
                  onClick={() => refetch()}
                  className="px-4 py-2 rounded-lg font-medium transition-all text-black"
                  style={{ backgroundColor: '#a7cc3a' }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <IterationCw className='text-blue-400' /> Refresh
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-7xl">
        {/* Debug Info - Collapsible */}


        <AllFilters onFiltersChange={handleFiltersChange} />

        {/* Loading State */}
        {salesLoading && (
          <div className="text-center py-16 bg-black rounded-lg border-2" style={{ borderColor: '#a7cc3a' }}>
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: '#a7cc3a', borderTopColor: 'transparent' }}></div>
            </div>
            <p className="font-medium" style={{ color: '#f490b5' }}>Loading sales data...</p>
          </div>
        )}

        {/* Error State */}
        {salesError && (
          <div className="bg-black border-2 px-6 py-5 rounded-lg mb-6" style={{ borderColor: '#f490b5' }}>
            <div className="flex items-start gap-3">
              <span className="text-3xl">⚠️</span>
              <div>
                <p className="font-bold text-lg" style={{ color: '#f490b5' }}>Error loading sales data</p>
                <p className="text-white mt-1">{salesError.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Sales Data Display */}
        {salesData && (
          <>
            {/* Stats Card */}
            <div className="bg-black p-6 rounded-lg mb-6 border-2" style={{ borderColor: '#a7cc3a' }}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">📊</div>
                  <div>
                    <p className="text-sm" style={{ color: '#f490b5' }}>Total Records</p>
                    <p className="text-3xl font-bold" style={{ color: '#a7cc3a' }}>
                      {salesData.results.Sales.length}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-white bg-gray-900 px-4 py-2 rounded-lg">
                  Showing results for {filters.startDate} to {filters.endDate}
                </div>
              </div>
            </div>

            <SalesTable
              data={salesData.results.Sales}
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              onSort={handleSort}
            />

            <Pagination

              before={salesData.pagination.before}
              after={salesData.pagination.after}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              currentPageLength={salesData.results.Sales.length}
            />
          </>
        )}
      </div>
    </div>
  );
}