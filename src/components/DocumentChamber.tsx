import { useState } from "react";

export default function DocumentChamber() {
  
  const [status, setStatus] = useState("Draft");
  const [fileName, setFileName] = useState("");
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Document Chamber</h2>

      <input
  type="file"
  className="mb-4 block"
  onChange={(e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  }}
/>
      

    <div className="border rounded-lg p-4 mb-4 bg-gray-50">
  {fileName ? (
    <p className="text-green-700 font-medium">
      Uploaded File: {fileName}
    </p>
  ) : (
    <p className="text-gray-600">No document uploaded yet</p>
  )}
</div>
      <div className="mb-4">
        <p className="font-semibold mb-2">Status: {status}</p>

        <div className="flex gap-2">
          <button
            onClick={() => setStatus("Draft")}
            className="bg-gray-500 text-white px-3 py-2 rounded"
          >
            Draft
          </button>

          <button
            onClick={() => setStatus("In Review")}
            className="bg-yellow-500 text-white px-3 py-2 rounded"
          >
            In Review
          </button>

          <button
            onClick={() => setStatus("Signed")}
            className="bg-green-600 text-white px-3 py-2 rounded"
          >
            Signed
          </button>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center">
        Signature Area
      </div>
    </div>
  );
}