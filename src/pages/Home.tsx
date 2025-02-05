import React, { ReactNode } from 'react';

interface HomeProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  notelist?: ReactNode;
}

const Home: React.FC<HomeProps> = ({ sidebar, notelist }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      {/* <div className="w-full bg-white shadow-sm">{header}</div> */}

      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-4rem)] flex-1">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-background">
          {sidebar}
        </div>

        {/* Notes Content Area */}
        <div className="flex-1 overflow-auto p-6">{notelist}</div>
      </div>
    </div>
  );
};

export default Home;
