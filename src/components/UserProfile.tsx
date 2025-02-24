import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface UserProfileData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title: string;
  bio: string;
  skills: string[];
  hourlyRate: number;
  availability: string;
  location: string;
  languages: string[];
  portfolio: {
    title: string;
    description: string;
    link: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
  }[];
  rating: number;
  completedProjects: number;
}

const UserProfile: React.FC = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/api/users/${id}/profile`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        setError('Impossible de charger le profil');
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center p-8">Chargement...</div>;
  if (error) return <div className="text-red-600 p-8">{error}</div>;
  if (!profile) return <div className="p-8">Profil non trouvé</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* En-tête du profil */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center">
          <img
            src={profile.avatar || '/default-avatar.png'}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="ml-6">
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-gray-600">{profile.title}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400">{'★'.repeat(profile.rating)}</span>
              <span className="text-gray-300">{'★'.repeat(5 - profile.rating)}</span>
              <span className="ml-2 text-gray-600">({profile.completedProjects} projets)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Informations principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Bio */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">À propos</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{profile.bio}</p>
          </div>

          {/* Portfolio */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
            <div className="space-y-4">
              {profile.portfolio.map((item, index) => (
                <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 mt-2 inline-block"
                  >
                    Voir le projet →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Informations de contact */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Informations</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600">Taux horaire:</span>
                <span className="font-medium ml-2">{profile.hourlyRate}€/h</span>
              </div>
              <div>
                <span className="text-gray-600">Disponibilité:</span>
                <span className="font-medium ml-2">{profile.availability}</span>
              </div>
              <div>
                <span className="text-gray-600">Localisation:</span>
                <span className="font-medium ml-2">{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Compétences */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Compétences</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Langues */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Langues</h2>
            <div className="space-y-2">
              {profile.languages.map((language, index) => (
                <div key={index} className="text-gray-600">
                  {language}
                </div>
              ))}
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Réseaux sociaux</h2>
            <div className="space-y-3">
              {profile.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;