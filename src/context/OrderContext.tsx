
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Order, CartItem } from '@/types';

interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], tableNumber: string, notes?: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  getOrdersByDate: (date: string) => Order[];
  getOrdersByStatus: (status: Order['status']) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Load orders from localStorage on mount
  useEffect(() => {
    const storedOrders = localStorage.getItem('cafeOrders');
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (error) {
        console.error('Failed to parse stored orders', error);
      }
    }
  }, []);
  
  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cafeOrders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (items: CartItem[], tableNumber: string, notes?: string) => {
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      items,
      tableNumber,
      status: 'pending',
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      createdAt: new Date().toISOString(),
      notes
    };
    
    setOrders(prevOrders => [...prevOrders, newOrder]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const getOrdersByDate = (dateString: string) => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= date && orderDate < nextDate;
    });
  };

  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => order.status === status);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getOrdersByDate,
        getOrdersByStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
