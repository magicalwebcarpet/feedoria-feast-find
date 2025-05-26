import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ChefHat, Calendar, Store, MapPin } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import SearchInput from '@/components/shared/SearchInput';
import { categories } from '@/lib/data';
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

// Country data with cities
const countryData = [
  {
    country: "Morocco",
    flag: "🇲🇦",
    cities: ["Casablanca", "Marrakech", "Rabat", "Fez", "Tangier"]
  },
  {
    country: "Tunisia",
    flag: "🇹🇳",
    cities: ["Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte"]
  },
  {
    country: "Algeria",
    flag: "🇩🇿",
    cities: ["Algiers", "Oran", "Constantine", "Annaba", "Batna"]
  },
  {
    country: "France",
    flag: "🇫🇷",
    cities: ["Paris", "Lyon", "Marseille", "Bordeaux", "Nice"]
  },
  {
    country: "Italy",
    flag: "🇮🇹", 
    cities: ["Rome", "Milan", "Venice", "Florence", "Naples"]
  },
  {
    country: "Spain",
    flag: "🇪🇸",
    cities: ["Madrid", "Barcelona", "Valencia", "Seville", "Malaga"]
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    cities: ["Toronto", "Montreal", "Vancouver", "Calgary", "Ottawa"]
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsDialogOpen(false);
  };

  const handleFindFood = () => {
    navigate('/delivery');
  };

  const handleCategoryClick = () => {
    navigate('/delivery');
  };

  return (
    <MainLayout>
      <div className="min-h-screen -mx-8">
        {/* Hero Section with Background Image */}
        <div className="relative py-8 md:py-16 min-h-[80vh] flex items-center">
          {/* Background Image - Full Width Border to Border */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&h=1080&fit=crop')`,
              filter: 'blur(3px)',
              transform: 'scale(1.05)'
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/70" />
          
          {/* Content */}
          <div className="relative z-10 w-full text-center space-y-6 px-8">
            <div className="flex justify-center items-center gap-4 mb-6">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Hungry?
              </h1>
              <span className="text-4xl md:text-6xl font-pacifico text-feedoria-purple">
                Feedoria
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Got you covered
            </h1>
            <p className="text-xl text-gray-600">
              Order delicious meals from local chefs near you
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto p-4">
              <div className="flex gap-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <div className="flex-grow relative">
                      <SearchInput
                        placeholder={selectedCity || "Enter your location..."}
                        className="flex-grow pr-10"
                        value={selectedCity}
                        onChange={() => {}}
                        onClick={() => setIsDialogOpen(true)}
                      />
                      <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Select Your Location</h2>
                      <div className="flex h-[400px] overflow-hidden rounded-lg border">
                        {/* Countries Column */}
                        <div className="w-1/3 border-r overflow-y-auto bg-gray-50">
                          <div className="sticky top-0 bg-gray-100 p-2 font-semibold border-b">
                            Countries
                          </div>
                          <div className="divide-y">
                            {countryData.map((item) => (
                              <button
                                key={item.country}
                                onClick={() => setSelectedCountry(item.country)}
                                className={`w-full text-left p-3 flex items-center gap-2 hover:bg-gray-100 transition-colors ${
                                  selectedCountry === item.country ? 'bg-feedoria-purple/10 font-medium' : ''
                                }`}
                              >
                                <span className="text-xl">{item.flag}</span>
                                <span>{item.country}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Cities Column */}
                        <div className="w-2/3 overflow-y-auto">
                          <div className="sticky top-0 bg-gray-100 p-2 font-semibold border-b">
                            Cities
                          </div>
                          <div className="p-4">
                            {selectedCountry ? (
                              <div className="grid grid-cols-2 gap-2">
                                {countryData.find(item => item.country === selectedCountry)?.cities.map(city => (
                                  <button
                                    key={city}
                                    onClick={() => handleCitySelect(city)}
                                    className="p-2 text-left hover:bg-feedoria-purple/10 rounded-md transition-colors"
                                  >
                                    {city}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <div className="h-full flex items-center justify-center text-gray-400">
                                Select a country to see available cities
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button 
                  className="bg-feedoria-purple hover:bg-feedoria-purple-dark"
                  onClick={handleFindFood}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Find Food
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-gray-50 px-8">
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
        <div className="py-12 px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            {categories.meals.slice(1, 9).map((category) => (
              <button
                key={category}
                onClick={handleCategoryClick}
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
