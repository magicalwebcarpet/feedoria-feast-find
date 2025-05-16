
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

  const logoSrc = customLogo || "/lovable-uploads/b1e16c3d-c93b-41a9-ac18-4021c81f4ef8.png";

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
