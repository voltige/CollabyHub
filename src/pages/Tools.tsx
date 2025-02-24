import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  link: string;
  category: 'communication' | 'productivity' | 'finance' | 'legal';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Boîte à outils</h1>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tous les outils
          </button>
          {['communication', 'productivity', 'finance', 'legal'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => (
          <Link
            key={tool.id}
            to={tool.link}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{tool.icon}</span>
              <h2 className="text-xl font-semibold">{tool.name}</h2>
            </div>
            <p className="text-gray-600">{tool.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-indigo-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Vous ne trouvez pas l'outil qu'il vous faut ?</h2>
        <p className="text-gray-600 mb-4">
          Suggérez-nous de nouveaux outils pour améliorer votre expérience sur CollabHub.
        </p>
        <Link
          to="/tools/suggest"
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Suggérer un outil
        </Link>
      </div>
    </div>
  );
};

export default Tools;