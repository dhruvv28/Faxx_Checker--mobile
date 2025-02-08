import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const performanceData = [
  { date: '2024-01', return: 5.2 },
  { date: '2024-02', return: 3.8 },
  { date: '2024-03', return: 7.1 },
  { date: '2024-04', return: 4.5 },
  { date: '2024-05', return: 6.3 },
  { date: '2024-06', return: 5.9 },
];

const metrics = [
  {
    name: 'Alpha',
    value: '2.4%',
    change: '+0.3%',
    trend: 'up',
  },
  {
    name: 'Beta',
    value: '1.1',
    change: '-0.1',
    trend: 'down',
  },
  {
    name: 'Sharpe Ratio',
    value: '1.8',
    change: '+0.2',
    trend: 'up',
  },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Portfolio Analytics</h1>
        <button className="flex items-center gap-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          <Calendar className="h-4 w-4" />
          Last 6 Months
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
              <span
                className={`inline-flex items-center gap-x-1 rounded-full px-2 py-1 text-xs font-medium ${
                  metric.trend === 'up'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-red-50 text-red-600'
                }`}
              >
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {metric.change}
              </span>
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Performance Analysis</h2>
          <div className="flex items-center gap-x-2 text-sm text-gray-500">
            <TrendingUp className="h-4 w-4" />
            <span>Monthly Returns</span>
          </div>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('default', { month: 'short' });
                }}
              />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Return']}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleDateString('default', { month: 'long', year: 'numeric' });
                }}
              />
              <Line
                type="monotone"
                dataKey="return"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}