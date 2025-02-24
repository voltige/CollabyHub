import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-indigo-900 mb-6">
            Bienvenue sur CollabHub
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            La plateforme qui connecte les freelances avec des projets innovants
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Commencer
            </Link>
            <Link
              to="/projects"
              className="px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Explorer les projets
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
              Pour les Freelances
            </h2>
            <p className="text-gray-600 mb-4">
              Trouvez des projets passionnants et développez votre carrière freelance
            </p>
            <Link
              to="/directory"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Rejoindre la communauté →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
              Pour les Clients
            </h2>
            <p className="text-gray-600 mb-4">
              Publiez vos projets et trouvez les meilleurs talents pour les réaliser
            </p>
            <Link
              to="/create-project"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Poster un projet →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
              Collaboration Simplifiée
            </h2>
            <p className="text-gray-600 mb-4">
              Des outils intégrés pour une gestion de projet efficace
            </p>
            <Link
              to="/features"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Découvrir les fonctionnalités →
            </Link>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-indigo-900 mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-gray-600 mb-6">
            Rejoignez notre communauté grandissante de freelances et d'entreprises
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            S'inscrire gratuitement
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;