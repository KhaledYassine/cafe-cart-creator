
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
import { Button } from '@/components/ui/button';

const Index = () => {
  const { menuItems, categories, isLoading } = useMenu();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user, isAuthenticated, logout } = useAuth();

  // Update active categories when categories change
  useEffect(() => {
    if (categories && categories.length > 0) {
      setActiveCategories(categories.map(cat => cat.id));
    }
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

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out."
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "Could not log out. Please try again."
      });
    }
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
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}

        {!isAuthenticated && (
          <div className="bg-primary/5 py-8">
            <div className="container mx-auto px-4 text-center">
              <h3 className="text-xl font-serif mb-3">Staff Access</h3>
              <p className="text-muted-foreground mb-4">
                Are you a staff member? Log in to access the admin portal.
              </p>
              <Link to="/login">
                <Button>Staff Login</Button>
              </Link>
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

export default Index;
