import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Sale } from '@/lib/types';

// Props for the SalesChart component
interface SalesChartProps {
  data: Sale[];
}

// Processed data point for the chart
interface ChartDataPoint {
  date: string;
  totalSales: number;
}

// Payload item structure for tooltip
interface TooltipPayloadItem {
  value: number;
  payload: ChartDataPoint;
}

// Custom tooltip props
interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

// Custom tooltip component for displaying hover information
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="bg-black border-2 px-4 py-3 rounded-lg shadow-lg"
        style={{ borderColor: '#a7cc3a' }}
      >
        <p className="text-white font-semibold mb-1">{payload[0].payload.date}</p>
        <p style={{ color: '#a7cc3a' }} className="font-bold">
          Total Sales: ${payload[0].value.toLocaleString('en-US', { 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 
          })}
        </p>
      </div>
    );
  }
  return null;
};

// Displays a line chart showing total sales amount by day
export default function SalesChart({ data }: SalesChartProps) {

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };
  
  const processChartData = (): ChartDataPoint[] => {
    const salesByDate = new Map<string, number>();
    
    data.forEach((sale) => {
      const date = sale.date;
      const currentTotal = salesByDate.get(date) || 0;
      salesByDate.set(date, currentTotal + sale.price);
    });
    
    const chartData: ChartDataPoint[] = Array.from(salesByDate.entries()).map(
      ([date, totalSales]) => ({
        date: formatDate(date),
        totalSales: Math.round(totalSales * 100) / 100,
      })
    );
    
    chartData.sort((a, b) => a.date.localeCompare(b.date));
    
    return chartData;
  };
  
  const chartData = processChartData();
  
  if (!data || data.length === 0) {
    return (
      <div className="bg-black p-8 rounded-lg border-2 text-center border-[#f490b5]" >
        <p className="text-white text-lg">No sales data available to display</p>
      </div>
    );
  }
  
  return (
    <div className="md:p-6 p-2 rounded-lg bg-[#8a55a6] border-2 mb-6 border-[#8a55a6]" >
      <div className="mb-4">
        <h2 className="text-3xl font-mono lg:text-5xl font-bold text-[#dffa12]" >
           Sales Trend
        </h2>
        <p className="text-md mt-1 text-[#ffffff]" >
          Total sales amount by day
        </p>
      </div>
      
      {/* Responsive Line Chart */}
      <div className="w-full -ml-8 h-[400px]" >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
             
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="date" 
              stroke="#fff"
              tick={{ fill: '#fff' }}
            />
            <YAxis 
              width={80}
              stroke="#fff"
              tick={{ fill: '#fff' }}
              tickFormatter={(value: number) => `${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: '#fff' }} iconType="line" />
            <Line 
              type="monotone" 
              dataKey="totalSales" 
              stroke="#f7dc61" 
              strokeWidth={3}
              dot={{ fill: '#263351', r: 4 }}
              activeDot={{ r: 6, fill: '#263351' }}
              name="Total Sales ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
