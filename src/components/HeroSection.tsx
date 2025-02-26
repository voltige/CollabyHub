import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'freelance' | 'client'>('freelance');

  return (
    <section className="relative overflow-hidden">
      {/* Fond avec gradient et animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 opacity-90">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid-8 [mask-image:radial-gradient(white,transparent_70%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenu principal */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Libérez votre potentiel freelance
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
              Rejoignez la communauté CollabHub et transformez votre passion en succès professionnel.
              Trouvez des projets inspirants, collaborez avec des clients exceptionnels.
            </p>

            {/* Sélecteur de profil */}
            <div className="mt-8 inline-flex p-1 space-x-1 bg-indigo-800/50 rounded-xl">
              <button
                className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'freelance'
                    ? 'bg-white text-indigo-600'
                    : 'text-white hover:bg-white/10'
                }`}
                onClick={() => setActiveTab('freelance')}
              >
                Je suis freelance
              </button>
              <button
                className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'client'
                    ? 'bg-white text-indigo-600'
                    : 'text-white hover:bg-white/10'
                }`}
                onClick={() => setActiveTab('client')}
              >
                Je suis client
              </button>
            </div>

            {/* CTA adaptés au profil */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to={`/register/${activeTab}`}
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-white text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                Commencer gratuitement
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-indigo-700/50 text-white hover:bg-indigo-700/60 transition-colors"
              >
                Découvrir les fonctionnalités
              </a>
            </div>
          </div>

          {/* Illustration/Stats */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8">
              {activeTab === 'freelance' ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span className="text-white">Projets disponibles</span>
                    <span className="text-2xl font-bold text-white">500+</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span className="text-white">Gain moyen mensuel</span>
                    <span className="text-2xl font-bold text-white">4.5k€</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span className="text-white">Freelances actifs</span>
                    <span className="text-2xl font-bold text-white">10k+</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span className="text-white">Talents disponibles</span>
                    <span className="text-2xl font-bold text-white">1000+</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span className="text-white">Délai moyen</span>
                    <span className="text-2xl font-bold text-white">48h</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span className="text-white">Satisfaction client</span>
                    <span className="text-2xl font-bold text-white">98%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Badges flottants */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              Nouveau : IA intégrée
            </div>
          </div>
        </div>
      </div>

      {/* Vague décorative */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24 fill-current text-gray-50" viewBox="0 0 1440 74">
          <path d="M0,0 C480,74 960,74 1440,0 L1440,74 L0,74 Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;