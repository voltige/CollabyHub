import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-indigo-600 to-indigo-800">
      {/* Overlay de motif */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" width="100%" height="100%">
          <pattern id="hero-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 40L40 0M0 0L40 40" stroke="currentColor" strokeWidth="1" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-24 lg:pt-32 lg:pb-40">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">La plateforme des</span>
              <span className="block text-indigo-200">freelances nouvelle génération</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-indigo-100 sm:text-xl md:mt-5 md:max-w-3xl">
              Trouvez des projets passionnants, collaborez avec des clients de qualité et gérez votre activité freelance en toute simplicité.
            </p>
            <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
              <div className="space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                >
                  Commencer gratuitement
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="border-t border-indigo-500 bg-indigo-800 bg-opacity-50">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <span className="block text-4xl font-bold text-white">10K+</span>
                <span className="block mt-1 text-base text-indigo-200">Freelances actifs</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl font-bold text-white">5M€</span>
                <span className="block mt-1 text-base text-indigo-200">Projets réalisés</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl font-bold text-white">98%</span>
                <span className="block mt-1 text-base text-indigo-200">Clients satisfaits</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vagues décoratives */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-24 fill-current text-gray-50"
            viewBox="0 0 1440 74"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,0 C480,74 960,74 1440,0 L1440,74 L0,74 Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;