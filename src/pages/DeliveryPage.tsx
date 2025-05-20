
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Logo from '@/components/shared/Logo';
import SearchInput from '@/components/shared/SearchInput';
import MealCard from '@/components/shared/MealCard';
import CategoryFilter from '@/components/shared/CategoryFilter';
import { meals, categories } from '@/lib/data';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Enhance meals with multiple images and chef avatars
const enhancedMeals = meals.map(meal => ({
  ...meal,
  images: [
    meal.image,
    // Generate additional images for each meal by adding query parameters to make URLs unique
    `${meal.image}?v=2`,
    `${meal.image}?v=3`
  ],
  chefAvatar: `https://i.pravatar.cc/150?u=${meal.chef.replace(/\s/g, '')}`
}));

const DeliveryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredMeals, setFilteredMeals] = useState(enhancedMeals);

  useEffect(() => {
    filterMeals();
  }, [searchQuery, activeCategory]);

  const filterMeals = () => {
    let filtered = [...enhancedMeals];
    
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

  return (
    <MainLayout>
      <div className="py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <Logo size="xl" />
          <Button variant="outline" size="icon" className="rounded-full">
            <MapPin className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Search Input */}
        <div className="mb-8">
          <SearchInput 
            placeholder="Search for meals, chefs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="mb-6">
          <CategoryFilter
            categories={categories.meals}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {filteredMeals.map((meal) => (
            <div key={meal.id} className="animate-fadeIn">
              <MealCard
                id={meal.id}
                title={meal.title}
                chef={meal.chef}
                chefAvatar={meal.chefAvatar}
                price={meal.price}
                rating={meal.rating}
                image={meal.image}
                images={meal.images}
                distance={meal.distance}
                time={meal.time}
                onClick={() => console.log(`Meal ${meal.id} clicked`)}
              />
            </div>
          ))}
        </div>
        
        {filteredMeals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No meals found matching your criteria</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DeliveryPage;
