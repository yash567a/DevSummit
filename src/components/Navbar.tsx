
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface NavbarProps {
  isLoggedIn?: boolean;
  activeSection?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn = false, activeSection = 'home' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 w-full bg-white bg-opacity-70 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold text-ghibli-deep-navy">
                <span className="text-ghibli-forest-green">Career</span>Compass
              </Link>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <NavLink to="/dashboard" isActive={activeSection === 'dashboard'}>Dashboard</NavLink>
                  <NavLink to="/skills" isActive={activeSection === 'skills'}>Skills</NavLink>
                  <NavLink to="/jobs" isActive={activeSection === 'jobs'}>Jobs</NavLink>
                  <NavLink to="/chat" isActive={activeSection === 'chat'}>AI Assistant</NavLink>
                  <Button variant="outline" className="ml-4">Profile</Button>
                </>
              ) : (
                <>
                  <NavLink to="/" isActive={activeSection === 'home'}>Home</NavLink>
                  <NavLink to="/about" isActive={activeSection === 'about'}>About</NavLink>
                  <NavLink to="/features" isActive={activeSection === 'features'}>Features</NavLink>
                  <Link to="/">
                    <Button variant="default" className="ml-4 bg-ghibli-forest-green hover:bg-ghibli-forest-green/90">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-ghibli-deep-navy hover:text-ghibli-forest-green focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white bg-opacity-90 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLoggedIn ? (
              <>
                <MobileNavLink to="/dashboard" isActive={activeSection === 'dashboard'}>Dashboard</MobileNavLink>
                <MobileNavLink to="/skills" isActive={activeSection === 'skills'}>Skills</MobileNavLink>
                <MobileNavLink to="/jobs" isActive={activeSection === 'jobs'}>Jobs</MobileNavLink>
                <MobileNavLink to="/chat" isActive={activeSection === 'chat'}>AI Assistant</MobileNavLink>
                <Link to="/profile" className="w-full block mt-2">
                  <Button variant="outline" className="w-full">Profile</Button>
                </Link>
              </>
            ) : (
              <>
                <MobileNavLink to="/" isActive={activeSection === 'home'}>Home</MobileNavLink>
                <MobileNavLink to="/about" isActive={activeSection === 'about'}>About</MobileNavLink>
                <MobileNavLink to="/features" isActive={activeSection === 'features'}>Features</MobileNavLink>
                <Link to="/" className="w-full block mt-2">
                  <Button variant="default" className="w-full bg-ghibli-forest-green hover:bg-ghibli-forest-green/90">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, isActive = false }) => {
  return (
    <Link
      to={to}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive 
          ? "text-ghibli-forest-green" 
          : "text-ghibli-deep-navy hover:text-ghibli-forest-green"
      )}
    >
      {children}
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, children, isActive = false }) => {
  return (
    <Link
      to={to}
      className={cn(
        "block px-3 py-2 rounded-md text-base font-medium transition-colors",
        isActive 
          ? "text-ghibli-forest-green" 
          : "text-ghibli-deep-navy hover:text-ghibli-forest-green"
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;
