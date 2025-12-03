import { SalesFilters } from '@/lib/types';




interface FiltersPanel {
    filters: SalesFilters;
    //here the onUpdateFilter is a function , to update any specific filter among all filters like if i want to update minprice filter then key will take filter name: minPrice and value will take its value like 400$ 
    onUpdateFilter: (key: keyof SalesFilters, value: string) => void //used void to not return anything 

}
const AllFilters = ({ filters, onUpdateFilter }: FiltersPanel) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Start Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                    </label>
                    <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => onUpdateFilter('startDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* End Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                    </label>
                    <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => onUpdateFilter('endDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Minimum Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Price
                    </label>
                    <input
                        type="number"
                        placeholder="e.g. 100"
                        value={filters.priceMin}
                        onChange={(e) => onUpdateFilter('priceMin', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Customer Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Customer Email
                    </label>
                    <input
                        type="email"
                        placeholder="customer@email.com"
                        value={filters.email}
                        onChange={(e) => onUpdateFilter('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        placeholder="+11111111"
                        value={filters.phone}
                        onChange={(e) => onUpdateFilter('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a6d6f7]"
                    />
                </div>
            </div>

            {/* Active Filters Info */}
            <div className="mt-4 flex flex-wrap gap-2">
                {filters.priceMin && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                        Min Price: ${filters.priceMin}
                        <button
                            onClick={() => onUpdateFilter('priceMin', '')}
                            className="ml-2 text-[#f490b5] hover:text-[#a6d6f7]"
                        >
                            ×
                        </button>
                    </span>
                )}
                {filters.email && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                        Email: {filters.email}
                        <button
                            onClick={() => onUpdateFilter('email', '')}
                            className="ml-2 text-[#f490b5] hover:text-[#a6d6f7]"
                        >
                            ×
                        </button>
                    </span>
                )}
                {filters.phone && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                        Phone: {filters.phone}
                        <button
                            onClick={() => onUpdateFilter('phone', '')}
                            className="ml-2 text-[#f490b5] hover:text-blue-800"
                        >
                            ×
                        </button>
                    </span>
                )}
            </div>
        </div>
    );
};

export default AllFilters;