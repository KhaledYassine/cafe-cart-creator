
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import DataSeeder from '@/components/DataSeeder';
import { useAuth0 } from '@auth0/auth0-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

function getUserRole(user) {
  if (!user) return undefined;
  const roleClaim = user["https://your-app.com/role"] || user["http://localhost:8080/role"];
  if (Array.isArray(roleClaim)) return roleClaim[0];
  return roleClaim;
}

const Admin = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const userRole = getUserRole(user);

  // Redirect if not authenticated or not an owner
  useEffect(() => {
    console.log('Admin page auth check:', { isAuthenticated, userRole });
    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to login');
      setAuthError('You must be logged in to access this page');
      setTimeout(() => navigate('/login'), 2000);
    } else if (userRole !== 'owner') {
      console.log('User is not an owner, redirecting to home');
      setAuthError('You must be an owner to access this page');
      setTimeout(() => navigate('/'), 2000);
    }
  }, [isAuthenticated, userRole, navigate]);

  if (!isAuthenticated || userRole !== 'owner') {
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
              Role: {userRole}<br />
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
