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
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-01-31');     
  const [priceMin, setPriceMin] = useState('');             
  const [email, setEmail] = useState('');                   
  const [phone, setPhone] = useState('');                   
  const [isOpen, setIsOpen] = useState(false);             

  // this function to notify parent component about filter changes
  const notifyChange = (updates: Partial<FilterValues>) => {
    const newFilters: FilterValues = {
      startDate,
      endDate,
      priceMin,
      email,
      phone,
      ...updates,
    };
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
    <div className="relative mb-6">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/70  to-[#e1f761]/50 rounded-2xl blur-xl"></div>
      
      {/* Glass container */}
      <div 
        className="relative backdrop-blur-xl bg-black/40 p-6 rounded-2xl shadow-2xl border border-purple-500/30"
        style={{
          boxShadow: '0 8px 32px 0 rgba(138, 85, 166, 0.5), inset 0 0 20px rgba(167, 204, 58, 0.15)'
        }}
      >
        
        <div 
          className="flex justify-between items-center cursor-pointer md:cursor-default"
          onClick={toggleFilters}
        >
          <h2 
            className="text-2xl md:text-4xl   mx-auto font-mono font-bold my-3 border-b-2 border-yellow-500/20 bg-gradient-to-r from-green-400 to-lime-300 bg-clip-text text-transparent"
            style={{
              textShadow: '0 0 20px rgba(167, 204, 58, 0.5)'
            }}
          >
            Filters
          </h2>
          <button 
            className="md:hidden text-2xl transition-all duration-300"
            style={{ 
              color: '#a7cc3a',
              filter: 'drop-shadow(0 0 8px rgba(167, 204, 58, 0.6))',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' 
            }}
            aria-label="Toggle filters"
          >
            <ChevronDown />
          </button>
        </div>
        
        {/* filters content */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:block mt-6`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

            {/* Start Date input */}
            <div className="group">
              <label 
                className="block text-sm font-semibold mb-2 text-pink-300"
                style={{
                  textShadow: '0 0 10px rgba(244, 144, 181, 0.5)'
                }}
              >
                Start Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    notifyChange({ startDate: e.target.value });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-black/30 backdrop-blur-sm text-white border border-green-400/50 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all"
                  style={{
                    boxShadow: '0 0 15px rgba(167, 204, 58, 0.3)'
                  }}
                />
              </div>
            </div>

            {/* End Date input */}
            <div className="group">
              <label 
                className="block text-sm font-semibold mb-2 text-pink-300"
                style={{
                  textShadow: '0 0 10px rgba(244, 144, 181, 0.5)'
                }}
              >
                End Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    notifyChange({ endDate: e.target.value });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-black/30 backdrop-blur-sm text-white border border-green-400/50 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all"
                  style={{
                    boxShadow: '0 0 15px rgba(167, 204, 58, 0.3)'
                  }}
                />
              </div>
            </div>

            {/* Minimum Price input */}
            <div className="group">
              <label 
                className="block text-sm font-semibold mb-2 text-pink-300"
                style={{
                  textShadow: '0 0 10px rgba(244, 144, 181, 0.5)'
                }}
              >
                Minimum Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="e.g. 100"
                  value={priceMin}
                  onChange={(e) => {
                    setPriceMin(e.target.value);
                    notifyChange({ priceMin: e.target.value });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-black/30 backdrop-blur-sm text-white placeholder-white/50 border border-green-400/50 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all"
                  style={{
                    boxShadow: '0 0 15px rgba(167, 204, 58, 0.3)'
                  }}
                />
              </div>
            </div>

            {/* Customer Email input */}
            <div className="group">
              <label 
                className="block text-sm font-semibold mb-2 text-pink-300"
                style={{
                  textShadow: '0 0 10px rgba(244, 144, 181, 0.5)'
                }}
              >
                Customer Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="customer@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    notifyChange({ email: e.target.value });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/40 border border-green-400/50 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all"
                  style={{
                    boxShadow: '0 0 15px rgba(167, 204, 58, 0.2)'
                  }}
                />
              </div>
            </div>

            {/* Phone Number input */}
            <div className="group">
              <label 
                className="block text-sm font-semibold mb-2 text-pink-300"
                style={{
                  textShadow: '0 0 10px rgba(244, 144, 181, 0.5)'
                }}
              >
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+11111111"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    notifyChange({ phone: e.target.value });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/40 border border-green-400/50 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all"
                  style={{
                    boxShadow: '0 0 15px rgba(167, 204, 58, 0.2)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="mt-6">
            <button
              onClick={clearAllFilters}
              className="relative px-6 py-2.5 rounded-lg font-semibold text-white overflow-hidden group transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #f490b5 0%, #ff6ba9 100%)',
                boxShadow: '0 0 20px rgba(244, 144, 181, 0.5), 0 4px 15px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(244, 144, 181, 0.8), 0 4px 20px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(244, 144, 181, 0.5), 0 4px 15px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span className="relative z-10">Clear All Filters</span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}