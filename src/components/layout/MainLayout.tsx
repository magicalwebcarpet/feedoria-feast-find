
import React from 'react';
import BottomTabs from './BottomTabs';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <main className="container mx-auto max-w-md px-4">
        {children}
      </main>
      <BottomTabs />
    </div>
  );
};

export default MainLayout;
