import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: '💼',
    title: 'Gestion de Projet Intelligente',
    description: 'Organisez vos projets, suivez leur progression et collaborez efficacement avec une suite d'outils intégrés alimentés par l'IA.',
    link: '/features/project-management'
  },
  {
    icon: '💳',
    title: 'Paiements Sécurisés',
    description: 'Système de paiement sécurisé avec garantie de dépôt et transferts internationaux à taux avantageux.',
    link: '/features/payments'
  },
  {
    icon: '📊',
    title: 'Tableau de Bord Analytique',
    description: 'Suivez vos performances, revenus et métriques clés avec des tableaux de bord personnalisables.',
    link: '/features/analytics'
  },
  {
    icon: '🤖',
    title: 'Assistant IA',
    description: 'Profitez de recommandations personnalisées et d'une aide à la rédaction propulsées par l'intelligence artificielle.',
    link: '/features/ai-assistant'
  },
  {
    icon: '📝',
    title: 'Contrats Intelligents',
    description: 'Générez et gérez vos contrats professionnels avec des modèles personnalisables et une signature électronique.',
    link: '/features/contracts'
  },
  {
    icon: '🌐',
    title: 'Réseau Professionnel',
    description: 'Développez votre réseau, trouvez des collaborateurs et partagez votre expertise avec la communauté.',
    link: '/features/network'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Une suite complète d'outils pour réussir en freelance
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Découvrez toutes les fonctionnalités qui font de CollabHub la plateforme idéale pour les freelances et leurs clients.
          </p>
        </div>

        {/* Grille de fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="h-full flex flex-col">
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
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

              {/* Effet de surbrillance au survol */}
              <div className="absolute inset-0 rounded-2xl bg-indigo-50 opacity-0 group-hover:opacity-10 transition-opacity" />
            </Link>
          ))}
        </div>

        {/* Bannière CTA */}
        <div className="mt-16 bg-indigo-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                Prêt à commencer ?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-indigo-100">
                Rejoignez des milliers de freelances qui ont déjà transformé leur activité avec CollabHub.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <div className="flex space-x-4">
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  S'inscrire gratuitement
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-500 hover:bg-indigo-400"
                >
                  Voir les tarifs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;