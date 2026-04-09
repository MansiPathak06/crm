"use client";
import { useState } from "react";

export default function Header({ title = "Dashboard", subtitle = "All details about your selling products are here..." }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="w-full bg-[#dff0e8] px-6 sm:px-10 py-3 flex items-center justify-between gap-4 border-b border-green-100">
      {/* Left: Title & Subtitle */}
      <div className="min-w-0">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5 hidden sm:block">
          {subtitle}
        </p>
      </div>

      {/* Right: Search */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="flex items-center bg-white border border-green-100 rounded-lg overflow-hidden shadow-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 px-4 py-2 outline-none w-40 sm:w-56"
          />
        </div>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg text-green-600 hover:bg-green-100 transition-colors duration-150"
          aria-label="Search"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </button>
      </div>
    </header>
  );
}