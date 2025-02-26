import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface ReportedContent {
  id: string;
  type: 'post' | 'comment' | 'project' | 'profile';
  content: {
    id: string;
    title?: string;
    text: string;
    createdAt: string;
    author: {
      id: string;
      name: string;
      avatar?: string;
    };
  };
  reason: string;
  reportedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

const ContentModeration: React.FC = () => {
  const [reports, setReports] = useState<ReportedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'pending' | 'reviewed' | 'resolved' | 'all'>('pending');

  useEffect(() => {
    fetchReports();
  }, [filter]);

  const fetchReports = async () => {
    try {
      const response = await fetch(`/api/moderation/reports?status=${filter}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      } else {
        throw new Error('Erreur lors de la récupération des signalements');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModeration = async (reportId: string, action: 'approve' | 'reject' | 'delete') => {
    try {
      const response = await fetch(`/api/moderation/reports/${reportId}/${action}`, {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        await fetchReports();
      } else {
        throw new Error('Erreur lors de la modération');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Modération du contenu</h1>
        
        {/* Filtres */}
        <div className="flex space-x-4">
          {(['all', 'pending', 'reviewed', 'resolved'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md ${
                filter === status
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'Tous' :
               status === 'pending' ? 'En attente' :
               status === 'reviewed' ? 'Examinés' : 'Résolus'}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  report.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : report.status === 'reviewed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {report.status === 'pending' ? 'En attente' :
                   report.status === 'reviewed' ? 'Examiné' : 'Résolu'}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  Signalé le {new Date(report.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleModeration(report.id, 'approve')}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approuver
                </button>
                <button
                  onClick={() => handleModeration(report.id, 'reject')}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Rejeter
                </button>
                <button
                  onClick={() => handleModeration(report.id, 'delete')}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Supprimer
                </button>
              </div>
            </div>

            <div className="border-l-4 border-gray-200 pl-4 mb-4">
              <div className="flex items-center mb-2">
                <img
                  src={report.content.author.avatar || '/default-avatar.png'}
                  alt={report.content.author.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <Link
                    to={`/profile/${report.content.author.id}`}
                    className="font-medium text-gray-900 hover:text-indigo-600"
                  >
                    {report.content.author.name}
                  </Link>
                  <div className="text-sm text-gray-500">
                    {new Date(report.content.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              {report.content.title && (
                <h3 className="font-medium text-gray-900 mb-2">{report.content.title}</h3>
              )}
              <p className="text-gray-700">{report.content.text}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <div className="flex items-center mb-2">
                <img
                  src={report.reportedBy.avatar || '/default-avatar.png'}
                  alt={report.reportedBy.name}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-sm text-gray-600">
                  Signalé par {report.reportedBy.name}
                </span>
              </div>
              <p className="text-sm text-gray-700">{report.reason}</p>
            </div>
          </div>
        ))}

        {reports.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">
              Aucun signalement {filter !== 'all' ? `${filter}` : ''} à traiter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentModeration;