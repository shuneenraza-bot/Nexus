import { useEffect, useState } from "react";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Users,
  Monitor,
  Settings,
  Clock3,
} from "lucide-react";

export default function VideoCall() {
  const [callStarted, setCallStarted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
   let timer: ReturnType<typeof setInterval>;

    if (callStarted) {
      timer = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setDuration(0);
    }

    return () => clearInterval(timer);
  }, [callStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-900 px-8 py-7 text-white">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">
                <Video className="h-7 w-7 text-cyan-300" />
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Video Conference
                </h2>
                <p className="mt-1 text-sm text-slate-300 md:text-base">
                  Instantly connect entrepreneurs and investors with secure HD calls.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              className={`rounded-2xl border px-4 py-3 text-sm font-semibold backdrop-blur-md ${
                callStarted
                  ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                  : "border-slate-500/20 bg-white/5 text-slate-300"
              }`}
            >
              {callStarted ? "● Live Meeting" : "● Offline"}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                Duration: {formatTime(duration)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 p-8 xl:grid-cols-[1.6fr_0.8fr]">
        <div>
          <div className="relative h-[420px] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 shadow-inner">
            {callStarted ? (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(34,197,94,0.2),transparent_30%)]" />

                <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur-md">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
                  Live Now
                </div>

                <div className="flex h-full flex-col items-center justify-center text-center text-white">
                  <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-500 shadow-2xl shadow-emerald-500/30">
                    <Phone className="h-12 w-12" />
                  </div>

                  <h3 className="text-3xl font-bold">Call In Progress</h3>
                  <p className="mt-3 max-w-md text-slate-300">
                    You are connected with the investor panel. Audio and video are currently active.
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200 backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-cyan-300" />
                        3 Participants
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200 backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-violet-300" />
                        HD Quality
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-5 right-5 w-48 rounded-2xl border border-white/10 bg-slate-800/90 p-3 shadow-xl backdrop-blur-md">
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
                    <span>Your Camera</span>
                    <span>{videoOn ? "On" : "Off"}</span>
                  </div>

                  <div className="flex h-28 items-center justify-center rounded-xl bg-slate-700 text-slate-400">
                    {videoOn ? (
                      <Video className="h-8 w-8 text-cyan-300" />
                    ) : (
                      <VideoOff className="h-8 w-8 text-slate-500" />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center text-slate-300">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-700/80 shadow-lg">
                  <PhoneOff className="h-10 w-10" />
                </div>

                <h3 className="text-3xl font-bold text-white">No Active Meeting</h3>
                <p className="mt-3 max-w-md text-slate-400">
                  Start a new video call to collaborate with entrepreneurs and investors instantly.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {!callStarted ? (
              <button
                onClick={() => setCallStarted(true)}
                className="flex items-center gap-3 rounded-2xl bg-emerald-600 px-6 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700"
              >
                <Phone className="h-5 w-5" />
                Start Meeting
              </button>
            ) : (
              <button
                onClick={() => setCallStarted(false)}
                className="flex items-center gap-3 rounded-2xl bg-red-600 px-6 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-red-700"
              >
                <PhoneOff className="h-5 w-5" />
                End Meeting
              </button>
            )}

            <button
              onClick={() => setVideoOn(!videoOn)}
              className={`flex items-center gap-3 rounded-2xl px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                videoOn
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-slate-600 hover:bg-slate-700"
              }`}
            >
              {videoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              {videoOn ? "Camera On" : "Camera Off"}
            </button>

            <button
              onClick={() => setAudioOn(!audioOn)}
              className={`flex items-center gap-3 rounded-2xl px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                audioOn
                  ? "bg-violet-600 hover:bg-violet-700"
                  : "bg-slate-600 hover:bg-slate-700"
              }`}
            >
              {audioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              {audioOn ? "Microphone On" : "Microphone Off"}
            </button>

            <button className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100">
              <Settings className="h-5 w-5" />
              Settings
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Meeting Details</h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-white p-4 border border-slate-200">
                <span className="text-slate-500">Meeting ID</span>
                <span className="font-semibold text-slate-900">#NX-2026-451</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white p-4 border border-slate-200">
                <span className="text-slate-500">Participants</span>
                <span className="font-semibold text-slate-900">3 Joined</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white p-4 border border-slate-200">
                <span className="text-slate-500">Connection</span>
                <span className="font-semibold text-emerald-600">Stable</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Call Status</h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Camera</span>
                <span className={`font-semibold ${videoOn ? "text-emerald-600" : "text-red-500"}`}>
                  {videoOn ? "Enabled" : "Disabled"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">Microphone</span>
                <span className={`font-semibold ${audioOn ? "text-emerald-600" : "text-red-500"}`}>
                  {audioOn ? "Enabled" : "Disabled"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">Meeting State</span>
                <span className={`font-semibold ${callStarted ? "text-emerald-600" : "text-slate-500"}`}>
                  {callStarted ? "Active" : "Not Started"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
