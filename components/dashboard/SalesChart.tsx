import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
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
  
  // Process sales data by grouping by date and summing total sales
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
  
  // Handle empty data state
  if (!data || data.length === 0) {
    return (
      <div className="bg-black p-8 rounded-lg border-2 text-center" style={{ borderColor: '#f490b5' }}>
        <p className="text-white text-lg">No sales data available to display</p>
      </div>
    );
  }
  
  return (
    <div className="bg-black p-6 rounded-lg border-2 mb-6" style={{ borderColor: '#a7cc3a' }}>
      {/* Chart header with title and description */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold" style={{ color: '#a7cc3a' }}>
          📈 Sales Trend
        </h2>
        <p className="text-sm mt-1" style={{ color: '#f490b5' }}>
          Total sales amount by day
        </p>
      </div>
      
      {/* Line chart visualization */}
      <div className="w-full overflow-x-auto">
        <LineChart
          style={{ 
            width: '100%', 
            maxWidth: '100%', 
            minWidth: '600px',
            maxHeight: '70vh', 
            aspectRatio: 1.618 
          }}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
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
          <Legend 
            wrapperStyle={{ color: '#fff' }}
            iconType="line"
          />
          <Line 
            type="monotone" 
            dataKey="totalSales" 
            stroke="#a7cc3a" 
            strokeWidth={3}
            dot={{ fill: '#a7cc3a', r: 4 }}
            activeDot={{ r: 6, fill: '#f490b5' }}
            name="Total Sales ($)"
          />
        </LineChart>
      </div>
    </div>
  );
}