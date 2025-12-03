'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

// defining types of filters
interface FilterValues {
  startDate: string;
  endDate: string;
  priceMin: string;
  email: string;
  phone: string;
}

// defining props for filter panel
interface FilterPanel {
  onFiltersChange: (filters: FilterValues) => void;
}

export default function AllFilters({ onFiltersChange }: FilterPanel) {
  // states to store filter values
  const [startDate, setStartDate] = useState('2025-01-01'); // give a default start and end date so table has some data and not e empty
  const [endDate, setEndDate] = useState('2025-01-31');     
  const [priceMin, setPriceMin] = useState('');             
  const [email, setEmail] = useState('');                   
  const [phone, setPhone] = useState('');                   
  const [isOpen, setIsOpen] = useState(false);             

  // this function to notify parent component about filter changes. like if i change the dates then it will tell the parent filter [AllFilter] that this are the new values for filter
  const notifyChange = (updates: Partial<FilterValues>) => {
    const newFilters: FilterValues = {
      startDate,
      endDate,
      priceMin,
      email,
      phone,
      ...updates, // apply the new change from input
    };

    // send new filters to parent
    onFiltersChange(newFilters);
  };

  // toggle function for showing/hiding filters on mobile
  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  // function to reset all filters to default values
  const clearAllFilters = () => {
    setStartDate('2025-01-01');
    setEndDate('2025-01-31');
    setPriceMin('');
    setEmail('');
    setPhone('');
    notifyChange({
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      priceMin: '',
      email: '',
      phone: '',
    });
  };

  return (
    <div className="bg-black p-6 rounded-lg shadow-md mb-6 border-2 border-[#8a55a6]" >
      
      <div 
        className="flex justify-between items-center cursor-pointer md:cursor-default"
        onClick={toggleFilters}
      >
        <h2 className="text-xl font-semibold" style={{ color: '#a7cc3a' }}>Filters</h2>
        <button 
          className="md:hidden text-2xl transition-transform duration-300"
          style={{ color: '#a7cc3a', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-label="Toggle filters"
        >
         <ChevronDown />
        </button>
      </div>
      
      {/* filters content - collapsible on mobile, always visible on desktop */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block mt-4`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

          {/* Start Date input */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#f490b5' }}>
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                notifyChange({ startDate: e.target.value });
              }}
              className="w-full px-3 py-2 rounded-md bg-white text-black"
              style={{ borderWidth: '2px', borderColor: '#a7cc3a' }}
            />
          </div>

          {/* End Date input */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#f490b5' }}>
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                notifyChange({ endDate: e.target.value });
              }}
              className="w-full px-3 py-2 rounded-md bg-white text-black"
              style={{ borderWidth: '2px', borderColor: '#a7cc3a' }}
            />
          </div>

          {/* Minimum Price input */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#f490b5' }}>
              Minimum Price
            </label>
            <input
              type="number"
              placeholder="e.g. 100"
              value={priceMin}
              onChange={(e) => {
                setPriceMin(e.target.value);
                notifyChange({ priceMin: e.target.value });
              }}
              className="w-full px-3 py-2 rounded-md bg-white text-black"
              style={{ borderWidth: '2px', borderColor: '#a7cc3a' }}
            />
          </div>

          {/* Customer Email input */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#f490b5' }}>
              Customer Email
            </label>
            <input
              type="email"
              placeholder="customer@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                notifyChange({ email: e.target.value });
              }}
              className="w-full px-3 py-2 rounded-md bg-white text-black"
              style={{ borderWidth: '2px', borderColor: '#a7cc3a' }}
            />
          </div>

          {/* Phone Number input */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#f490b5' }}>
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+11111111"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                notifyChange({ phone: e.target.value });
              }}
              className="w-full px-3 py-2 rounded-md bg-white text-black"
              style={{ borderWidth: '2px', borderColor: '#a7cc3a' }}
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-4">
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 rounded text-black font-medium"
            style={{ backgroundColor: '#f490b5' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
}
