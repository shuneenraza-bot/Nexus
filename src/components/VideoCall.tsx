import { useState } from "react";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
} from "lucide-react";

export default function VideoCall() {
  const [callStarted, setCallStarted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Video Call</h2>
          <p className="text-sm text-gray-500 mt-1">
            Connect instantly with entrepreneurs and investors
          </p>
        </div>

        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            callStarted
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {callStarted ? "Live" : "Offline"}
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 h-72 rounded-2xl flex items-center justify-center relative overflow-hidden mb-5">
        {callStarted ? (
          <div className="text-center text-white">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
              <Phone className="w-10 h-10" />
            </div>
            <p className="text-xl font-semibold">Call in Progress</p>
            <p className="text-sm text-gray-300 mt-2">
              Audio and video are connected
            </p>
          </div>
        ) : (
          <div className="text-center text-gray-300">
            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
              <PhoneOff className="w-10 h-10" />
            </div>
            <p className="text-lg font-medium">No Active Call</p>
            <p className="text-sm text-gray-400 mt-2">
              Start a new meeting to connect
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {!callStarted ? (
          <button
            onClick={() => setCallStarted(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium transition-all shadow-md"
          >
            <Phone className="w-5 h-5" />
            Start Call
          </button>
        ) : (
          <button
            onClick={() => setCallStarted(false)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-medium transition-all shadow-md"
          >
            <PhoneOff className="w-5 h-5" />
            End Call
          </button>
        )}

        <button
          onClick={() => setVideoOn(!videoOn)}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all shadow-md text-white ${
            videoOn
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          {videoOn ? (
            <>
              <Video className="w-5 h-5" />
              Video On
            </>
          ) : (
            <>
              <VideoOff className="w-5 h-5" />
              Video Off
            </>
          )}
        </button>

        <button
          onClick={() => setAudioOn(!audioOn)}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all shadow-md text-white ${
            audioOn
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          {audioOn ? (
            <>
              <Mic className="w-5 h-5" />
              Audio On
            </>
          ) : (
            <>
              <MicOff className="w-5 h-5" />
              Audio Off
            </>
          )}
        </button>
      </div>
    </div>
  );
}
