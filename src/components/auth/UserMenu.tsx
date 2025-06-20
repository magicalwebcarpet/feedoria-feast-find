
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, LogIn, ChefHat } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';

export const UserMenu = () => {
  const { user, profile, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        {/* Become a Chef Button */}
        <Button
          variant="ghost"
          className="hidden sm:flex items-center space-x-2 text-sm font-medium hover:bg-gray-100"
        >
          <ChefHat className="h-4 w-4" />
          <span>Become a Chef</span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-auto px-3 rounded-full border border-gray-300 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-2">
                <div className="hidden sm:block">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
                <Avatar className="h-6 w-6">
                  <AvatarImage src={profile?.avatar_url || user?.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            {user ? (
              <>
                <DropdownMenuItem className="font-medium">
                  {profile?.full_name || profile?.email || user.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Help Center</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  Log out
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={() => setShowAuthModal(true)}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Log in
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowAuthModal(true)}>
                  Sign up
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Help Center</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  );
};
