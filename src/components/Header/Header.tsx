import { Link, useNavigate } from 'react-router-dom';

import { AiOutlinePlus } from 'react-icons/ai';
// import notelogo from '../../assets/notelogo.png';
import { Button } from '../ui/button';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <div className="w-full px-4">
        <div className="flex h-16 items-center px-4">
          {/* Left side - Logo */}
          <div className="flex items-center">
            {/* <img 
        src={notelogo}
        alt="NoteHub Logo" 
        className="h-8 w-8"
      /> */}
            <Link
              to="/"
              className="text-xl font-bold text-gray-900 hover:text-gray-700"
            >
              NoteHub
            </Link>
          </div>

          {/* Right side - Navigation and Actions */}
          <div className="ml-auto flex items-center space-x-4">
            <nav className="flex items-center space-x-4">
              <Link
                to="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Home
              </Link>
              <Button size="sm" onClick={() => navigate('/search')}>
                         <span>Search</span>
            </Button>
            </nav>

            {/* <button
            onClick={() => navigate('/create')}
            className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
          >
            <AiOutlinePlus className="h-4 w-4" />
            <span>New note</span>
          </button> */}
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
