
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface MealCardProps {
  id: string;
  title: string;
  chef: string;
  price: number;
  rating: number;
  image: string;
  distance?: string;
  time?: string;
  onClick?: () => void;
}

const MealCard = ({ 
  title, 
  chef, 
  price, 
  rating, 
  image, 
  distance, 
  time, 
  onClick 
}: MealCardProps) => {
  return (
    <Card 
      onClick={onClick} 
      className="overflow-hidden hover-scale cursor-pointer border-none shadow-md"
    >
      <CardContent className="p-0">
        <div className="relative aspect-[4/3]">
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover rounded-t-lg"
          />
          {distance && time && (
            <div className="absolute bottom-2 left-2 bg-white rounded-full px-2 py-1 text-xs font-medium flex items-center">
              <span>{distance}</span>
              <span className="mx-1">•</span>
              <span>{time}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-3 bg-white rounded-b-lg">
        <div className="flex justify-between w-full">
          <h3 className="font-medium text-base truncate">{title}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-feedoria-red stroke-feedoria-red mr-1" />
            <span className="text-sm">{rating}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">By {chef}</p>
        <p className="text-feedoria-purple-dark font-semibold mt-1">${price.toFixed(2)}</p>
      </CardFooter>
    </Card>
  );
};

export default MealCard;
