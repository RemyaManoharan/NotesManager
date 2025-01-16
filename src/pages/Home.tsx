import React, { ReactNode } from 'react';

interface HomeProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  children?: ReactNode;
}

const Home: React.FC<HomeProps> = ({ header, sidebar, children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="w-full bg-white shadow-sm">{header}</div>

      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-4rem)] flex-1">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-white">{sidebar}</div>

        {/* Notes Content Area */}
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>
    </div>
  );
};

export default Home;
