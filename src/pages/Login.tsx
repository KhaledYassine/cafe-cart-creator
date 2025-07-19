
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

export default function Login() {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-serif font-bold text-[#8B4513]">JOE's CAFFÉ</h1>
          <p className="text-muted-foreground mt-2">Staff Portal</p>
        </div>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Button
              className="w-full"
              disabled={isLoading}
              onClick={() => loginWithRedirect()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : "Login with Auth0"}
            </Button>
            {error && (
              <div className="text-red-500 mt-4 text-center">Error: {error.message}</div>
            )}
          </TabsContent>
          <TabsContent value="signup">
            <Button
              className="w-full"
              disabled={isLoading}
              onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : "Sign Up with Auth0"}
            </Button>
            {error && (
              <div className="text-red-500 mt-4 text-center">Error: {error.message}</div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
