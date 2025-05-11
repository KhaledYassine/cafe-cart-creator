
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Order, CartItem, SupabaseOrder, SupabaseOrderItem } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';

interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], tableNumber: string, notes?: string) => Promise<void>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  getOrdersByDate: (date: string) => Order[];
  getOrdersByStatus: (status: Order['status']) => Order[];
  isLoading: boolean;
  refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated]);
  
  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (ordersError) throw ordersError;
      
      // Get all order items for these orders
      const orderIds = ordersData.map(order => order.id);
      
      if (orderIds.length > 0) {
        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select('*')
          .in('order_id', orderIds);
          
        if (itemsError) throw itemsError;
        
        // Map order items to their respective orders
        const ordersWithItems = (ordersData as SupabaseOrder[]).map(order => {
          const orderItems = (itemsData as SupabaseOrderItem[])
            .filter(item => item.order_id === order.id)
            .map(item => ({
              id: item.menu_item_id || item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              // Add default values for required MenuItem properties
              description: '',
              image: '',
              category: '',
              tags: []
            }));
          
          // Convert from Supabase format to our app's Order format
          return {
            id: order.id,
            items: orderItems,
            tableNumber: order.table_number,
            status: order.status as 'pending' | 'completed' | 'canceled',
            total: order.total,
            createdAt: order.created_at,
            notes: order.notes || undefined
          } as Order;
        });
        
        setOrders(ordersWithItems);
      } else {
        setOrders([]);
      }
      
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addOrder = async (items: CartItem[], tableNumber: string, notes?: string) => {
    try {
      // Calculate total
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      
      // First insert the order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          { 
            table_number: tableNumber, 
            status: 'pending', 
            total,
            notes 
          }
        ])
        .select()
        .single();
        
      if (orderError) throw orderError;
      
      // Then insert order items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        menu_item_id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
        
      if (itemsError) throw itemsError;
      
      // Create the complete order object with items
      const newOrder: Order = {
        id: orderData.id,
        items,
        tableNumber: orderData.table_number,
        status: orderData.status as 'pending' | 'completed' | 'canceled',
        total: orderData.total,
        createdAt: orderData.created_at,
        notes: orderData.notes || undefined
      };
      
      setOrders(prevOrders => [newOrder, ...prevOrders]);
      toast({ title: 'Order placed successfully' });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to place order',
        description: error.message
      });
      throw error;
    }
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === id ? { ...order, status } : order
        )
      );
      
      toast({ title: `Order ${status}` });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to update order',
        description: error.message
      });
      throw error;
    }
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

  const refreshOrders = async () => {
    return loadOrders();
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getOrdersByDate,
        getOrdersByStatus,
        isLoading,
        refreshOrders
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
