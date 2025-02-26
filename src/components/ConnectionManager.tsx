import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Connection {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
    title: string;
    skills: string[];
  };
  status: 'pending' | 'connected' | 'blocked';
  createdAt: string;
  updatedAt: string;
}

const ConnectionManager: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    Promise.all([fetchConnections(), fetchPendingRequests()]).finally(() => 
      setLoading(false)
    );
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await fetch('/api/connections', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setConnections(data);
      }
    } catch (error) {
      setError('Erreur lors du chargement des connexions');
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const response = await fetch('/api/connections/pending', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setPendingRequests(data);
      }
    } catch (error) {
      setError('Erreur lors du chargement des demandes en attente');
    }
  };

  const handleConnectionAction = async (connectionId: string, action: 'accept' | 'reject' | 'block' | 'remove') => {
    try {
      const response = await fetch(`/api/connections/${connectionId}/${action}`, {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        await Promise.all([fetchConnections(), fetchPendingRequests()]);
      }
    } catch (error) {
      setError(`Erreur lors de l'action sur la connexion`);
    }
  };

  const filteredConnections = connections.filter(connection =>
    connection.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.user.skills.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {error && (
        <div className="mb-6 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Barre de recherche */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom ou compétence..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Demandes en attente */}
      {pendingRequests.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Demandes en attente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingRequests.map(request => (
              <div key={request.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <img
                    src={request.user.avatar || '/default-avatar.png'}
                    alt={request.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium">{request.user.name}</h3>
                    <p className="text-sm text-gray-500">{request.user.title}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {request.user.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleConnectionAction(request.id, 'accept')}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Accepter
                  </button>
                  <button
                    onClick={() => handleConnectionAction(request.id, 'reject')}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                  >
                    Refuser
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Liste des connexions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Mes connexions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConnections.map(connection => (
            <div key={connection.id} className="bg-white rounded-lg shadow p-6">
              <Link to={`/profile/${connection.user.id}`} className="flex items-center">
                <img
                  src={connection.user.avatar || '/default-avatar.png'}
                  alt={connection.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-medium">{connection.user.name}</h3>
                  <p className="text-sm text-gray-500">{connection.user.title}</p>
                </div>
              </Link>
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {connection.user.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleConnectionAction(connection.id, 'remove')}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Retirer la connexion
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredConnections.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {searchTerm ? 'Aucune connexion ne correspond à votre recherche' : 'Vous n\'avez pas encore de connexions'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionManager;