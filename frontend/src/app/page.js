"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Overview";
import Profile from "@/components/Profile";

const pageMeta = {
  Dashboard: { title: "Dashboard", subtitle: "All details about your selling products are here..." },
  "Lead Management": { title: "Lead Management", subtitle: "Track and manage all your leads in one place..." },
  "Project Management": { title: "Project Management", subtitle: "Oversee all your ongoing and upcoming projects..." },
  "Task Management": { title: "Task Management", subtitle: "Assign, track and complete tasks efficiently..." },
  "Vendor Management": { title: "Vendor Management", subtitle: "Manage your vendors and supplier relationships..." },
  "Payment & Expenses": { title: "Payment & Expenses", subtitle: "Track all payments and expense records..." },
  "Site Uploads": { title: "Site Uploads", subtitle: "Upload and manage images and videos for your sites..." },
};

const Page = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const meta = pageMeta[activeItem] || pageMeta["Dashboard"];

 return (
  <div className="flex flex-col h-screen w-screen overflow-hidden">
    <Header title={meta.title} subtitle={meta.subtitle} />

    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      {/* MAIN AREA */}
      <div className="flex flex-1 items-start overflow-y-auto p-6 gap-6 bg-[#f7fdf9]">

        {/* Dashboard */}
        <div className="flex-1">
          <Dashboard />
        </div>

        {/* Profile */}
        <div className="w-[300px] flex-shrink-0 self-start sticky top-6">
  <Profile />
</div>

      </div>
    </div>
  </div>
  );
};

export default Page;