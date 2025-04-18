
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Logo from '@/components/shared/Logo';
import SearchInput from '@/components/shared/SearchInput';
import MealCard from '@/components/shared/MealCard';
import CategoryFilter from '@/components/shared/CategoryFilter';
import MapView from '@/components/shared/MapView';
import { meals, categories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const DeliveryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showMap, setShowMap] = useState(false);
  const [filteredMeals, setFilteredMeals] = useState(meals);

  useEffect(() => {
    filterMeals();
  }, [searchQuery, activeCategory]);

  const filterMeals = () => {
    let filtered = [...meals];
    
    if (searchQuery) {
      filtered = filtered.filter(meal => 
        meal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.chef.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeCategory !== "All") {
      filtered = filtered.filter(meal => meal.category === activeCategory);
    }
    
    setFilteredMeals(filtered);
  };

  const mapLocations = meals.map(meal => ({
    id: meal.id,
    name: meal.title,
    lat: 37.7749 + (Math.random() * 0.05 - 0.025), // Random coords for demo
    lng: -122.4194 + (Math.random() * 0.05 - 0.025),
    type: 'chef' as const
  }));

  return (
    <MainLayout>
      <div className="py-6">
        <div className="flex justify-center mb-6">
          <Logo size="md" />
        </div>
        
        <div className="flex items-center space-x-2 mb-6">
          <SearchInput 
            placeholder="Search for meals, chefs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button 
            variant={showMap ? "default" : "outline"} 
            size="icon"
            onClick={() => setShowMap(!showMap)}
            className={showMap ? "bg-feedoria-purple hover:bg-feedoria-purple-dark" : ""}
          >
            <MapPin className="h-5 w-5" />
          </Button>
        </div>
        
        <CategoryFilter
          categories={categories.meals}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        
        {showMap && (
          <div className="mb-6 fade-in">
            <MapView 
              locations={mapLocations}
              initialViewState={{
                latitude: 37.7749,
                longitude: -122.4194,
                zoom: 13
              }}
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredMeals.map((meal, index) => (
            <div key={meal.id} className={`slide-in`} style={{ animationDelay: `${index * 0.1}s` }}>
              <MealCard
                id={meal.id}
                title={meal.title}
                chef={meal.chef}
                price={meal.price}
                rating={meal.rating}
                image={meal.image}
                distance={meal.distance}
                time={meal.time}
                onClick={() => console.log(`Meal ${meal.id} clicked`)}
              />
            </div>
          ))}
        </div>
        
        {filteredMeals.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No meals found matching your criteria</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DeliveryPage;
