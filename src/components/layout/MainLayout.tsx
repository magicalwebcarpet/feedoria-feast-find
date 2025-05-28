
import React from 'react';
import BottomTabs from './BottomTabs';
import { TopNavigation } from './TopNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
  fullscreenContent?: React.ReactNode;
}

const MainLayout = ({ children, fullscreenContent }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      {fullscreenContent && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          {fullscreenContent}
        </div>
      )}
      <div className="relative z-10 min-h-[calc(100vh-80px)] bg-gradient-to-b from-white/90 to-white">
        <div className="container mx-auto max-w-md px-4 pt-20">
          {children}
        </div>
      </div>
      <BottomTabs />
    </div>
  );
};

export default MainLayout;
