import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  activeProjects: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingReports: number;
}

interface RecentActivity {
  id: string;
  type: 'registration' | 'project' | 'payment' | 'report';
  description: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchStats(), fetchActivities()]).finally(() => 
      setLoading(false)
    );
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      setError('Erreur lors du chargement des statistiques');
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/admin/activities', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      }
    } catch (error) {
      setError('Erreur lors du chargement des activités');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">Tableau de bord administrateur</h1>

      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Utilisateurs Actifs</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-semibold text-gray-900">
              {stats?.activeUsers}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              / {stats?.totalUsers}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Projets Actifs</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-semibold text-gray-900">
              {stats?.activeProjects}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              / {stats?.totalProjects}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Revenu Mensuel</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-semibold text-gray-900">
              {stats?.monthlyRevenue.toLocaleString()}€
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Signalements en attente</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-semibold text-gray-900">
              {stats?.pendingReports}
            </span>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/admin/users"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-medium text-gray-900">Gestion des utilisateurs</h3>
          <p className="mt-2 text-sm text-gray-500">
            Gérer les comptes, les rôles et les permissions
          </p>
        </Link>

        <Link
          to="/admin/projects"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-medium text-gray-900">Gestion des projets</h3>
          <p className="mt-2 text-sm text-gray-500">
            Superviser les projets en cours et archivés
          </p>
        </Link>

        <Link
          to="/admin/reports"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-medium text-gray-900">Signalements</h3>
          <p className="mt-2 text-sm text-gray-500">
            Traiter les signalements des utilisateurs
          </p>
        </Link>
      </div>

      {/* Activités récentes */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Activités récentes</h2>
        </div>
        <div className="divide-y">
          {activities.map((activity) => (
            <div key={activity.id} className="px-6 py-4">
              <div className="flex items-center">
                {activity.user && (
                  <img
                    src={activity.user.avatar || '/default-avatar.png'}
                    alt={activity.user.name}
                    className="h-8 w-8 rounded-full mr-3"
                  />
                )}
                <div>
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;