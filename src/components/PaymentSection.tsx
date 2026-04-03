

import { useState } from "react";
import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Send,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function PaymentSection() {
  const [balance] = useState(2500);

  const transactions = [
    {
      sender: "Investor A",
      receiver: "Startup X",
      amount: "$500",
      status: "Completed",
      date: "03 Apr 2026",
    },
    {
      sender: "Investor B",
      receiver: "Startup Y",
      amount: "$300",
      status: "Pending",
      date: "02 Apr 2026",
    },
    {
      sender: "Investor C",
      receiver: "Startup Z",
      amount: "$1200",
      status: "Completed",
      date: "30 Mar 2026",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Wallet className="w-7 h-7 text-green-600" />
            Wallet & Payments
          </h2>
          <p className="text-gray-500 mt-1">
            Manage your balance and recent transactions
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl px-6 py-4 shadow-md min-w-[220px]">
          <p className="text-sm opacity-90">Available Balance</p>
          <h3 className="text-3xl font-bold mt-1">${balance}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all shadow-md">
          <ArrowDownCircle className="w-5 h-5" />
          Deposit
        </button>

        <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition-all shadow-md">
          <ArrowUpCircle className="w-5 h-5" />
          Withdraw
        </button>

        <button className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-all shadow-md">
          <Send className="w-5 h-5" />
          Transfer
        </button>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Transaction History
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Sender
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Receiver
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Amount
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-4 font-medium text-gray-800">
                    {tx.sender}
                  </td>
                  <td className="px-4 py-4 text-gray-700">{tx.receiver}</td>
                  <td className="px-4 py-4 font-semibold text-gray-900">
                    {tx.amount}
                  </td>
                  <td className="px-4 py-4 text-gray-600">{tx.date}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                        tx.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {tx.status === "Completed" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
