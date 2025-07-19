
import { createContext, useContext, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  isOwner: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout, error } = useAuth0();
  const { toast } = useToast();

  // Map Auth0 user to local User type
  let mappedUser: User | null = null;
  if (user) {
    mappedUser = {
      id: user.sub || '',
      email: user.email || '',
      name: user.name || user.email?.split('@')[0] || '',
      role: user["https://your-app.com/role"] || 'employee', // Custom claim for role
    };
  }

  // Show error toast if Auth0 error
  if (error) {
    toast({
      variant: "destructive",
      title: "Auth error",
      description: error.message || "Authentication error",
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user: mappedUser,
        login: () => loginWithRedirect(),
        logout: () => logout(),
        isAuthenticated,
        isOwner: mappedUser?.role === 'owner',
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
