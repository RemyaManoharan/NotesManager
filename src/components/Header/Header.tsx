import { Link, useNavigate } from 'react-router-dom';

import { AiOutlinePlus } from 'react-icons/ai';
// import notelogo from '../../assets/notelogo.png';
import { Button } from '../ui/button';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Search', path: '/search', isButton: true },
    {
      label: 'New note',
      path: '/create',
      isButton: true,
      icon: <AiOutlinePlus className="h-4 w-4" />,
    },
  ];

  return (
    <header className="w-full border-b border-gray-200 bg-background shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <div className="w-full px-4">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-bold text-foreground hover:text-muted-foreground"
            >
              NoteHub
            </Link>
          </div>

          {/* Right side - Desktop Navigation and Actions */}

          <div className="hidden items-center space-x-4 md:flex">
            {menuItems.map(({ label, path, isButton, icon }) =>
              isButton ? (
                <Button key={path} size="sm" onClick={() => navigate(path)}>
                  {icon}
                  <span>{label}</span>
                </Button>
              ) : (
                <Link
                  key={path}
                  to={path}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {label}
                </Link>
              )
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6 bg-background" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute right-4 top-16 flex w-48 flex-col space-y-2 rounded-lg border bg-gray-100 p-4 shadow-lg md:hidden">
            {menuItems.map(({ label, path, isButton, icon }) =>
              isButton ? (
                <Button
                  key={path}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate(path);
                    setIsMenuOpen(false);
                  }}
                >
                  {icon}
                  <span>{label}</span>
                </Button>
              ) : (
                <Link
                  key={path}
                  to={path}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              )
            )}
            <ThemeToggle />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
