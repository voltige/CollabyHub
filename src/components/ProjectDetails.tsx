import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  duration: string;
  skills: string[];
  category: string;
  status: 'open' | 'in_progress' | 'completed';
  createdAt: string;
  attachments: {
    id: string;
    name: string;
    url: string;
  }[];
  owner: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  proposals: {
    id: string;
    freelancer: {
      id: string;
      name: string;
      avatar?: string;
      rating: number;
    };
    amount: number;
    duration: string;
    message: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: string;
  }[];
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalData, setProposalData] = useState({
    amount: 0,
    duration: '',
    message: ''
  });

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setProject(data);
      } else {
        throw new Error('Projet non trouvé');
      }
    } catch (error) {
      setError('Erreur lors de la récupération des détails du projet');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/projects/${id}/proposals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proposalData),
        credentials: 'include'
      });

      if (response.ok) {
        setShowProposalForm(false);
        fetchProjectDetails();
      } else {
        throw new Error('Erreur lors de l\'envoi de la proposition');
      }
    } catch (error) {
      setError('Erreur lors de l\'envoi de la proposition');
    }
  };

  if (loading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="text-red-600 p-4">{error}</div>;
  if (!project) return <div className="p-4">Projet non trouvé</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* En-tête du projet */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
            <div className="flex items-center text-gray-600">
              <span className="mr-4">
                Publié le {new Date(project.createdAt).toLocaleDateString()}
              </span>
              <span className="mr-4">Budget: {project.budget}€</span>
              <span>Durée: {project.duration}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to={`/profile/${project.owner.id}`}
              className="flex items-center hover:text-indigo-600"
            >
              <img
                src={project.owner.avatar || '/default-avatar.png'}
                alt={project.owner.name}
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <div className="font-medium">{project.owner.name}</div>
                <div className="text-sm text-yellow-500">
                  {'★'.repeat(project.owner.rating)}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Description et détails */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap mb-4">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.skills.map(skill => (
              <span
                key={skill}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          {project.attachments.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Pièces jointes</h2>
              <div className="space-y-2">
                {project.attachments.map(attachment => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                      />
                    </svg>
                    {attachment.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Propositions */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Propositions ({project.proposals.length})
            </h2>
            {!showProposalForm && (
              <button
                onClick={() => setShowProposalForm(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Faire une proposition
              </button>
            )}
          </div>

          {showProposalForm && (
            <form onSubmit={handleSubmitProposal} className="mb-6 bg-gray-50 p-4 rounded">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Montant proposé (€)
                  </label>
                  <input
                    type="number"
                    value={proposalData.amount}
                    onChange={(e) => setProposalData({
                      ...proposalData,
                      amount: Number(e.target.value)
                    })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Durée estimée
                  </label>
                  <input
                    type="text"
                    value={proposalData.duration}
                    onChange={(e) => setProposalData({
                      ...proposalData,
                      duration: e.target.value
                    })}
                    className="w-full p-2 border rounded"
                    placeholder="Ex: 2 semaines"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  value={proposalData.message}
                  onChange={(e) => setProposalData({
                    ...proposalData,
                    message: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProposalForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Envoyer la proposition
                </button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {project.proposals.map(proposal => (
              <div
                key={proposal.id}
                className="border rounded p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <Link
                    to={`/profile/${proposal.freelancer.id}`}
                    className="flex items-center"
                  >
                    <img
                      src={proposal.freelancer.avatar || '/default-avatar.png'}
                      alt={proposal.freelancer.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <div className="font-medium">{proposal.freelancer.name}</div>
                      <div className="text-sm text-yellow-500">
                        {'★'.repeat(proposal.freelancer.rating)}
                      </div>
                    </div>
                  </Link>
                  <div className="text-right">
                    <div className="font-semibold text-indigo-600">
                      {proposal.amount}€
                    </div>
                    <div className="text-sm text-gray-600">
                      {proposal.duration}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{proposal.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;