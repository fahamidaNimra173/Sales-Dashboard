'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useSales } from '@/lib/hooks/useSales';
import { SalesFilters } from '@/lib/types';

import SalesTable from '@/components/dashboard/SalesTable';
import Pagination from '@/components/dashboard/Pagination';
import AllFilters from '@/components/dashboard/AllFilters';
import {  TriangleAlert } from 'lucide-react';
import SalesChart from '@/components/dashboard/SalesChart';


/**
 * Defines the structure of filter values that come from the FilterPanel component.
 * These values control what sales data is fetched from the API.
 */
interface FilterValues {
  startDate: string;  
  endDate: string;    
  priceMin: string;   
  email: string;      
  phone: string;      
}



export default function DashboardPage() {
 // useAuth hook to get token 
  const { data: token, isLoading: authLoading, error: authError } = useAuth();

 //storing current page number for pagination
  const [currentPage, setCurrentPage] = useState(1);

  
   // storing filters values to pass in AllFilter component
   
   
  const [filters, setFilters] = useState<SalesFilters>({
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    priceMin: '',
    email: '',
    phone: '',
    sortBy: 'date',
    sortOrder: 'asc',
    after: '',   // Token for "next page"
    before: '',  // Token for "previous page"
  });

 // sels data hook to get all sels data with filteration
  const { data: salesData, isLoading: salesLoading, error: salesError } = useSales(filters);

  // colsole the sales data to debug the problem
  useEffect(() => {
    if (salesData) {
      console.log('Sales Data:', salesData);
      console.log('Number of sales:', salesData.results.Sales.length);
      console.log('Before token:', salesData.pagination.before);
      console.log('After token:', salesData.pagination.after);
    }
  }, [salesData]);

  
  
  // Handle Filter Changes
  
  // Called when user updates any filter in the AllFilters component.
  // Updates the filters state and resets pagination to page 1.
  //  newFilters - Object containing updated filter values
  //  When filters change, we reset pagination tokens to start fresh
  
  const handleFiltersChange = (newFilters: FilterValues) => {
    console.log('Updating filters with:', newFilters);
    setFilters((prev) => ({
      ...prev,
      startDate: newFilters.startDate,
      endDate: newFilters.endDate,
      priceMin: newFilters.priceMin,
      email: newFilters.email,
      phone: newFilters.phone,
      after: '',   // reset pagination when filters change
      before: '',
    }));
  };

  
  const handleSort = (field: 'date' | 'price') => {
    console.log('Sorting by:', field);

    // Determine new sort order
    const newOrder =
      filters.sortBy === field && filters.sortOrder === 'asc'
        ? 'desc'
        : 'asc';

    // Update filters with new sort configuration
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder: newOrder,
      after: '',   // Reset pagination
      before: '',
    }));
  };

   // Handles pagination logic.
  // If user clicks "Next": increase page number, send the "after" token, and clear "before".
  // If user clicks "Previous": decrease page number (never below 1), send the "before" token, and clear "after".
  const handlePageChange = (direction: 'next' | 'prev', token: string) => {
    if (direction === 'next') {
      // Move to next page
      setCurrentPage(prev => prev + 1);
      setFilters(prev => ({
        ...prev,
        after: token,    // Set the "after" cursor
        before: '',      // Clear the "before" cursor
      }));
    } else {
      // Move to previous page
      setCurrentPage(prev => Math.max(1, prev - 1));  // Never go below page 1
      setFilters(prev => ({
        ...prev,
        before: token,   // Set the "before" cursor
        after: '',       // Clear the "after" cursor
      }));
    }
  };

  
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="text-center">
          {/* Dual-ring loading spinner */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            {/* Outer ring - spins clockwise */}
            <div
              className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: '#a7cc3a', borderTopColor: 'transparent' }}
            ></div>
            {/* Inner ring - spins counter-clockwise */}
            <div
              className="absolute inset-2 rounded-full border-4 border-b-transparent animate-spin"
              style={{
                borderColor: '#f490b5',
                borderBottomColor: 'transparent',
                animationDirection: 'reverse',
                animationDuration: '1.5s'
              }}
            ></div>
          </div>
          <h2 className="text-2xl font-bold" style={{ color: '#a7cc3a' }}>Authorizing...</h2>
          <p className="mt-2" style={{ color: '#f490b5' }}>Getting access token</p>
        </div>
      </div>
    );
  }

 // showing error if authentication fails
  if (authError) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="text-center bg-black p-8 rounded-lg border-2" style={{ borderColor: '#f490b5' }}>
          {/* Warning icon */}
          <div className="text-6xl text-yellow-400 mb-4">
            <TriangleAlert />
          </div>

          {/* Error message */}
          <h2 className="text-2xl font-bold" style={{ color: '#f490b5' }}>
            Authorization Failed
          </h2>
          <p className="mt-4 text-white">{authError.message}</p>

          {/* Retry button */}
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

  
  //                 MAIN DASHBOARD CONTENT
  // --------------------------------------------------------------------------

  return (
    <div className="min-h-screen pt-20 bg-black dark:bg-black" >
      <div className="container mx-auto p-6 max-w-7xl">

        {
          salesData&&<>
          <SalesChart data={salesData.results.Sales}></SalesChart>
          </>
        }
       
        {/* AllFilters component renders date range, price, email, and phone filters. */}
       
        <AllFilters onFiltersChange={handleFiltersChange} />

       
        {salesLoading && (
          <div className="text-center py-16 bg-black rounded-lg border-2" style={{ borderColor: '#a7cc3a' }}>
            {/* Loading spinner */}
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div
                className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
                style={{ borderColor: '#a7cc3a', borderTopColor: 'transparent' }}
              ></div>
            </div>
            <p className="font-bold text-lg text-[#f490b5]">Loading sales data...</p>
          </div>
        )}

       
        {salesError && (
          <div className="bg-black border-2 px-6 py-5 rounded-lg mb-6" style={{ borderColor: '#f490b5' }}>
            <div className="flex items-start gap-3">
              {/* Error icon */}
              <span className="text-3xl">
                <TriangleAlert />
              </span>

              {/* Error details */}
              <div>
                <p className="font-bold text-lg" style={{ color: '#f490b5' }}>
                  Error loading sales data
                </p>
                <p className="text-white mt-1">{salesError.message}</p>
              </div>
            </div>
          </div>
        )}



       
        {salesData && (
          <>
           
           
             {/* it displays Total number of records in current view  and date range*/}
           
            <div className="bg-black p-6 rounded-lg mb-6 border-2" style={{ borderColor: '#a7cc3a' }}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                {/* Record count display */}
                <div className="flex items-center gap-3">
                  <div className="text-4xl">📊</div>
                  <div>
                    <p className="text-sm" style={{ color: '#f490b5' }}>Total Records</p>
                    <p className="text-3xl font-bold" style={{ color: '#a7cc3a' }}>
                      {salesData.results.Sales.length}
                    </p>
                  </div>
                </div>

                {/* Date range badge */}
                <div className="text-sm text-white bg-gray-900 px-4 py-2 rounded-lg">
                  Showing results for {filters.startDate} to {filters.endDate}
                </div>
              </div>
            </div>

           

            
            {/* Sales Table Component
          
            Displays sales data in a sortable table format.
          
            Props:
            - data: Array of sales records to display
            - sortBy: Current sort field ('date' or 'price')
            - sortOrder: Current sort order ('asc' or 'desc')
            - onSort: Callback function when user clicks column header */}
            
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