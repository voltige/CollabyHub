import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface ProjectFormData {
  title: string;
  description: string;
  budget: number;
  duration: string;
  skills: string[];
  category: string;
  attachments: File[];
}

const initialFormData: ProjectFormData = {
  title: '',
  description: '',
  budget: 0,
  duration: '',
  skills: [],
  category: '',
  attachments: []
};

const ProjectForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (id) {
      fetchProjectData();
    }
  }, [id]);

  const fetchProjectData = async () => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      }
    } catch (error) {
      setError('Erreur lors de la récupération du projet');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'attachments') {
        value.forEach((file: File) => {
          formDataToSend.append('attachments', file);
        });
      } else if (key === 'skills') {
        formDataToSend.append('skills', JSON.stringify(value));
      } else {
        formDataToSend.append(key, value.toString());
      }
    });

    try {
      const response = await fetch(id ? `/api/projects/${id}` : '/api/projects', {
        method: id ? 'PUT' : 'POST',
        body: formDataToSend,
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/projects/${data.id}`);
      } else {
        throw new Error('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      setError('Erreur lors de la sauvegarde du projet');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        attachments: [...formData.attachments, ...Array.from(e.target.files)]
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Modifier le projet' : 'Créer un nouveau projet'}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Titre</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded"
            rows={6}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Budget (€)</label>
          <input
            type="number"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
            className="w-full p-2 border rounded"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Durée estimée</label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Ex: 2 semaines"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Catégorie</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="development">Développement</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="writing">Rédaction</option>
            <option value="other">Autre</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Compétences requises</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Ajouter une compétence"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Ajouter
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map(skill => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pièces jointes</label>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            className="w-full p-2 border rounded"
          />
          {formData.attachments.length > 0 && (
            <div className="mt-2 space-y-1">
              {formData.attachments.map((file, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Enregistrement...' : (id ? 'Modifier' : 'Créer')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;