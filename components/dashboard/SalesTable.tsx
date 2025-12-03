'use client';

import { Sale } from '@/lib/types';

interface SalesTableProps {
  data: Sale[];
}

export default function SalesTable({ data }: SalesTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Customer Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Phone Number</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((sale) => (
              <tr key={sale._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">
                  {new Date(sale.date).toLocaleDateString()} {new Date(sale.date).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  ${sale.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm">{sale.customerEmail}</td>
                <td className="px-6 py-4 text-sm">{sale.customerPhone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}