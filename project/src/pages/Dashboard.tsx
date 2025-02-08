import { ArrowUpRight, ArrowDownRight, DollarSign, Percent, TrendingUp, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Jan', value: 4000 },
  { date: 'Feb', value: 3000 },
  { date: 'Mar', value: 5000 },
  { date: 'Apr', value: 2780 },
  { date: 'May', value: 6890 },
  { date: 'Jun', value: 2390 },
];

const stats = [
  {
    name: 'Total Portfolio Value',
    value: '$124,592.63',
    change: '+14.2%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    name: 'Today\'s Return',
    value: '$1,245.23',
    change: '+2.3%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    name: 'Total Return',
    value: '$34,592.63',
    change: '-4.5%',
    trend: 'down',
    icon: Activity,
  },
  {
    name: 'Annual Yield',
    value: '12.3%',
    change: '+1.2%',
    trend: 'up',
    icon: Percent,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="h-6 w-6 text-gray-400" />
              <span
                className={`inline-flex items-center gap-x-1 rounded-full px-2 py-1 text-xs font-medium ${
                  stat.trend === 'up'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-red-50 text-red-600'
                }`}
              >
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.name}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}