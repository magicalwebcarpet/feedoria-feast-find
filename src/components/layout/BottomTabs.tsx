import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, CalendarDays, Tongue, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      name: "Delivery",
      href: "/",
      icon: Home,
      active: location.pathname === "/"
    },
    {
      name: "Booking",
      href: "/booking",
      icon: CalendarDays,
      active: location.pathname === "/booking"
    },
    {
      name: "Drool",
      href: "/discover",
      icon: Tongue,
      active: location.pathname === "/discover"
    },
    {
      name: "Store",
      href: "/store",
      icon: ShoppingCart,
      active: location.pathname === "/store"
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      active: location.pathname === "/profile"
    }
  ];

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => navigate(tab.href)}
            className="flex flex-col items-center justify-center w-full h-full"
          >
            <tab.icon
              className={cn(
                "h-6 w-6 mb-1",
                tab.active
                  ? "text-feedoria-purple"
                  : "text-gray-500"
              )}
            />
            <span
              className={cn(
                "text-xs",
                tab.active
                  ? "text-feedoria-purple font-medium"
                  : "text-gray-500"
              )}
            >
              {tab.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomTabs;
