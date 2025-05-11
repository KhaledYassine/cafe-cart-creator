
import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useOrders } from '@/context/OrderContext';
import { format } from 'date-fns';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Check, X, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Order } from '@/types';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Orders() {
  const { orders, updateOrderStatus } = useOrders();
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');

  // Filter orders by date and status
  const filteredOrders = orders.filter(order => {
    const orderDate = format(new Date(order.createdAt), 'yyyy-MM-dd');
    const matchesDate = orderDate === selectedDate;
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesDate && matchesStatus;
  });

  // Sort orders by creation time (newest first)
  const sortedOrders = [...filteredOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getStatusBadgeVariant = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'completed': return 'default';
      case 'canceled': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-serif font-bold">Today's Orders</h1>
          
          <div className="flex flex-wrap items-center gap-3">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-40"
            />
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter: {statusFilter === 'all' ? 'All Status' : statusFilter}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="space-y-2">
                  <Button 
                    variant={statusFilter === 'all' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setStatusFilter('all')}
                  >
                    All
                  </Button>
                  <Button 
                    variant={statusFilter === 'pending' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setStatusFilter('pending')}
                  >
                    Pending
                  </Button>
                  <Button 
                    variant={statusFilter === 'completed' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setStatusFilter('completed')}
                  >
                    Completed
                  </Button>
                  <Button 
                    variant={statusFilter === 'canceled' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setStatusFilter('canceled')}
                  >
                    Canceled
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {sortedOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-muted-foreground">No orders found for this date and status filter.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      {format(new Date(order.createdAt), 'h:mm a')}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {order.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{order.tableNumber}</span>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        {order.items.map((item, index) => (
                          <span key={item.id} className="block truncate">
                            {item.quantity}x {item.name}
                            {index < order.items.length - 1 ? ", " : ""}
                          </span>
                        )).slice(0, 2)}
                        {order.items.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{order.items.length - 2} more items
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${order.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {order.status === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleUpdateStatus(order.id, 'completed')}
                            >
                              <Check className="h-4 w-4 mr-1" /> Complete
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleUpdateStatus(order.id, 'canceled')}
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4 mr-1" /> Cancel
                            </Button>
                          </>
                        )}
                        {order.status !== 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUpdateStatus(order.id, 'pending')}
                          >
                            Return to Pending
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
