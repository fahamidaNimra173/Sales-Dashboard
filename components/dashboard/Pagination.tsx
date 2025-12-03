'use client';

import { useState } from 'react';

interface PaginationProps {
  before: string;
  after: string;
  onPageChange: (direction: 'next' | 'prev', token: string) => void;
  totalCount?: number;
}

export default function Pagination({ before, after, onPageChange, totalCount = 0 }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
// this function handle changing pages like is next is clicked then it will give user next 50 datas
  const handlePageChange = (direction: 'next' | 'prev', token: string) => {
    if (direction === 'next') {
      setCurrentPage(prev => prev + 1);
    } else {
      setCurrentPage(prev => Math.max(1, prev - 1));
    }
    onPageChange(direction, token);
  };
//this function handles which button has clicked like previous button or next button
  const handlePageClick = (pageNum: number) => {
    if (pageNum > currentPage && after) {
      handlePageChange('next', after);
    } else if (pageNum < currentPage && before) {
      handlePageChange('prev', before);
    }
  };

  // generate page numbers to display between buttons
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange('prev', before)}
        disabled={!before}
        className="flex items-center gap-2 px-4 py-2 text-black rounded-md transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#a7cc3a' }}
        onMouseEnter={(e) => !before ? null : e.currentTarget.style.opacity = '0.8'}
        onMouseLeave={(e) => !before ? null : e.currentTarget.style.opacity = '1'}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
            clipRule="evenodd" 
          />
        </svg>
        Previous
      </button>

      {/* Page Numbers */}
      {totalPages > 0 && (
        <div className="flex gap-1">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span 
                key={`ellipsis-${index}`} 
                className="px-3 py-2 text-white"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageClick(page as number)}
                disabled={page === currentPage}
                className="px-3 py-2 rounded-md font-medium transition-colors min-w-[40px]"
                style={{
                  backgroundColor: page === currentPage ? '#f490b5' : 'black',
                  color: page === currentPage ? 'black' : '#a7cc3a',
                  border: `2px solid ${page === currentPage ? '#f490b5' : '#a7cc3a'}`,
                  cursor: page === currentPage ? 'default' : 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (page !== currentPage) {
                    e.currentTarget.style.backgroundColor = '#a7cc3a';
                    e.currentTarget.style.color = 'black';
                  }
                }}
                onMouseLeave={(e) => {
                  if (page !== currentPage) {
                    e.currentTarget.style.backgroundColor = 'black';
                    e.currentTarget.style.color = '#a7cc3a';
                  }
                }}
              >
                {page}
              </button>
            )
          ))}
        </div>
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange('next', after)}
        disabled={!after}
        className="flex items-center gap-2 px-4 py-2 text-black rounded-md transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#a7cc3a' }}
        onMouseEnter={(e) => !after ? null : e.currentTarget.style.opacity = '0.8'}
        onMouseLeave={(e) => !after ? null : e.currentTarget.style.opacity = '1'}
      >
        Next
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>
    </div>
  );
}