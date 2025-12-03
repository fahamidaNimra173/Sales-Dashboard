'use client'
import SalesTable from "@/components/dashboard/SalesTable";
// import SideBarDashboard from "@/components/dashboard/sideBar";
import { useAuth } from "@/lib/hooks/useAuth";
import { useSales } from "@/lib/hooks/useSales";


export default function Home() {
  //  getting authorization token by using useAuth hook
  const { data: token, isLoading: authLoading, error: authError } = useAuth();

  //  getting sales data by using useAuth hook 
  const { data: salesData, isLoading: salesLoading, error: salesError } = useSales();

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
    <div className="flex  min-h-screen items-center justify-center  font-sans bg-black">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Sales Dashboard</h1>

        {/* Loading State */}
        {salesLoading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading sales data...</p>
          </div>
        )}

        {/* Error State */}
        {salesError && (
          <div className="text-center py-8 text-red-600">
            <p>Error loading sales: {salesError.message}</p>
          </div>
        )}

        {/* Table */}
        {salesData && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Sales Details ({salesData.results.Sales.length} items)
            </h2>
            <SalesTable data={salesData.results.Sales} />
          </div>
        )}
      </div>
      {/* <div className="">
        <SideBarDashboard></SideBarDashboard>
      </div> */}
    </div>
  );
}
