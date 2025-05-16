
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

  // Use the newly uploaded logo as default or fallback to the previous one
  const logoSrc = customLogo || "/lovable-uploads/48620567-47f4-4726-9a4e-b245b9707c47.png";

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
