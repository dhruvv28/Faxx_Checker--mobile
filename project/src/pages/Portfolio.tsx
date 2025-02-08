import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const data = [
  { name: 'Stocks', value: 45000 },
  { name: 'Bonds', value: 25000 },
  { name: 'Crypto', value: 15000 },
  { name: 'Cash', value: 15000 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6366F1'];

const investments = [
  {
    name: 'Apple Inc.',
    symbol: 'AAPL',
    shares: 50,
    price: 150.23,
    change: '+2.3%',
    value: 7511.50,
    trend: 'up',
  },
  {
    name: 'Microsoft',
    symbol: 'MSFT',
    shares: 30,
    price: 290.45,
    change: '-1.2%',
    value: 8713.50,
    trend: 'down',
  },
  // Add more investments as needed
];

export default function Portfolio() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Buy Investment
            </button>
            <button className="w-full py-2 px-4 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
              Sell Investment
            </button>
            <button className="w-full py-2 px-4 bg-white text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
              Set Alert
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Investment Holdings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Shares</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Change</th>
                  <th className="pb-3 font-medium text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((investment) => (
                  <tr key={investment.symbol} className="border-b border-gray-200">
                    <td className="py-4">
                      <div>
                        <div className="font-medium text-gray-900">{investment.name}</div>
                        <div className="text-sm text-gray-500">{investment.symbol}</div>
                      </div>
                    </td>
                    <td className="py-4">{investment.shares}</td>
                    <td className="py-4">${investment.price.toFixed(2)}</td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-x-1 rounded-full px-2 py-1 text-xs font-medium ${
                          investment.trend === 'up'
                            ? 'bg-green-50 text-green-600'
                            : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {investment.trend === 'up' ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {investment.change}
                      </span>
                    </td>
                    <td className="py-4 text-right">${investment.value.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}