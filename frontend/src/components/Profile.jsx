"use client";
import { useState } from "react";

// ── Progress Bar ───────────────────────────────────────────────────────────────
function ProgressBar({ done = 4, total = 6 }) {
  return (
    <div className="w-full flex gap-1 mt-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
            i < done ? "bg-green-500" : "bg-green-100"
          }`}
        />
      ))}
    </div>
  );
}

// ── Stat Item ──────────────────────────────────────────────────────────────────
function StatItem({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
        {icon}
      </div>
      <p className="text-sm font-bold text-gray-700 leading-none">{value}</p>
      <p className="text-[11px] text-gray-400">{label}</p>
    </div>
  );
}

// ── Background pattern dots ────────────────────────────────────────────────────
function PatternBg() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#22c55e" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

// ── Main Profile Component ─────────────────────────────────────────────────────
export default function Profile() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-3">

        {/* ── Top Header Row ── */}
        <div className="flex items-center justify-between px-1">
          <h1 className="text-lg font-bold text-gray-800 tracking-tight">Profile</h1>
          <div className="flex items-center gap-2">
            {/* Bell */}
            <button className="relative w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-green-100 shadow-sm hover:shadow-md transition-all">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full" />
            </button>
            {/* Settings */}
            <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-green-100 shadow-sm hover:shadow-md transition-all">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Profile Card ── */}
        <div className="bg-white rounded-3xl shadow-sm border border-green-50 overflow-hidden">

          {/* Banner with pattern */}
          <div className="relative h-24 bg-gradient-to-br from-green-100 to-green-200 overflow-hidden">
            <PatternBg />
            {/* Edit banner button */}
            <button className="absolute top-3 right-3 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm hover:bg-white transition-all z-10">
              <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>

          {/* Avatar — overlaps banner */}
          <div className="flex flex-col items-center -mt-10 px-5 pb-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-md bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center overflow-hidden">
                {/* Placeholder avatar face */}
                <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="80" height="80" fill="#d97706" />
                  <ellipse cx="40" cy="32" rx="14" ry="15" fill="#fef3c7" />
                  <ellipse cx="40" cy="75" rx="24" ry="20" fill="#fef3c7" />
                  <circle cx="35" cy="30" r="2" fill="#78350f" />
                  <circle cx="45" cy="30" r="2" fill="#78350f" />
                  <path d="M35 38 Q40 42 45 38" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              {/* Online indicator */}
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
              </span>
            </div>

            {/* Name & location */}
            <div className="mt-3 text-center">
              <div className="flex items-center justify-center gap-1.5">
                <h2 className="text-base font-bold text-gray-800">Drew Cano</h2>
                <span className="text-base">📍</span>
              </div>

              {/* Task progress */}
              <p className="text-[11px] text-gray-400 mt-1">4 from 6 tasks completed</p>
              <div className="w-40 mx-auto">
                <ProgressBar done={4} total={6} />
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-around w-full mt-5 pt-4 border-t border-gray-50">
              <StatItem
                icon={<svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                value="1.2k"
                label="Products"
              />
              <div className="w-px h-10 bg-gray-100" />
              <StatItem
                icon={<svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                value="2.8k"
                label="Followers"
              />
              <div className="w-px h-10 bg-gray-100" />
              <StatItem
                icon={<svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>}
                value="55.2k"
                label="Sales"
              />
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={() => setEditing(!editing)}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 active:scale-95 text-white text-sm font-semibold shadow-sm shadow-green-200 transition-all duration-150"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Profile
            </button>
          </div>
        </div>

        {/* ── Earnings Card ── */}
        <div className="bg-white rounded-3xl shadow-sm border border-green-50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-700">Earnings</h2>
            <button className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {/* Earnings inner card */}
          <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 overflow-hidden mb-4">
            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-10">
              <PatternBg />
            </div>

            {/* Wallet icon */}
            <div className="relative z-10 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-sm shadow-green-300 flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <p className="text-xl font-bold text-green-600 leading-tight">$75,000</p>
                <p className="text-[11px] text-green-500/80 mt-0.5">Your earnings this month</p>
              </div>
            </div>

            {/* Diagonal arrows decoration */}
            <div className="absolute bottom-3 right-3 flex gap-1 opacity-30">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-10 10M7 7h10v10" />
              </svg>
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l10-10M17 17H7V7" />
              </svg>
            </div>

            {/* Update payment hint */}
            <p className="relative z-10 text-[10px] text-green-500/70 mt-3 leading-snug">
              Update your payment method in settings
            </p>
          </div>

          {/* Withdraw Button */}
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 active:scale-95 text-white text-sm font-semibold shadow-sm shadow-green-200 transition-all duration-150">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Withdraw Earnings
          </button>
        </div>

      </div>
    </div>
  );
}