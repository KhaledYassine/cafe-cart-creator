
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import DataSeeder from '@/components/DataSeeder';
import { useAuth } from '@/context/AuthContext';

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated or not an owner
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user?.role !== 'owner') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);
  
  if (!isAuthenticated || user?.role !== 'owner') {
    return null;
  }

  return (
    <AdminLayout>
      <div className="container px-4 mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Admin Tools</h1>
        
        <div className="grid gap-8">
          <DataSeeder />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
