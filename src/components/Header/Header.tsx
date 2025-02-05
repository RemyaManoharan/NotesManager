import { Link, useNavigate } from 'react-router-dom';

import { AiOutlinePlus } from 'react-icons/ai';
// import notelogo from '../../assets/notelogo.png';
import { Button } from '../ui/button';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full border-b border-gray-200 bg-background shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <div className="w-full px-4">
        <div className="flex h-16 items-center px-4">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-bold text-foreground hover:text-muted-foreground"
            >
              NoteHub
            </Link>
          </div>

          {/* Right side - Navigation and Actions */}
          <div className="ml-auto flex items-center space-x-4">
            <nav className="flex items-center space-x-4">
              <Link
                to="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <ThemeToggle />
              <Button size="sm" onClick={() => navigate('/search')}>
                <span>Search</span>
              </Button>
            </nav>

            <Button size="sm" onClick={() => navigate('/create')}>
              {' '}
              <AiOutlinePlus className="h-4 w-4" />
              <span>New note</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
