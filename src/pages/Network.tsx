import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Connection {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  connected: boolean;
}

const Network: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [suggestions, setSuggestions] = useState<Connection[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchConnections();
    fetchSuggestions();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await fetch('/api/network/connections', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setConnections(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des connexions:', error);
    }
  };

  const fetchSuggestions = async () => {
    try {
      const response = await fetch('/api/network/suggestions', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des suggestions:', error);
    }
  };

  const handleConnect = async (userId: string) => {
    try {
      const response = await fetch(`/api/network/connect/${userId}`, {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        // Mettre à jour les listes après la connexion
        fetchConnections();
        fetchSuggestions();
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mon Réseau</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher dans mon réseau..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Mes Connexions</h2>
          <div className="space-y-4">
            {connections
              .filter(connection => 
                connection.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(connection => (
                <div key={connection.id} className="bg-white p-4 rounded-lg shadow flex items-center">
                  <img
                    src={connection.avatar || '/default-avatar.png'}
                    alt={connection.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{connection.name}</h3>
                    <p className="text-gray-600 text-sm">{connection.title}</p>
                  </div>
                  <Link
                    to={`/profile/${connection.id}`}
                    className="ml-auto text-indigo-600 hover:text-indigo-800"
                  >
                    Voir le profil
                  </Link>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Suggestions</h2>
          <div className="space-y-4">
            {suggestions.map(suggestion => (
              <div key={suggestion.id} className="bg-white p-4 rounded-lg shadow flex items-center">
                <img
                  src={suggestion.avatar || '/default-avatar.png'}
                  alt={suggestion.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{suggestion.name}</h3>
                  <p className="text-gray-600 text-sm">{suggestion.title}</p>
                </div>
                <button
                  onClick={() => handleConnect(suggestion.id)}
                  className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Se connecter
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;