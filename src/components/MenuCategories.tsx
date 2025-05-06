
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/menuData';

interface MenuCategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const MenuCategories = ({ activeCategory, setActiveCategory }: MenuCategoriesProps) => {
  return (
    <section className="py-6">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-serif font-medium mb-2">Joe's Café Menu</h2>
          <div className="w-24 h-1 mx-auto bg-primary rounded"></div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 max-h-[300px] overflow-y-auto px-4">
          <Button
            key="all"
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            className={`rounded-full ${activeCategory === 'all' ? '' : 'hover:bg-secondary'}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              className={`rounded-full ${activeCategory === category.id ? '' : 'hover:bg-secondary'} text-sm md:text-base`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuCategories;
