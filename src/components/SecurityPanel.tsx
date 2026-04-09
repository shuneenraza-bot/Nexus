import { useMemo, useState } from "react";
import {
  Shield,
  Lock,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Smartphone,
} from "lucide-react";

export default function SecurityPanel() {
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  const strength = useMemo(() => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) {
      return {
        label: "Weak",
        color: "text-red-600",
        bg: "bg-red-500",
        width: "w-1/4",
        message: "Use at least 8 characters, numbers and symbols.",
      };
    }

    if (score <= 3) {
      return {
        label: "Medium",
        color: "text-amber-600",
        bg: "bg-amber-500",
        width: "w-3/4",
        message: "Almost there. Add symbols or uppercase letters.",
      };
    }

    return {
      label: "Strong",
      color: "text-emerald-600",
      bg: "bg-emerald-500",
      width: "w-full",
      message: "Excellent! Your password is secure.",
    };
  }, [password]);

  const handleOtpChange = (value: string) => {
    const formatted = value.replace(/\D/g, "").slice(0, 6);
    setOtp(formatted);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-700 px-8 py-7 text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10">
              <Shield className="h-8 w-8 text-cyan-300" />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Security & Access Control
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-200 md:text-base">
                Strengthen your account with a secure password and two-factor authentication.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
              Protection Status
            </p>
            <div className="mt-1 flex items-center gap-2 text-lg font-semibold text-emerald-300">
              <CheckCircle2 className="h-5 w-5" />
              Account Protected
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 p-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3">
              <Lock className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Password Security
              </h3>
              <p className="text-sm text-slate-500">
                Create a strong password to keep your account safe.
              </p>
            </div>
          </div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a strong password"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 pr-14 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-800"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                Password Strength
              </span>

              <span
                className={`flex items-center gap-1 text-sm font-bold ${strength.color}`}
              >
                {strength.label === "Strong" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
                {strength.label}
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full ${strength.bg} ${strength.width} transition-all duration-500`}
              />
            </div>

            <p className="mt-3 text-sm text-slate-500">{strength.message}</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">Minimum Length</p>
              <p className="mt-1 font-semibold text-slate-900">8 Characters</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">Recommendation</p>
              <p className="mt-1 font-semibold text-slate-900">
                Use uppercase, numbers & symbols
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-purple-100 p-3">
                <Smartphone className="h-5 w-5 text-purple-700" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-slate-500">
                  Add an extra layer of protection to your account.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIs2FAEnabled(!is2FAEnabled)}
              className={`relative h-7 w-14 rounded-full transition ${
                is2FAEnabled ? "bg-emerald-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                  is2FAEnabled ? "left-8" : "left-1"
                }`}
              />
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <KeyRound className="h-4 w-4" />
              Verification Code
            </label>

            <input
              type="text"
              value={otp}
              onChange={(e) => handleOtpChange(e.target.value)}
              maxLength={6}
              placeholder="000000"
              className="w-full rounded-2xl border border-slate-300 px-4 py-4 text-center text-2xl font-bold tracking-[0.6em] text-slate-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            />

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-sm text-slate-500">
                Enter the 6-digit code sent to your registered device.
              </p>

              <button
                type="button"
                className="text-sm font-semibold text-purple-600 transition hover:text-purple-800"
              >
                Resend Code
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-semibold text-emerald-700">
                  Two-Factor Authentication Enabled
                </p>
                <p className="mt-1 text-sm text-emerald-600">
                  Your account requires a verification code every time you sign in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
