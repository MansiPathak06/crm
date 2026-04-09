<<<<<<< HEAD
import Dashboard from '@/components/Overview';
import Sidebar from '@/components/Sidebar';
import React from 'react';
=======
"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const pageMeta = {
  Dashboard: { title: "Dashboard", subtitle: "All details about your selling products are here..." },
  "Lead Management": { title: "Lead Management", subtitle: "Track and manage all your leads in one place..." },
  "Project Management": { title: "Project Management", subtitle: "Oversee all your ongoing and upcoming projects..." },
  "Task Management": { title: "Task Management", subtitle: "Assign, track and complete tasks efficiently..." },
  "Vendor Management": { title: "Vendor Management", subtitle: "Manage your vendors and supplier relationships..." },
  "Payment & Expenses": { title: "Payment & Expenses", subtitle: "Track all payments and expense records..." },
  "Site Uploads": { title: "Site Uploads", subtitle: "Upload and manage images and videos for your sites..." },
};
>>>>>>> 21d401e0807742e3ec1665c7e8b4905be03265e7

const page = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const meta = pageMeta[activeItem] || pageMeta["Dashboard"];

  return (
<<<<<<< HEAD
    <div>
    <Sidebar/>
    <Dashboard/>
=======
    <div className="flex flex-col h-screen w-screen overflow-hidden">

      {/* Header — full width at top */}
      <Header title={meta.title} subtitle={meta.subtitle} />

      {/* Sidebar + Content — below header */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

        <main className="flex-1 overflow-y-auto bg-white p-6 lg:p-8">
          {/* Aapka page content yahan aayega */}
        </main>
      </div>

>>>>>>> 21d401e0807742e3ec1665c7e8b4905be03265e7
    </div>
  );
};

export default page;