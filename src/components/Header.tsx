
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CartItem } from '@/types';

interface HeaderProps {
  cartItems: CartItem[];
  toggleCart: () => void;
}

const Header = ({ cartItems, toggleCart }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

  // Calculate total items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? 'bg-background/95 backdrop-blur shadow-md py-3' : 'bg-background py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-cafe-brown">JOE's CAFFÉ</h1>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative"
          onClick={toggleCart}
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs min-w-[1.2rem] h-[1.2rem] flex items-center justify-center p-0 rounded-full"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
