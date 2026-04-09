"use client";
import { useState } from "react";

// ── Sparkline SVG (reused for Revenue chart) ──────────────────────────────────
function RevenueChart() {
  const thisWeek = [800, 1200, 900, 2900, 1500, 2100, 1800];
  const lastWeek = [600, 900, 1100, 1400, 1200, 1700, 1300];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const max = 4000;
  const w = 420, h = 140, padX = 40, padY = 10;
  const gw = w - padX, gh = h - padY * 2;

  const toX = (i) => padX + (i / (thisWeek.length - 1)) * gw;
  const toY = (v) => padY + gh - (v / max) * gh;

  const pathD = (data) =>
    data.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`).join(" ");
  const areaD = (data) =>
    `${pathD(data)} L ${toX(data.length - 1)} ${padY + gh} L ${toX(0)} ${padY + gh} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-28" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f87171" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f87171" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Y-axis labels */}
      {[0, 1000, 2000, 3000, 4000].map((v) => (
        <text key={v} x={padX - 6} y={toY(v) + 4} textAnchor="end" fontSize="8" fill="#d1d5db">
          ${v === 0 ? "0" : `${v / 1000}k`}
        </text>
      ))}
      {/* Grid lines */}
      {[1000, 2000, 3000, 4000].map((v) => (
        <line key={v} x1={padX} x2={w} y1={toY(v)} y2={toY(v)} stroke="#f3f4f6" strokeWidth="1" />
      ))}
      {/* Areas */}
      <path d={areaD(lastWeek)} fill="url(#g2)" />
      <path d={areaD(thisWeek)} fill="url(#g1)" />
      {/* Lines */}
      <path d={pathD(lastWeek)} fill="none" stroke="#fca5a5" strokeWidth="2" strokeLinejoin="round" />
      <path d={pathD(thisWeek)} fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Peak callout */}
      <circle cx={toX(3)} cy={toY(2900)} r="5" fill="white" stroke="#22c55e" strokeWidth="2" />
      <rect x={toX(3) - 18} y={toY(2900) - 26} width="36" height="18" rx="5" fill="#22c55e" />
      <text x={toX(3)} y={toY(2900) - 13} textAnchor="middle" fontSize="9" fill="white" fontWeight="700">
        $2500
      </text>
      {/* X-axis */}
      {days.map((d, i) => (
        <text key={d} x={toX(i)} y={h - 1} textAnchor="middle" fontSize="8" fill="#d1d5db">
          {d}
        </text>
      ))}
    </svg>
  );
}

// ── Donut Ring ─────────────────────────────────────────────────────────────────
function DonutRing({ pct = 32, size = 90, stroke = 10, color = "#22c55e", track = "#e5e7eb" }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
    </svg>
  );
}


// ── Stat Card ──────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, trend, trendLabel, color = "bg-green-50", iconColor = "text-green-500" }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
        <span className={`${iconColor} text-lg`}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-xl font-bold text-gray-700 leading-tight">{value}</p>
      </div>
      {trend && (
        <div className="text-right flex-shrink-0">
          <span className={`text-xs font-bold ${trend > 0 ? "text-green-500" : "text-red-400"}`}>
            {trend > 0 ? "▲" : "▼"} {Math.abs(trend)}%
          </span>
          <p className="text-[10px] text-gray-400">{trendLabel}</p>
        </div>
      )}
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("week");

  return (
    <div className="min-h-screen bg-[#f7fdf9] p-4 sm:p-6 lg:p-8 font-sans">

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total Revenue" value="$24,500" icon="💰" trend={8.1} trendLabel="vs last week" color="bg-green-50" iconColor="text-green-500" />
        <StatCard label="Total Orders" value="1,284" icon="📦" trend={0.51} trendLabel="vs last week" color="bg-blue-50" iconColor="text-blue-400" />
        <StatCard label="New Customers" value="342" icon="👥" trend={14} trendLabel="Weekly" color="bg-purple-50" iconColor="text-purple-400" />
        <StatCard label="Pending Tasks" value="18" icon="✅" trend={-3.2} trendLabel="vs yesterday" color="bg-orange-50" iconColor="text-orange-400" />
      </div>

      {/* Row 1 — Revenue + Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">

        {/* Revenue */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-700">Revenue</h2>
            <div className="flex items-center gap-4 text-[11px] text-gray-400">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />This week</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-300 inline-block" />Last week</span>
              {/* Tab toggle */}
              <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5 ml-2">
                {["week", "month"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all ${activeTab === t ? "bg-white text-green-600 shadow-sm" : "text-gray-400"}`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <RevenueChart />
        </div>

        {/* Customers */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-700">Customers</h2>
            <div className="flex items-center gap-3 text-[11px] text-gray-400">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />Current</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-300 inline-block" />New</span>
            </div>
          </div>

          <div className="flex items-center justify-around">
            {/* Big donut */}
            <div className="relative flex items-center justify-center">
              <DonutRing pct={32} size={100} stroke={11} color="#22c55e" track="#dcfce7" />
              <div className="absolute text-center">
                <p className="text-lg font-bold text-gray-700 leading-none">32%</p>
                <p className="text-[9px] text-gray-400 mt-0.5">Total</p>
              </div>
            </div>

            {/* Small donuts */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center">
                  <DonutRing pct={68} size={54} stroke={7} color="#22c55e" track="#dcfce7" />
                </div>
                <div>
                  <p className="text-xs font-bold text-green-500">+18%</p>
                  <p className="text-[10px] text-gray-400">Daily</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center">
                  <DonutRing pct={44} size={54} stroke={7} color="#fb923c" track="#ffedd5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-orange-400">+14%</p>
                  <p className="text-[10px] text-gray-400">Weekly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}