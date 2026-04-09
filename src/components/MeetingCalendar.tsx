import { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  CalendarDays,
  Clock3,
  Plus,
  CheckCircle2,
  XCircle,
  Hourglass,
  Trash2,
  Video,
} from "lucide-react";

interface Meeting {
  id: number;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Declined";
}

export default function MeetingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [meetings, setMeetings] = useState<Meeting[]>(() => {
    const saved = localStorage.getItem("nexus_meetings");
    return saved ? JSON.parse(saved) : [];
  });

  const [availableTimes, setAvailableTimes] = useState<string[]>(() => {
    const saved = localStorage.getItem("nexus_slots");
    return saved
      ? JSON.parse(saved)
      : ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];
  });

  const [newSlot, setNewSlot] = useState("");

  useEffect(() => {
    localStorage.setItem("nexus_meetings", JSON.stringify(meetings));

    const pendingCount = meetings.filter(
      (meeting) => meeting.status === "Pending"
    ).length;

    window.dispatchEvent(
      new CustomEvent("update-pending-count", {
        detail: pendingCount,
      })
    );
  }, [meetings]);

  useEffect(() => {
    localStorage.setItem("nexus_slots", JSON.stringify(availableTimes));
  }, [availableTimes]);

  const addSlot = () => {
    if (!newSlot.trim()) return;

    if (!availableTimes.includes(newSlot)) {
      setAvailableTimes([...availableTimes, newSlot]);
      setNewSlot("");
    }
  };

  const removeSlot = (slot: string) => {
    setAvailableTimes(availableTimes.filter((time) => time !== slot));
  };

  const requestMeeting = (time: string) => {
    const alreadyExists = meetings.some(
      (meeting) =>
        meeting.date === selectedDate.toDateString() &&
        meeting.time === time
    );

    if (alreadyExists) return;

    const newMeeting: Meeting = {
      id: Date.now(),
      date: selectedDate.toDateString(),
      time,
      status: "Pending",
    };

    setMeetings([newMeeting, ...meetings]);
  };

  const updateStatus = (
    id: number,
    status: "Confirmed" | "Declined"
  ) => {
    setMeetings(
      meetings.map((meeting) =>
        meeting.id === id ? { ...meeting, status } : meeting
      )
    );
  };

  const stats = useMemo(() => {
    return {
      total: meetings.length,
      pending: meetings.filter((m) => m.status === "Pending").length,
      confirmed: meetings.filter((m) => m.status === "Confirmed").length,
      declined: meetings.filter((m) => m.status === "Declined").length,
    };
  }, [meetings]);

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="bg-gradient-to-r from-slate-950 via-indigo-900 to-cyan-700 px-8 py-8 text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <CalendarDays className="h-8 w-8 text-cyan-300" />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Meeting Calendar & Scheduling
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-200 md:text-base">
                  Schedule investor meetings, manage availability, and track approvals in one place.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-center backdrop-blur-md">
                <p className="text-xs uppercase tracking-widest text-slate-300">
                  Total
                </p>
                <p className="mt-1 text-2xl font-bold">{stats.total}</p>
              </div>

              <div className="rounded-2xl border border-yellow-400/20 bg-yellow-500/10 px-4 py-4 text-center backdrop-blur-md">
                <p className="text-xs uppercase tracking-widest text-yellow-200">
                  Pending
                </p>
                <p className="mt-1 text-2xl font-bold text-yellow-300">
                  {stats.pending}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4 text-center backdrop-blur-md">
                <p className="text-xs uppercase tracking-widest text-emerald-200">
                  Confirmed
                </p>
                <p className="mt-1 text-2xl font-bold text-emerald-300">
                  {stats.confirmed}
                </p>
              </div>

              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-4 text-center backdrop-blur-md">
                <p className="text-xs uppercase tracking-widest text-red-200">
                  Declined
                </p>
                <p className="mt-1 text-2xl font-bold text-red-300">
                  {stats.declined}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Manage Availability
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Add or remove meeting slots available for booking.
                  </p>
                </div>

                <div className="rounded-2xl bg-cyan-100 p-3">
                  <Clock3 className="h-6 w-6 text-cyan-700" />
                </div>
              </div>

              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  placeholder="e.g. 05:00 PM"
                  className="flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                />

                <button
                  onClick={addSlot}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-cyan-700"
                >
                  <Plus className="h-5 w-5" />
                  Add Slot
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {availableTimes.map((slot) => (
                  <div
                    key={slot}
                    className="flex items-center gap-3 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-cyan-800"
                  >
                    <Clock3 className="h-4 w-4" />
                    <span className="text-sm font-semibold">{slot}</span>
                    <button
                      onClick={() => removeSlot(slot)}
                      className="rounded-full p-1 text-cyan-600 transition hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Choose Meeting Date
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Select a date and request an available slot.
                  </p>
                </div>

                <div className="rounded-2xl bg-indigo-100 p-3">
                  <CalendarDays className="h-6 w-6 text-indigo-700" />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 p-4">
                <Calendar
                  onChange={(date) => setSelectedDate(date as Date)}
                  value={selectedDate}
                  className="w-full border-none"
                />
              </div>

              <div className="mt-6">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                  Available Time Slots
                </h3>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {availableTimes.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => requestMeeting(slot)}
                      className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-all hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{slot}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            Request Meeting
                          </p>
                        </div>

                        <Video className="h-5 w-5 text-cyan-600 transition group-hover:scale-110" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-emerald-700">
                Confirmed Meetings
              </h2>

              <div className="mt-5 space-y-4">
                {meetings.filter((m) => m.status === "Confirmed").length > 0 ? (
                  meetings
                    .filter((m) => m.status === "Confirmed")
                    .map((meeting) => (
                      <div
                        key={meeting.id}
                        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-bold text-emerald-900">
                              {meeting.date}
                            </p>
                            <p className="mt-1 text-sm text-emerald-700">
                              {meeting.time}
                            </p>
                          </div>

                          <div className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                            Confirmed
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-slate-400">
                    No confirmed meetings yet.
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Meeting Requests
              </h2>

              <div className="mt-5 space-y-4">
                {meetings.length > 0 ? (
                  meetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {meeting.date}
                          </p>
                          <p className="mt-1 text-sm text-slate-500">
                            {meeting.time}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                              meeting.status === "Confirmed"
                                ? "bg-emerald-100 text-emerald-700"
                                : meeting.status === "Declined"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {meeting.status === "Confirmed" && (
                              <CheckCircle2 className="h-4 w-4" />
                            )}
                            {meeting.status === "Pending" && (
                              <Hourglass className="h-4 w-4" />
                            )}
                            {meeting.status === "Declined" && (
                              <XCircle className="h-4 w-4" />
                            )}
                            {meeting.status}
                          </span>

                          {meeting.status === "Pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  updateStatus(meeting.id, "Confirmed")
                                }
                                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                              >
                                Accept
                              </button>

                              <button
                                onClick={() =>
                                  updateStatus(meeting.id, "Declined")
                                }
                                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                              >
                                Decline
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-slate-400">
                    No meeting requests yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
