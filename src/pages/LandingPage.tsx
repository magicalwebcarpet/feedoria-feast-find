
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ChefHat, Calendar, Store, MapPin } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import SearchInput from '@/components/shared/SearchInput';
import { categories } from '@/lib/data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const cities = [
    "London", 
    "Manchester", 
    "Birmingham", 
    "Leeds", 
    "Glasgow", 
    "Edinburgh", 
    "Liverpool", 
    "Bristol", 
    "Sheffield", 
    "Newcastle"
  ];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsOpen(false);
  };

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="py-8 md:py-16">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Hungry? We've got you covered
            </h1>
            <p className="text-xl text-gray-600">
              Order delicious meals from local chefs near you
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto p-4">
              <div className="flex gap-2">
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <PopoverTrigger asChild>
                    <div className="flex-grow relative">
                      <SearchInput
                        placeholder={selectedCity || "Enter your location..."}
                        className="flex-grow pr-10"
                        value={selectedCity}
                        onChange={() => {}}
                        onClick={() => setIsOpen(true)}
                      />
                      <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 max-h-[300px] overflow-y-auto">
                    <div className="rounded-md border bg-white shadow-md">
                      {cities.map((city) => (
                        <button
                          key={city}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                          onClick={() => handleCitySelect(city)}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <Button 
                  className="bg-feedoria-purple hover:bg-feedoria-purple-dark"
                  onClick={() => navigate('/delivery')}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Find Food
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-gray-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Feedoria Works</h2>
            <p className="text-gray-600">Your favorite meals, just a few clicks away</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
            <div className="text-center space-y-4">
              <div className="bg-feedoria-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <ChefHat className="w-8 h-8 text-feedoria-purple" />
              </div>
              <h3 className="font-semibold text-xl">Local Chefs</h3>
              <p className="text-gray-600">Order from talented chefs in your neighborhood</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-feedoria-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8 text-feedoria-purple" />
              </div>
              <h3 className="font-semibold text-xl">Book Events</h3>
              <p className="text-gray-600">Experience unique dining events and workshops</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-feedoria-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Store className="w-8 h-8 text-feedoria-purple" />
              </div>
              <h3 className="font-semibold text-xl">Gourmet Store</h3>
              <p className="text-gray-600">Shop premium ingredients and kitchen essentials</p>
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            {categories.meals.slice(1, 9).map((category) => (
              <button
                key={category}
                onClick={() => navigate('/delivery')}
                className="group relative aspect-square overflow-hidden rounded-xl hover:scale-105 transition-transform"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10" />
                <img
                  src={`https://source.unsplash.com/random/400x400/?${category.toLowerCase()},food`}
                  alt={category}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-4 left-4 text-white font-semibold z-20">
                  {category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LandingPage;
