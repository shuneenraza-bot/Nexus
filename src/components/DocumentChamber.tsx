import { useMemo, useState } from "react";
import {
  FileText,
  Upload,
  CheckCircle2,
  Clock3,
  Pencil,
  Download,
  Eye,
 PenTool,
  ShieldCheck,
} from "lucide-react";

export default function DocumentChamber() {
  const [status, setStatus] = useState<"Draft" | "In Review" | "Signed">("Draft");
  const [fileName, setFileName] = useState("No document uploaded");
  const [signatureAdded, setSignatureAdded] = useState(false);

  const statusConfig = useMemo(() => {
    switch (status) {
      case "Draft":
        return {
          color: "text-slate-700",
          bg: "bg-slate-100",
          border: "border-slate-200",
          icon: <Pencil className="h-5 w-5" />,
          message: "This document is currently being prepared.",
        };

      case "In Review":
        return {
          color: "text-amber-700",
          bg: "bg-amber-100",
          border: "border-amber-200",
          icon: <Clock3 className="h-5 w-5" />,
          message: "The document is awaiting approval or feedback.",
        };

      case "Signed":
        return {
          color: "text-emerald-700",
          bg: "bg-emerald-100",
          border: "border-emerald-200",
          icon: <CheckCircle2 className="h-5 w-5" />,
          message: "The document has been signed and finalized.",
        };
    }
  }, [status]);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-800 px-8 py-7 text-white">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
              <FileText className="h-8 w-8 text-cyan-300" />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Document Chamber
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
                Securely upload, review, sign, and manage important agreements and investment documents.
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-3 rounded-2xl border px-5 py-4 backdrop-blur-md ${statusConfig.bg} ${statusConfig.border}`}
          >
            <div className={statusConfig.color}>{statusConfig.icon}</div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Current Status
              </p>
              <p className={`text-lg font-bold ${statusConfig.color}`}>
                {status}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 p-8 xl:grid-cols-[1.5fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Upload Document
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Supported formats: PDF, DOCX, PNG, JPG
                </p>
              </div>

              <div className="rounded-2xl bg-blue-100 p-3">
                <Upload className="h-6 w-6 text-blue-700" />
              </div>
            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white px-6 py-12 text-center transition hover:border-blue-500 hover:bg-blue-50">
              <Upload className="mb-4 h-10 w-10 text-slate-400" />
              <p className="text-lg font-semibold text-slate-800">
                Click to upload or drag and drop
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Upload contracts, NDAs, agreements, or investment documents
              </p>

              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFileName(file.name);
                }}
              />
            </label>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-3">
                  <FileText className="h-5 w-5 text-slate-700" />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">{fileName}</p>
                  <p className="text-sm text-slate-500">Ready for preview and review</p>
                </div>
              </div>

              <button className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Document Preview</h3>
                <p className="text-sm text-slate-500">
                  Preview uploaded documents before signing.
                </p>
              </div>

              <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
                <Eye className="h-4 w-4" />
                Open Preview
              </button>
            </div>

            <div className="flex h-72 flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 text-center">
              <div className="mb-4 rounded-full bg-white p-5 shadow-md">
                <FileText className="h-10 w-10 text-slate-500" />
              </div>

              <p className="text-lg font-semibold text-slate-800">
                Document Preview Area
              </p>
              <p className="mt-2 max-w-md text-sm text-slate-500">
                Uploaded documents will appear here for review, approval, and signature.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Signature Section
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Add your digital signature to finalize the document.
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-100 p-3">
                < PenTool className="h-6 w-6 text-emerald-700" />
              </div>
            </div>

            <div className="flex min-h-[180px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white text-center transition hover:border-emerald-400 hover:bg-emerald-50">
              {signatureAdded ? (
                <>
                  < PenTool className="mb-3 h-12 w-12 text-emerald-600" />
                  <p className="text-lg font-bold text-emerald-700">
                    Signature Added Successfully
                  </p>
                  <p className="mt-2 text-sm text-emerald-600">
                    Your document is ready to be submitted.
                  </p>
                </>
              ) : (
                <>
                  < PenTool className="mb-3 h-12 w-12 text-slate-400" />
                  <p className="text-lg font-semibold text-slate-700">
                    Signature Area
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Click below to add your digital signature.
                  </p>
                </>
              )}
            </div>

            <button
              onClick={() => setSignatureAdded(true)}
              className="mt-5 flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
            >
              < PenTool className="h-5 w-5" />
              Add Signature
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Workflow Status</h3>

            <div className="mt-5 space-y-3">
              <button
                onClick={() => setStatus("Draft")}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${
                  status === "Draft"
                    ? "border-slate-800 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center gap-3 font-semibold">
                  <Pencil className="h-5 w-5" />
                  Draft
                </span>
                {status === "Draft" && <CheckCircle2 className="h-5 w-5" />}
              </button>

              <button
                onClick={() => setStatus("In Review")}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${
                  status === "In Review"
                    ? "border-amber-500 bg-amber-500 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center gap-3 font-semibold">
                  <Clock3 className="h-5 w-5" />
                  In Review
                </span>
                {status === "In Review" && <CheckCircle2 className="h-5 w-5" />}
              </button>

              <button
                onClick={() => setStatus("Signed")}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${
                  status === "Signed"
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center gap-3 font-semibold">
                  <CheckCircle2 className="h-5 w-5" />
                  Signed
                </span>
                {status === "Signed" && <CheckCircle2 className="h-5 w-5" />}
              </button>
            </div>

            <div className={`mt-5 rounded-2xl border p-4 ${statusConfig.bg} ${statusConfig.border}`}>
              <div className="flex items-start gap-3">
                <div className={statusConfig.color}>{statusConfig.icon}</div>
                <div>
                  <p className={`font-bold ${statusConfig.color}`}>{status}</p>
                  <p className="mt-1 text-sm text-slate-600">{statusConfig.message}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-3">
                <ShieldCheck className="h-5 w-5 text-emerald-700" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Security & Compliance
                </h3>
                <p className="text-sm text-slate-500">
                  All documents are securely encrypted.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Encryption</p>
                <p className="mt-1 font-semibold text-slate-900">AES-256 Protected</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Last Updated</p>
                <p className="mt-1 font-semibold text-slate-900">Today, 12:45 PM</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Access Level</p>
                <p className="mt-1 font-semibold text-slate-900">Authorized Users Only</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
