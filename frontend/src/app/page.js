import Dashboard from '@/components/Overview';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const page = () => {
  return (
    <div>
    <Sidebar/>
    <Dashboard/>
    </div>
  );
}

export default page;
