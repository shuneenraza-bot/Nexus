
import { useState } from "react";

export default function VideoCall() {
  const [callStarted, setCallStarted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Video Call</h2>

      <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
        {callStarted ? (
          <p className="text-lg font-semibold">Call in Progress...</p>
        ) : (
          <p className="text-gray-600">No active call</p>
        )}
      </div>

      <div className="flex gap-3 flex-wrap">
        {!callStarted ? (
          <button
            onClick={() => setCallStarted(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Start Call
          </button>
        ) : (
          <button
            onClick={() => setCallStarted(false)}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            End Call
          </button>
        )}

        <button
          onClick={() => setVideoOn(!videoOn)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {videoOn ? "Video On" : "Video Off"}
        </button>

        <button
          onClick={() => setAudioOn(!audioOn)}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          {audioOn ? "Audio On" : "Audio Off"}
        </button>
      </div>
    </div>
      );
}