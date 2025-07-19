
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { User, LogOut, Coffee, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode;
  requiredRole?: 'owner' | 'employee';
}

export default function AdminLayout({ children, requiredRole }: AdminLayoutProps) {
  const auth = useAuth0();
  console.log('Auth0 context:', auth);
  const { user, isAuthenticated, logout } = auth;
  console.log('user data____:', user, '_______isAuthenticated:', isAuthenticated, '******requiredRole:', requiredRole);
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Check for specific role requirement
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Admin Header */}
      <header className="bg-primary text-primary-foreground p-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif font-bold">JOE's CAFFÉ</Link>
          
          <div className="flex items-center gap-6">
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <Link 
                to="/orders" 
                className="flex items-center gap-1 px-3 py-2 rounded hover:bg-primary-foreground/10"
              >
                <ClipboardList className="h-4 w-4" /> Orders
              </Link>
              
              {user?.role === 'owner' && (
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-1 px-3 py-2 rounded hover:bg-primary-foreground/10"
                >
                  <Coffee className="h-4 w-4" /> Dashboard
                </Link>
              )}
            </nav>
            
            <div className="flex items-center gap-2">
              <span className="text-sm hidden sm:inline-block">
                <User className="h-4 w-4 inline mr-1" />
                {user?.name}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout} 
                className="bg-transparent hover:bg-primary-foreground/10 text-primary-foreground border-primary-foreground"
              >
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-background">
        {children}
      </main>
    </div>
  );
}
