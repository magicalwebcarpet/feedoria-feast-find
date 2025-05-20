
import React from 'react';

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  customLogo?: string;
}

const Logo = ({ size = "md", customLogo }: LogoProps) => {
  const sizeClasses = {
    sm: "h-12",
    md: "h-20",
    lg: "h-32",
    xl: "h-44",
    "2xl": "h-56"
  };

  // Use the newly uploaded logo
  const logoSrc = customLogo || "/lovable-uploads/e0b371d9-4c5b-469c-aeb0-4b22efd24498.png";

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
