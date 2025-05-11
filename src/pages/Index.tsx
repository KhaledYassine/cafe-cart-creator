
import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MenuCategories from '@/components/MenuCategories';
import MenuList from '@/components/MenuList';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import { CartItem, MenuItem } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useMenu } from '@/context/MenuContext';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { menuItems, categories } = useMenu();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeCategories, setActiveCategories] = useState<string[]>(categories.map(cat => cat.id));
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  // Update active categories when categories change
  useEffect(() => {
    setActiveCategories(categories.map(cat => cat.id));
  }, [categories]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (item: MenuItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // Item exists in cart, update quantity
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Item doesn't exist in cart, add it
        toast({
          title: "Item added to cart",
          description: `${item.name} has been added to your cart.`,
        });
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItems={cartItems} toggleCart={toggleCart} />

      <main className="flex-grow">
        <Hero scrollToMenu={scrollToMenu} />

        <div ref={menuRef}>
          <MenuCategories
            activeCategories={activeCategories}
            setActiveCategories={setActiveCategories}
          />

          <MenuList
            activeCategories={activeCategories}
            addToCart={addToCart}
          />
        </div>
        
        {isAuthenticated && (
          <div className="bg-primary/5 py-8">
            <div className="container mx-auto px-4 text-center">
              <h3 className="text-xl font-serif mb-3">Staff Portal</h3>
              <p className="text-muted-foreground mb-4">
                Welcome back, {user?.name}! Access the staff portal below:
              </p>
              <div className="flex justify-center gap-4">
                <Link to={user?.role === 'owner' ? '/dashboard' : '/orders'} className="inline-flex">
                  <Button variant="default">
                    {user?.role === 'owner' ? 'Dashboard' : 'View Orders'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Cart
        isOpen={isCartOpen}
        cartItems={cartItems}
        updateItemQuantity={updateItemQuantity}
        removeItem={removeItem}
        closeCart={closeCart}
        clearCart={clearCart}
      />

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeCart}
        />
      )}

      <Footer />
    </div>
  );
};

import { Button } from '@/components/ui/button';
export default Index;
