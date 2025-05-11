
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types';

// Temporary mock users for demonstration
const MOCK_USERS = [
  { id: '1', email: 'owner@joes.cafe', password: 'owner123', name: 'Joe', role: 'owner' as const },
  { id: '2', email: 'employee@joes.cafe', password: 'employee123', name: 'Sarah', role: 'employee' as const }
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const user = MOCK_USERS.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        // Store user info in localStorage (in a real app, use tokens)
        const userInfo: User = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
        localStorage.setItem('cafeUser', JSON.stringify(userInfo));
        
        // Redirect based on role
        if (user.role === 'owner') {
          navigate('/dashboard');
        } else {
          navigate('/orders');
        }
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#8B4513]">JOE's CAFFÉ</h1>
          <p className="text-muted-foreground mt-2">Staff Login</p>
        </div>
        
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
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground mt-4">
            <p>Demo accounts:</p>
            <p>Owner: owner@joes.cafe / owner123</p>
            <p>Employee: employee@joes.cafe / employee123</p>
          </div>
        </form>
      </div>
    </div>
  );
}
