
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

interface MealCardProps {
  id: string;
  title: string;
  chef: string;
  price: number;
  rating: number;
  image: string;
  images?: string[]; // Array of images for carousel
  chefAvatar?: string; // Chef's profile picture
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
  images = [], 
  chefAvatar,
  distance, 
  time, 
  onClick 
}: MealCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Use provided images array, or fallback to single image in an array
  const allImages = images.length > 0 ? images : [image];
  
  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent triggering the card's onClick
    setIsFavorite(!isFavorite);
  };

  return (
    <Card 
      onClick={onClick} 
      className="overflow-hidden hover-scale cursor-pointer border-none shadow-md h-full"
    >
      <CardContent className="p-0">
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {allImages.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={img} 
                      alt={`${title} ${index + 1}`} 
                      className="h-full w-full object-cover rounded-t-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {allImages.length > 1 && (
              <>
                <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
                <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
              </>
            )}
          </Carousel>
          
          <button 
            className="absolute top-3 left-3 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
            onClick={handleFavoriteClick}
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-feedoria-red stroke-feedoria-red' : 'stroke-gray-700'}`} 
            />
          </button>

          {distance && time && (
            <div className="absolute bottom-3 right-3 bg-white rounded-full px-3 py-1.5 text-xs font-medium flex items-center shadow-sm">
              <span>{distance}</span>
              <span className="mx-1.5">•</span>
              <span>{time}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 bg-white rounded-b-lg space-y-2">
        <div className="flex justify-between w-full">
          <h3 className="font-medium text-base truncate">{title}</h3>
          <div className="flex items-center ml-2">
            <Star className="w-4 h-4 fill-feedoria-red stroke-feedoria-red mr-1" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={chefAvatar} alt={chef} />
            <AvatarFallback>{chef.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <p className="text-muted-foreground text-sm">By {chef}</p>
        </div>
        <p className="text-feedoria-purple-dark font-semibold mt-1">${price.toFixed(2)}</p>
      </CardFooter>
    </Card>
  );
};

export default MealCard;
