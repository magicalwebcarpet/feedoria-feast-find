
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onClick?: () => void;  // Added onClick property
}

const SearchInput = ({
  placeholder = "Search...",
  value,
  onChange,
  className,
  onClick
}: SearchInputProps) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={onClick}  // Pass onClick to the Input component
        className="pl-10 bg-gray-100 border-none focus-visible:ring-feedoria-purple"
      />
    </div>
  );
};

export default SearchInput;
