'use client';

import { Sale } from '@/lib/types';

// defining the props for the main sales table component
interface SalesTableProps {
  data: Sale[];
  sortBy: 'date' | 'price';
  sortOrder: 'asc' | 'desc';
  onSort: (field: 'date' | 'price') => void; // function to call when user clicks a column to sort which returns nothing
}

// defining props for the small sort icon component
interface SortIconProps {
  field: 'date' | 'price';             // which column this icon belongs to
  sortBy: 'date' | 'price';            // current column used for sorting
  sortOrder: 'asc' | 'desc';           // current sort order
}

// small component to show sorting arrows on a date and price column
function SortIcon({ field, sortBy, sortOrder }: SortIconProps) {
  // sortBy → comes from the parent component. it tells which column is currently sorted ('date' or 'price').
  // field → comes from the SortIcon component itself. it tells which column this arrow belongs to ('date' or 'price').
  // sortBy === field → compares them:
  // if sortBy is 'date' and field is 'date', it's true → this column is active, show blue arrow.
  // if sortBy is 'price' and field is 'date', it's false → this column is not active, show neutral gray icon.
  // const isActive = ... → just saves the result (true or false) in a variable so we can use it later to decide which arrow to show.

  const isActive = sortBy === field;

  // if this column is not being sorted, show neutral gray icon
  if (!isActive) {
    return (
      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#f490b5' }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  }

  // if column is sorted ascending, show UP arrow
  if (sortOrder === 'asc') {
    return (
      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#a7cc3a' }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    );
  }

  // if column is sorted descending, show DOWN arrow
  return (
    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#a7cc3a' }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// main component to display sales data in a table
export default function SalesTable({ data, sortBy, sortOrder, onSort }: SalesTableProps) {
  return (
    <div className="bg-black rounded-lg shadow-md overflow-hidden mb-6 border-2" style={{ borderColor: '#a7cc3a' }}>
      {/* container for horizontal scroll on small screens */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b-2 bg-[#f5f5f5]" >
            <tr>
              {/* date column header with clickable sorting */}
              <th className="px-6 py-3 text-left text-black">
                <button
                  onClick={() => onSort('date')}
                  className="flex items-center gap-1 text-lg font-semibold text-black transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#f490b5'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                >
                  Date
                  <SortIcon field="date" sortBy={sortBy} sortOrder={sortOrder} />
                </button>

              </th>

              {/* price column header with clickable sorting */}
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => onSort('price')} // calls parent to sort by price
                  className="flex items-center text-lg font-semibold text-black transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#f490b5'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                >
                  Price
                  <SortIcon field="price" sortBy={sortBy} sortOrder={sortOrder} /> {/* show sort arrow */}
                </button>
              </th>

              {/* customer email column header */}
              <th className="px-6 py-3 text-left text-lg font-semibold text-black">
                Customer Email
              </th>

              {/* customer phone column header */}
              <th className="px-6 py-3 text-left text-lg font-semibold text-black">
                Phone Number
              </th>
            </tr>
          </thead>

          {/* table body */}
          <tbody className="divide-y" style={{ borderColor: '#a7cc3a' }}>
            {data.length === 0 ? (
              // show message if no data is available
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center" style={{ color: '#f490b5' }}>
                  No sales data found
                </td>
              </tr>
            ) : (
              // render each sale row
              data.map((sale) => (
                <tr key={sale._id} className="transition-colors" style={{ backgroundColor: 'black' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'black'}
                >
                  <td className="px-6 py-4 text-lg" style={{ color: '#a7cc3a' }}>
                    {/* format date and time nicely */}
                    {new Date(sale.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}{' '}
                    {new Date(sale.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-4 text-lg font-medium" style={{ color: '#f490b5' }}>
                    ${sale.price.toLocaleString()} {/* format price with commas */}
                  </td>
                  <td className="px-6 py-4 text-lg text-white">
                    {sale.customerEmail}
                  </td>
                  <td className="px-6 py-4 text-lg text-white">
                    {sale.customerPhone}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}