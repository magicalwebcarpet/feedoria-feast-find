
import React from 'react';

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  customLogo?: string;
}

const Logo = ({ size = "md", customLogo }: LogoProps) => {
  const sizeClasses = {
    sm: "h-10",
    md: "h-16",
    lg: "h-24",
    xl: "h-36",
    "2xl": "h-48"
  };

  // Use the newly uploaded logo
  const logoSrc = customLogo || "/lovable-uploads/ad8b66d6-0190-4a75-abaa-83ea41eb0e29.png";

  return (
    <div className={`${sizeClasses[size]} flex items-center`}>
      <img 
        src={logoSrc} 
        alt="Feedoria Logo" 
        className="object-contain h-full"
      />
    </div>
  );
};

export default Logo;
