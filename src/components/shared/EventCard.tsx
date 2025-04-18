
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface EventCardProps {
  id: string;
  title: string;
  chef: string;
  price: number;
  image: string;
  date: string;
  location: string;
  duration: string;
  onClick?: () => void;
}

const EventCard = ({ 
  title, 
  chef, 
  price, 
  image, 
  date, 
  location, 
  duration, 
  onClick 
}: EventCardProps) => {
  return (
    <Card 
      onClick={onClick} 
      className="overflow-hidden hover-scale cursor-pointer border-none shadow-md mb-4"
    >
      <CardContent className="p-0">
        <div className="relative aspect-video">
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover rounded-t-lg"
          />
          <div className="absolute top-2 right-2 bg-feedoria-red text-white rounded-full px-3 py-1 text-xs font-medium">
            ${price.toFixed(2)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 bg-white rounded-b-lg">
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-muted-foreground">Chef {chef}</p>
        
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-1 text-feedoria-purple" />
          <span>{date}</span>
        </div>
        
        <div className="flex items-center mt-1 text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1 text-feedoria-purple" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center mt-1 text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1 text-feedoria-purple" />
          <span>{duration}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
