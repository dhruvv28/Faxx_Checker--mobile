import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PieChart, LineChart, History, Settings, HelpCircle } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Portfolio', href: '/portfolio', icon: PieChart },
  { name: 'Transactions', href: '/transactions', icon: History },
  { name: 'Analytics', href: '/analytics', icon: LineChart },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 pt-16 pb-4">
      <div className="flex flex-col h-full">
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-x-3 px-3 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 px-3 py-4 space-y-1">
          <Link
            to="/settings"
            className="flex items-center gap-x-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <Settings className="h-5 w-5 text-gray-400" />
            Settings
          </Link>
          <Link
            to="/help"
            className="flex items-center gap-x-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <HelpCircle className="h-5 w-5 text-gray-400" />
            Help & Support
          </Link>
        </div>
      </div>
    </div>
  );
}