
import { useState } from 'react';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartItem } from '@/types';
import { toast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { useOrders } from '@/context/OrderContext';

interface CartProps {
  isOpen: boolean;
  cartItems: CartItem[];
  updateItemQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  closeCart: () => void;
  clearCart: () => void;
}

const Cart = ({ 
  isOpen, 
  cartItems, 
  updateItemQuantity, 
  removeItem, 
  closeCart,
  clearCart
}: CartProps) => {
  const [tableNumber, setTableNumber] = useState('');
  const [notes, setNotes] = useState('');
  const { addOrder } = useOrders();
  
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!tableNumber.trim()) {
      toast({
        title: "Table number is required",
        description: "Please enter your table number to proceed",
        variant: "destructive",
      });
      return;
    }
    
    // Add order to the system
    addOrder(cartItems, tableNumber, notes);
    
    toast({
      title: "Order placed!",
      description: `Your order for table ${tableNumber} has been received.`,
    });
    
    clearCart();
    setTableNumber('');
    setNotes('');
    closeCart();
  };

  return (
    <div 
      className={`fixed top-0 right-0 z-50 h-screen w-full md:w-96 bg-background border-l shadow-xl transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-serif font-semibold flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
          </h2>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close cart</span>
          </Button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" strokeWidth={1.5} />
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add some delicious items from our menu
            </p>
            <Button 
              className="mt-6" 
              variant="outline"
              onClick={closeCart}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-auto p-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between py-3 border-b last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 rounded-full p-0"
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 rounded-full p-0"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground h-6 px-1 hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Table Number</span>
                <Input
                  type="number"
                  placeholder="Enter table #"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-28 text-right"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="notes" className="text-sm text-muted-foreground mb-1 block">
                  Special instructions
                </label>
                <Textarea
                  id="notes"
                  placeholder="Any special requests?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full"
                  rows={2}
                />
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="grid gap-2">
                <Button onClick={handleCheckout}>
                  Checkout
                </Button>
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
