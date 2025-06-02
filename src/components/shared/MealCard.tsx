
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent triggering the card's onClick
    const message = `Hi! I'm interested in ordering "${title}" by Chef ${chef} for $${price.toFixed(2)}. Can you help me with this?`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card 
      onClick={onClick} 
      className="overflow-hidden hover-scale cursor-pointer border-none shadow-md h-full relative"
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

          <Button
            onClick={handleWhatsAppClick}
            size="sm"
            className="absolute bottom-3 left-3 z-10 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full h-10 w-10"
          >
            <svg 
              className="w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </Button>

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
