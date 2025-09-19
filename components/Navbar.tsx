import React, { useState, useEffect, useRef } from 'react';
import type { User } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import UserIcon from './icons/UserIcon';
import { translations } from '../config/translations';
import GemobiLogo from './icons/GemobiLogo';

interface NavbarProps {
  children?: React.ReactNode;
  user: User | null;
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ children, user, onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 lg:px-8 z-20 sticky top-0">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          {children}
           <GemobiLogo className="h-8 w-auto" />
        </div>
        {user ? (
            <div className="relative" ref={menuRef}>
            <button
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
            >
              <span className="text-sm text-gray-600 hidden sm:block truncate max-w-[150px]">{user.email}</span>
              <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center ring-2 ring-offset-2 ring-transparent group-hover:ring-indigo-300 transition-all">
                <UserIcon className="w-5 h-5 text-indigo-500" />
              </div>
            </button>
            {isMenuOpen && (
               <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-30 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    {translations.es_MX.config}
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    {translations.es_MX.plans}
                  </a>
                  <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors">
                    {translations.es_MX.logoutButton}
                  </button>
              </div>
            )}
          </div>
        ) : (
            <button
                onClick={onLoginClick}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
                {translations.es_MX.loginNavButton}
            </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;