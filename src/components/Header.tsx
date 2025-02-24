import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface User {
  name: string;
  avatar?: string;
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        setUser(null);
        navigate('/login');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo et navigation principale */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.svg" alt="CollabHub" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-indigo-600">CollabHub</span>
            </Link>
            
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/projects" className="text-gray-600 hover:text-gray-900">
                Projets
              </Link>
              <Link to="/services" className="text-gray-600 hover:text-gray-900">
                Services
              </Link>
              <Link to="/directory" className="text-gray-600 hover:text-gray-900">
                Annuaire
              </Link>
              <Link to="/tools" className="text-gray-600 hover:text-gray-900">
                Outils
              </Link>
            </div>
          </div>

          {/* Menu utilisateur */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={user.avatar || '/default-avatar.png'}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-gray-700">{user.name}</span>
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Mon profil
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Tableau de bord
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Paramètres
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu mobile déroulant */}
        {isOpen && (
          <div className="md:hidden py-4">
            <Link
              to="/projects"
              className="block py-2 text-gray-600 hover:text-gray-900"
            >
              Projets
            </Link>
            <Link
              to="/services"
              className="block py-2 text-gray-600 hover:text-gray-900"
            >
              Services
            </Link>
            <Link
              to="/directory"
              className="block py-2 text-gray-600 hover:text-gray-900"
            >
              Annuaire
            </Link>
            <Link
              to="/tools"
              className="block py-2 text-gray-600 hover:text-gray-900"
            >
              Outils
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;