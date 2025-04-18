
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  title: string;
  chef: string;
  price: number;
  image: string;
  onClick?: () => void;
  onAddToCart?: () => void;
}

const ProductCard = ({ 
  title, 
  chef, 
  price, 
  image, 
  onClick, 
  onAddToCart 
}: ProductCardProps) => {
  return (
    <Card 
      className="overflow-hidden hover-scale border-none shadow-md"
    >
      <CardContent className="p-0 cursor-pointer" onClick={onClick}>
        <div className="aspect-square">
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover rounded-t-lg"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-3 bg-white rounded-b-lg">
        <h3 className="font-medium text-base truncate w-full">{title}</h3>
        <p className="text-muted-foreground text-xs">By {chef}</p>
        <div className="flex justify-between items-center w-full mt-2">
          <p className="text-feedoria-purple-dark font-semibold">${price.toFixed(2)}</p>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }} 
            size="sm" 
            className="bg-feedoria-purple hover:bg-feedoria-purple-dark"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
