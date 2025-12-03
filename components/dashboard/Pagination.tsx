'use client';

interface PaginationProps {
    before: string;
    after: string;
    currentPage: number;
    onPageChange: (direction: 'next' | 'prev', token: string) => void;
    currentPageLength?: number;
}

export default function Pagination({
    before,
    after,
    onPageChange,
    currentPage,
    currentPageLength = 0
}: PaginationProps) {

    const isLastPage = currentPageLength < 50;

    return (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

            {/* Previous */}
            <button
                onClick={() => onPageChange('prev', before)}
                disabled={currentPage === 1|| isLastPage}
                className="flex items-center gap-2 px-4 py-2 text-black rounded-md disabled:opacity-50"
                style={{ backgroundColor: '#a7cc3a' }}
            >
                Previous
            </button>

            {/* Next */}
            <button
                onClick={() => onPageChange('next', after)}
                disabled={!after || isLastPage}
                className="flex items-center gap-2 px-4 py-2 text-black rounded-md disabled:opacity-50"
                style={{ backgroundColor: '#a7cc3a' }}
            >
                Next
            </button>
        </div>
    );
}
