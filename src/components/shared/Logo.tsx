
import React from 'react';

interface LogoProps {
  size?: "sm" | "md" | "lg";
  customLogo?: string;
}

const Logo = ({ size = "md", customLogo }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16"
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
