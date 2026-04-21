import { motion } from 'framer-motion';
import { CalendarDays, Clock, Users, Video, MapPin, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const todayMeetings = [
  { time: '09:00 AM', title: 'Daily Standup', duration: '15 min', participants: 8, type: 'recurring', platform: 'Zoom', color: 'border-emerald-400' },
  { time: '10:30 AM', title: 'Product Design Review', duration: '45 min', participants: 5, type: 'one-time', platform: 'Google Meet', color: 'border-blue-400' },
  { time: '01:00 PM', title: 'Investor Relations Update', duration: '30 min', participants: 3, type: 'one-time', platform: 'Teams', color: 'border-purple-400' },
  { time: '02:30 PM', title: 'Engineering Architecture Deep Dive', duration: '60 min', participants: 9, type: 'one-time', platform: 'Zoom', color: 'border-amber-400' },
  { time: '04:00 PM', title: 'Client Check-in: TechFlow Inc', duration: '30 min', participants: 4, type: 'recurring', platform: 'Google Meet', color: 'border-rose-400' },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const weekDates = [19, 20, 21, 22, 23];
const today = 2;

const weekSchedule = [
  [2, 1, 3, 2, 1],
  [1, 2, 1, 3, 2],
  [3, 1, 2, 1, 1],
];

const upcomingWeek = [
  { day: 'Tomorrow', meetings: [{ time: '10:00 AM', title: 'Board Review Preparation', participants: 6 }, { time: '2:30 PM', title: 'Customer Success Check-in', participants: 3 }] },
  { day: 'Thursday', meetings: [{ time: '11:00 AM', title: 'Tech Architecture Deep Dive', participants: 9 }, { time: '3:00 PM', title: 'HR Policy Review', participants: 4 }, { time: '4:30 PM', title: 'Sales Pipeline Review', participants: 5 }] },
  { day: 'Friday', meetings: [{ time: '09:00 AM', title: 'Weekly All-Hands', participants: 45 }, { time: '2:00 PM', title: 'Sprint Retrospective', participants: 12 }] },
];

export default function CalendarPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-slate-400 mt-1">Manage your meeting schedule with AI-powered insights</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-zoe-emerald to-emerald-600 text-white font-medium cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Schedule Meeting
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">Today's Meetings</p>
          <p className="text-2xl font-bold mt-1">{todayMeetings.length}</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">Total Hours</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">3h 00m</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">This Week</p>
          <p className="text-2xl font-bold text-purple-400 mt-1">22</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">AI Suggested Reschedule</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">2</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">April 2026</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-sm font-medium px-3 py-1 rounded-lg bg-zoe-emerald/10 text-zoe-emerald">This Week</span>
            <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-6">
          {weekDays.map((day, i) => (
            <div key={day} className={`text-center p-3 rounded-xl transition-colors ${i === today ? 'bg-zoe-emerald/10 border border-zoe-emerald/20' : 'bg-white/5'}`}>
              <p className="text-xs text-slate-400">{day}</p>
              <p className={`text-lg font-bold mt-1 ${i === today ? 'text-zoe-emerald' : 'text-white'}`}>{weekDates[i]}</p>
              <div className="flex justify-center gap-1 mt-2">
                {Array(weekSchedule[0][i]).fill(0).map((_, j) => (
                  <div key={j} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-5">Today's Schedule</h2>
          <div className="space-y-3">
            {todayMeetings.map((meeting, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-xl bg-white/5 border-l-2 ${meeting.color} hover:bg-white/8 transition-colors cursor-pointer`}
              >
                <div className="text-center shrink-0 w-16">
                  <p className="text-sm font-bold text-white">{meeting.time.split(' ')[0]}</p>
                  <p className="text-[10px] text-slate-400">{meeting.time.split(' ')[1]}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{meeting.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{meeting.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{meeting.participants}</span>
                    <span className="flex items-center gap-1"><Video className="w-3 h-3" />{meeting.platform}</span>
                  </div>
                </div>
                {meeting.type === 'recurring' && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 shrink-0">Recurring</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-5">Upcoming</h2>
          <div className="space-y-5">
            {upcomingWeek.map((day, di) => (
              <div key={di}>
                <p className="text-sm font-semibold text-zoe-emerald mb-3">{day.day}</p>
                <div className="space-y-2">
                  {day.meetings.map((meeting, mi) => (
                    <div key={mi} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors cursor-pointer">
                      <span className="text-xs text-slate-400 w-16 shrink-0">{meeting.time}</span>
                      <span className="text-sm font-medium flex-1 truncate">{meeting.title}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-400"><Users className="w-3 h-3" />{meeting.participants}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
