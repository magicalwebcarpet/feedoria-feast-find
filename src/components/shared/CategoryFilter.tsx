
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({
  categories,
  activeCategory,
  onSelectCategory
}: CategoryFilterProps) => {
  return (
    <ScrollArea className="w-full pb-2">
      <Tabs defaultValue={activeCategory || categories[0]} className="mb-6">
        <TabsList className="bg-gray-100 p-1">
          <div className="flex gap-1 min-w-max">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-white data-[state=active]:text-feedoria-purple"
                onClick={() => onSelectCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
      </Tabs>
    </ScrollArea>
  );
};

export default CategoryFilter;
