import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Gestion de Projets',
    description: 'Créez et gérez vos projets avec des outils collaboratifs puissants.',
    icon: '📋',
    link: '/projects'
  },
  {
    title: 'Paiements Sécurisés',
    description: 'Transactions sécurisées et gestion des paiements simplifiée.',
    icon: '💳',
    link: '/payments'
  },
  {
    title: 'Messagerie Intégrée',
    description: 'Communiquez efficacement avec vos clients et collaborateurs.',
    icon: '💬',
    link: '/messages'
  },
  {
    title: 'Suivi du Temps',
    description: 'Suivez et facturez votre temps de travail avec précision.',
    icon: '⏱️',
    link: '/time-tracking'
  },
  {
    title: 'Profils Vérifiés',
    description: 'Trouvez des talents qualifiés avec des profils vérifiés.',
    icon: '✅',
    link: '/directory'
  },
  {
    title: 'Contrats Intelligents',
    description: 'Générez et gérez vos contrats en quelques clics.',
    icon: '📄',
    link: '/contracts'
  }
];

const Features: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Fonctionnalités principales
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Tout ce dont vous avez besoin pour gérer votre activité freelance
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Link 
                key={index}
                to={feature.link}
                className="relative group"
              >
                <div className="flex flex-col h-full bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{feature.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 flex-grow">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600 group-hover:text-indigo-700">
                    En savoir plus
                    <svg 
                      className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/register"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Commencer maintenant
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;