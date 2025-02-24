import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">À propos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-indigo-400">
                  Qui sommes-nous
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-indigo-400">
                  Carrières
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-indigo-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/press" className="hover:text-indigo-400">
                  Presse
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="hover:text-indigo-400">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-indigo-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-indigo-400">
                  Sécurité
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="hover:text-indigo-400">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-indigo-400">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-indigo-400">
                  Cookies
                </Link>
              </li>
              <li>
                <Link to="/gdpr" className="hover:text-indigo-400">
                  RGPD
                </Link>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/collabhub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com/company/collabhub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/collabhub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} CollabHub. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;