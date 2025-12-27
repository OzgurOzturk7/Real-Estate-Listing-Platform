import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, Building2, Info, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/properties', label: 'Properties', icon: Building2 },
    { path: '/about', label: 'About', icon: Info },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8 mt-4">
            <img 
              src="https://mgx-backend-cdn.metadl.com/generate/images/672291/2025-12-26/70157da4-b32c-42a9-bad0-9f36b0486ea3.png" 
              alt="Bestate Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}

            {user && (
              <>
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive('/profile')
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Profile</span>
                </Link>
                {user.user_metadata?.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive('/admin')
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">Admin Panel</span>
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Auth Section */}
          <div className="border-t pt-4 mt-4">
            {user ? (
              <div className="space-y-3">
                <div className="px-4 py-2 rounded-lg bg-accent">
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.user_metadata?.role === 'admin' ? 'Admin' : 'User'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}