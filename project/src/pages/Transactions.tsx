import React from 'react';
import { ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';

const transactions = [
  {
    id: 1,
    type: 'buy',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 10,
    price: 150.23,
    total: 1502.30,
    date: '2024-03-15',
  },
  {
    id: 2,
    type: 'sell',
    symbol: 'MSFT',
    name: 'Microsoft',
    shares: 5,
    price: 290.45,
    total: 1452.25,
    date: '2024-03-14',
  },
];

export default function Transactions() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Transaction History</h1>
        <button className="flex items-center gap-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Symbol</th>
                  <th className="pb-3 font-medium">Shares</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-200">
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-x-1 rounded-full px-2 py-1 text-xs font-medium ${
                          transaction.type === 'buy'
                            ? 'bg-green-50 text-green-600'
                            : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {transaction.type === 'buy' ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {transaction.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4">
                      <div>
                        <div className="font-medium text-gray-900">{transaction.symbol}</div>
                        <div className="text-sm text-gray-500">{transaction.name}</div>
                      </div>
                    </td>
                    <td className="py-4">{transaction.shares}</td>
                    <td className="py-4">${transaction.price.toFixed(2)}</td>
                    <td className="py-4">${transaction.total.toFixed(2)}</td>
                    <td className="py-4">{new Date(transaction.date).toLocaleDateString()}</td>
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