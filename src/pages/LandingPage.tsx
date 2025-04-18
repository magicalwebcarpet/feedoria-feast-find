
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ChefHat, Calendar, Store } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import SearchInput from '@/components/shared/SearchInput';
import { categories } from '@/lib/data';

const LandingPage = () => {
  const navigate = useNavigate();

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
                <SearchInput
                  placeholder="Enter your location..."
                  className="flex-grow"
                  onChange={(e) => console.log(e.target.value)}
                />
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
