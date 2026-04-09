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
  const [balance, setBalance] = useState(2500);
  const [selectedAction, setSelectedAction] = useState<
    "deposit" | "withdraw" | "transfer" | null
  >(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const [transactions, setTransactions] = useState([
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
  ]);

  const actionConfig = {
    deposit: {
      title: "Deposit Funds",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    withdraw: {
      title: "Withdraw Funds",
      color: "bg-red-600 hover:bg-red-700",
    },
    transfer: {
      title: "Transfer Funds",
      color: "bg-purple-600 hover:bg-purple-700",
    },
  };

  const handleSubmit = () => {
    const value = Number(amount);

    if (!value || value <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    if ((selectedAction === "withdraw" || selectedAction === "transfer") && value > balance) {
      setMessage("Insufficient balance.");
      return;
    }

    let updatedBalance = balance;

    if (selectedAction === "deposit") {
      updatedBalance += value;
    } else {
      updatedBalance -= value;
    }

    setBalance(updatedBalance);

    const newTransaction = {
      sender:
        selectedAction === "deposit"
          ? "External Account"
          : "You",
      receiver:
        selectedAction === "transfer"
          ? "Startup Wallet"
          : "Wallet",
      amount: `$${value}`,
      status: "Completed",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setTransactions([newTransaction, ...transactions]);
    setMessage(
      `${actionConfig[selectedAction!].title} successful!`
    );

    setTimeout(() => {
      setSelectedAction(null);
      setAmount("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-700 p-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Wallet & Payments
              </h2>
              <p className="text-slate-200 mt-2 text-sm md:text-base">
                Manage deposits, withdrawals, transfers, and track every payment.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-5 min-w-[240px]">
              <p className="text-sm uppercase tracking-wider text-slate-300">
                Available Balance
              </p>
              <h3 className="text-4xl font-extrabold mt-2">
                ${balance.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => setSelectedAction("deposit")}
              className="group rounded-2xl bg-blue-600 hover:bg-blue-700 text-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-lg font-semibold">Deposit</div>
              <div className="text-sm text-blue-100 mt-1">
                Add money to your wallet
              </div>
            </button>

            <button
              onClick={() => setSelectedAction("withdraw")}
              className="group rounded-2xl bg-red-600 hover:bg-red-700 text-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-lg font-semibold">Withdraw</div>
              <div className="text-sm text-red-100 mt-1">
                Transfer money to your bank
              </div>
            </button>

            <button
              onClick={() => setSelectedAction("transfer")}
              className="group rounded-2xl bg-purple-600 hover:bg-purple-700 text-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-lg font-semibold">Transfer</div>
              <div className="text-sm text-purple-100 mt-1">
                Send funds instantly
              </div>
            </button>
          </div>

          {selectedAction && (
            <div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-inner animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800">
                  {actionConfig[selectedAction].title}
                </h3>
                <button
                  onClick={() => {
                    setSelectedAction(null);
                    setAmount("");
                    setMessage("");
                  }}
                  className="text-slate-500 hover:text-slate-700 text-sm font-medium"
                >
                  Close
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                  onClick={handleSubmit}
                  className={`rounded-2xl px-6 py-3 text-white font-semibold shadow-lg transition ${actionConfig[selectedAction].color}`}
                >
                  Confirm
                </button>
              </div>

              {message && (
                <div className="mt-4 rounded-2xl bg-emerald-100 text-emerald-700 px-4 py-3 text-sm font-medium">
                  {message}
                </div>
              )}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-bold text-slate-900">
                Recent Transactions
              </h3>

              <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition">
                View All
              </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
              <table className="w-full">
                <thead className="bg-slate-100 text-slate-700 text-sm uppercase tracking-wide">
                  <tr>
                    <th className="px-6 py-4 text-left">Sender</th>
                    <th className="px-6 py-4 text-left">Receiver</th>
                    <th className="px-6 py-4 text-left">Amount</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((tx, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {tx.sender}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {tx.receiver}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {tx.amount}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-sm font-semibold">
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
      </div>
    </div>
  );
}
