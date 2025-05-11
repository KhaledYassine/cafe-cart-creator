
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, signup, isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Debug log for auth state
    console.log('Auth state:', { isAuthenticated, user });
    
    // Redirect if already logged in
    if (isAuthenticated) {
      console.log('User is authenticated, redirecting to home page');
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    try {
      console.log('Attempting login with:', email);
      await login(email, password);
      console.log('Login successful');
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      setLoginError(error.message || 'Login failed. Please check your credentials.');
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Unable to login with provided credentials"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // For demo, we'll set all new users as employees
      await signup(email, password, { name, role: 'employee' });
      toast({
        title: "Account created",
        description: "Please check your email for verification, or login if email verification is disabled",
      });
      
      // Reset form
      setEmail('');
      setPassword('');
      setName('');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message || "Unable to create account"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to check if the owner account exists
  const checkOwnerAccount = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'owner@joes.cafe',
        password: 'owner123'
      });
      
      if (error) {
        console.error('Owner account check failed:', error);
        toast({
          variant: "destructive",
          title: "Owner account issue",
          description: "The owner account may not exist or have incorrect credentials."
        });
      } else {
        // Log out immediately after checking
        await supabase.auth.signOut();
        toast({
          title: "Owner account valid",
          description: "The owner account exists and credentials are valid."
        });
      }
    } catch (error: any) {
      console.error('Owner account check error:', error);
      toast({
        variant: "destructive",
        title: "Owner account check failed",
        description: error.message || "Unable to verify owner account"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-serif font-bold text-[#8B4513]">JOE's CAFFÉ</h1>
          <p className="text-muted-foreground mt-2">Staff Portal</p>
        </div>
        
        {loginError && (
          <div className="p-3 mb-4 bg-red-100 text-red-800 rounded-md">
            {loginError}
          </div>
        )}
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : "Login"}
              </Button>
              
              <div className="text-center text-sm text-muted-foreground mt-4">
                <p>Demo accounts:</p>
                <p>Owner: owner@joes.cafe / owner123</p>
                <p>Employee: employee@joes.cafe / employee123</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={checkOwnerAccount}
                  className="mt-2"
                >
                  Verify Owner Account
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="signup-name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="signup-email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="signup-password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground">Password must be at least 6 characters</p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : "Sign Up"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
