import React from 'react';
import { Link } from 'react-router-dom';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  link: string;
  category: 'productivity' | 'finance' | 'legal' | 'communication';
}

const tools: Tool[] = [
  {
    id: '1',
    name: 'Calculateur de taux horaire',
    description: 'Calculez votre taux horaire optimal en fonction de vos dépenses et objectifs',
    icon: '💰',
    link: '/tools/rate-calculator',
    category: 'finance'
  },
  {
    id: '2',
    name: 'Générateur de contrat',
    description: 'Créez des contrats professionnels personnalisés pour vos missions',
    icon: '📄',
    link: '/tools/contract-generator',
    category: 'legal'
  },
  {
    id: '3',
    name: 'Suivi du temps',
    description: 'Suivez le temps passé sur vos projets et générez des rapports',
    icon: '⏱️',
    link: '/tools/time-tracker',
    category: 'productivity'
  },
  {
    id: '4',
    name: 'Chat en temps réel',
    description: 'Communiquez efficacement avec vos clients et collaborateurs',
    icon: '💬',
    link: '/tools/chat',
    category: 'communication'
  }
];

const Tools: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Boîte à outils</h1>

      {/* Filtres par catégorie */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Tous les outils
          </button>
          {['productivity', 'finance', 'legal', 'communication'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grille d'outils */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => (
          <Link
            key={tool.id}
            to={tool.link}
            className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{tool.icon}</span>
              <h2 className="text-xl font-semibold">{tool.name}</h2>
            </div>
            <p className="text-gray-600 mb-4">{tool.description}</p>
            <div className="flex items-center text-indigo-600">
              Accéder à l'outil
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Section d'aide */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Besoin d'un nouvel outil ?
        </h2>
        <p className="text-gray-600 mb-6">
          Nous sommes constamment en train d'améliorer notre boîte à outils.
          N'hésitez pas à nous suggérer de nouveaux outils qui pourraient vous être utiles.
        </p>
        <Link
          to="/tools/suggest"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Suggérer un outil
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Tools;