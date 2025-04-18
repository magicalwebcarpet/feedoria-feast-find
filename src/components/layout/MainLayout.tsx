
import React from 'react';
import BottomTabs from './BottomTabs';

interface MainLayoutProps {
  children: React.ReactNode;
  fullscreenContent?: React.ReactNode;
}

const MainLayout = ({ children, fullscreenContent }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {fullscreenContent && (
        <div className="fixed inset-0 z-0">
          {fullscreenContent}
        </div>
      )}
      <main className="relative z-10 min-h-[calc(100vh-80px)]">
        <div className="container mx-auto max-w-md px-4">
          {children}
        </div>
      </main>
      <BottomTabs />
    </div>
  );
};

export default MainLayout;
