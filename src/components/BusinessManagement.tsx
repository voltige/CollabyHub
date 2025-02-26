import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Business {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  type: 'micro_enterprise' | 'eirl' | 'sasu' | 'eurl';
  siret: string;
  tva?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  bankInfo?: {
    iban: string;
    bic: string;
  };
  documents: {
    id: string;
    type: 'kbis' | 'insurance' | 'rib' | 'other';
    name: string;
    url: string;
    uploadedAt: string;
  }[];
}

interface BusinessStats {
  totalRevenue: number;
  pendingPayments: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  clientCount: number;
  projectCount: number;
}

const BusinessManagement: React.FC = () => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [stats, setStats] = useState<BusinessStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    Promise.all([fetchBusinessInfo(), fetchBusinessStats()]).finally(() => 
      setLoading(false)
    );
  }, []);

  const fetchBusinessInfo = async () => {
    try {
      const response = await fetch('/api/business', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setBusiness(data);
      }
    } catch (error) {
      setError('Erreur lors du chargement des informations de l\'entreprise');
    }
  };

  const fetchBusinessStats = async () => {
    try {
      const response = await fetch('/api/business/stats', {
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

  const handleUpdateBusiness = async (updatedData: Partial<Business>) => {
    try {
      const response = await fetch('/api/business', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setBusiness(data);
        setIsEditMode(false);
      }
    } catch (error) {
      setError('Erreur lors de la mise à jour des informations');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informations principales */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Informations de l'entreprise</h2>
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                {isEditMode ? 'Annuler' : 'Modifier'}
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {isEditMode ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                // Récupérer les données du formulaire et appeler handleUpdateBusiness
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nom de l'entreprise
                    </label>
                    <input
                      type="text"
                      defaultValue={business?.name}
                      className="mt-1 block w-full border rounded-md shadow-sm p-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      SIRET
                    </label>
                    <input
                      type="text"
                      defaultValue={business?.siret}
                      className="mt-1 block w-full border rounded-md shadow-sm p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type d'entreprise
                    </label>
                    <select
                      defaultValue={business?.type}
                      className="mt-1 block w-full border rounded-md shadow-sm p-2"
                    >
                      <option value="micro_enterprise">Micro-entreprise</option>
                      <option value="eirl">EIRL</option>
                      <option value="sasu">SASU</option>
                      <option value="eurl">EURL</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Enregistrer les modifications
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Nom</h3>
                  <p className="mt-1 text-lg">{business?.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">SIRET</h3>
                  <p className="mt-1">{business?.siret}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Statut</h3>
                  <span className={`inline-flex mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                    business?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {business?.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistiques */}
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">Statistiques</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Chiffre d'affaires total</p>
                <p className="text-2xl font-bold">
                  {stats?.totalRevenue.toLocaleString()}€
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Paiements en attente</p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats?.pendingPayments.toLocaleString()}€
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">CA mensuel</p>
                <p className="text-2xl font-bold">
                  {stats?.monthlyRevenue.toLocaleString()}€
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nombre de clients</p>
                <p className="text-2xl font-bold">{stats?.clientCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Documents</h2>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Ajouter un document
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {business?.documents.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessManagement;