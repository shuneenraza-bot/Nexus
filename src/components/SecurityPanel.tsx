
import { useState } from "react";
import {
  Shield,
  Lock,
  KeyRound,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function SecurityPanel() {
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const getStrength = () => {
    if (password.length < 4) {
      return {
        label: "Weak",
        color: "text-red-600",
        bg: "bg-red-500",
        width: "w-1/3",
      };
    }

    if (password.length < 8) {
      return {
        label: "Medium",
        color: "text-yellow-600",
        bg: "bg-yellow-500",
        width: "w-2/3",
      };
    }

    return {
      label: "Strong",
      color: "text-green-600",
      bg: "bg-green-500",
      width: "w-full",
    };
  };

  const strength = getStrength();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-xl">
          <Shield className="w-6 h-6 text-blue-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Security & Access Control
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Protect your account with password and two-factor authentication
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Lock className="w-4 h-4" />
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter a secure password"
          />

          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Password Strength</span>
              <span
                className={`text-sm font-semibold flex items-center gap-1 ${strength.color}`}
              >
                {strength.label === "Strong" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertTriangle className="w-4 h-4" />
                )}
                {strength.label}
              </span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${strength.bg} ${strength.width} transition-all duration-300 rounded-full`}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <KeyRound className="w-4 h-4" />
            Two-Factor Authentication (OTP)
          </label>

          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 tracking-[0.4em] text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="000000"
          />

          <p className="text-sm text-gray-500 mt-2">
            Enter the 6-digit verification code sent to your device.
          </p>
        </div>
      </div>
    </div>
  );
}
