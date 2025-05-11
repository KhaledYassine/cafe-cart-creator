
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import DataSeeder from '@/components/DataSeeder';
import { useAuth } from '@/context/AuthContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Redirect if not authenticated or not an owner
  useEffect(() => {
    console.log('Admin page auth check:', { isAuthenticated, userRole: user?.role });
    
    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to login');
      setAuthError('You must be logged in to access this page');
      setTimeout(() => navigate('/login'), 2000);
    } else if (user?.role !== 'owner') {
      console.log('User is not an owner, redirecting to home');
      setAuthError('You must be an owner to access this page');
      setTimeout(() => navigate('/'), 2000);
    }
  }, [isAuthenticated, user, navigate]);
  
  if (!isAuthenticated || user?.role !== 'owner') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            {authError || 'You do not have permission to access this page'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="container px-4 mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Admin Tools</h1>
        <div className="mb-6">
          <Alert>
            <AlertTitle>Authentication Status</AlertTitle>
            <AlertDescription>
              Logged in as: {user?.name} ({user?.email})<br />
              Role: {user?.role}<br />
              User ID: {user?.id}
            </AlertDescription>
          </Alert>
        </div>
        
        <div className="grid gap-8">
          <DataSeeder />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
