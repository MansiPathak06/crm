"use client";
import { useState } from "react";

const menuItems = [
  {
    section: "Overview",
    items: [
      {
        label: "Dashboard",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
      },
      {
        label: "Lead Management",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
      },
      {
        label: "Project Management",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        ),
      },
      {
        label: "Task Management",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
    ],
  },
  {
    section: "Operations",
    items: [
      {
        label: "Vendor Management",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
      },
      {
        label: "Payment & Expenses",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        label: "Site Uploads",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
        badge: "New",
      },
    ],
  },
];

export default function Sidebar({ activeItem, setActiveItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger — shown only on small screens */}
      <button
        className="fixed top-3 left-4 z-50 p-1.5 rounded-lg bg-white shadow border border-green-100 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40 w-64
          bg-white border-r border-gray-100
          flex flex-col justify-between
          shadow-sm
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:h-full lg:z-auto lg:shadow-none
        `}
      >
        {/* Logo */}
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2.5 px-6 py-5">
            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-green-600 font-bold text-lg tracking-tight">Managency</span>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 pb-4 space-y-6 overflow-y-auto">
            {menuItems.map((group) => (
              <div key={group.section}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-2 mb-2">
                  {group.section}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = activeItem === item.label;
                    return (
                      <li key={item.label}>
                        <button
                          onClick={() => {
                            setActiveItem?.(item.label);
                            setIsOpen(false);
                          }}
                          className={`
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                            transition-all duration-150 group relative
                            ${isActive
                              ? "bg-green-50 text-green-600"
                              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            }
                          `}
                        >
                          {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-green-500 rounded-r-full" />
                          )}
                          <span className={`${isActive ? "text-green-500" : "text-gray-400 group-hover:text-gray-500"}`}>
                            {item.icon}
                          </span>
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] font-bold uppercase tracking-wide bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-gray-50">
            <p className="text-[10px] text-center text-gray-300 tracking-wide">
              © Managency.com 2024
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}