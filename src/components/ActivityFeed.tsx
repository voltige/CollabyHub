import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Activity {
  id: string;
  type: 'project_created' | 'message_sent' | 'payment_received' | 'review_posted' | 'milestone_completed';
  title: string;
  description: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  metadata?: {
    projectId?: string;
    projectName?: string;
    amount?: number;
    rating?: number;
  };
}

const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, [page]);

  const fetchActivities = async () => {
    try {
      const response = await fetch(`/api/activities?page=${page}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setActivities(prev => page === 1 ? data.activities : [...prev, ...data.activities]);
        setHasMore(data.hasMore);
      }
    } catch (error) {
      setError("Erreur lors du chargement des activités");
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'project_created':
        return '📋';
      case 'message_sent':
        return '💬';
      case 'payment_received':
        return '💰';
      case 'review_posted':
        return '⭐';
      case 'milestone_completed':
        return '🎯';
      default:
        return '📝';
    }
  };

  if (loading && page === 1) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Activités récentes</h2>
      </div>

      <div className="divide-y">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-gray-50">
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-xl">{getActivityIcon(activity.type)}</span>
                </div>
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between">
                  <Link 
                    to={`/profile/${activity.user.id}`}
                    className="text-sm font-medium text-gray-900 hover:underline truncate"
                  >
                    {activity.user.name}
                  </Link>
                  <time 
                    className="text-sm text-gray-500"
                    title={format(new Date(activity.createdAt), 'Pp', { locale: fr })}
                  >
                    {formatDistanceToNow(new Date(activity.createdAt), { 
                      addSuffix: true,
                      locale: fr 
                    })}
                  </time>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  {activity.description}
                </p>
                {activity.metadata?.projectName && (
                  <Link
                    to={`/projects/${activity.metadata.projectId}`}
                    className="mt-2 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    Voir le projet
                    <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="p-4 border-t text-center">
          <button
            onClick={() => setPage(p => p + 1)}
            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
          >
            Charger plus d'activités
          </button>
        </div>
      )}

      {!hasMore && activities.length > 0 && (
        <div className="p-4 text-center text-sm text-gray-500">
          Vous avez atteint la fin des activités
        </div>
      )}

      {activities.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          Aucune activité à afficher
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;