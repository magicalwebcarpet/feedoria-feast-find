
import React from 'react';
import { UserMenu } from '@/components/auth/UserMenu';
import Logo from '@/components/shared/Logo';

export const TopNavigation = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex items-center space-x-4">
          <UserMenu />
        </div>
      </div>
    </div>
  );
};
