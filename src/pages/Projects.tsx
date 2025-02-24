import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  skills: string[];
  createdAt: string;
  status: 'open' | 'in_progress' | 'completed';
  owner: {
    id: string;
    name: string;
    avatar?: string;
  };
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = !selectedSkill || project.skills.includes(selectedSkill);
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesSkill && matchesStatus;
  });

  const allSkills = Array.from(new Set(projects.flatMap(p => p.skills)));

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projets disponibles</h1>
        <Link
          to="/create-project"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Créer un projet
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher un projet..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md"
        />
        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Toutes les compétences</option>
          {allSkills.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="all">Tous les statuts</option>
          <option value="open">Ouvert</option>
          <option value="in_progress">En cours</option>
          <option value="completed">Terminé</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <img
                src={project.owner.avatar || '/default-avatar.png'}
                alt={project.owner.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 className="font-semibold">{project.owner.name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-indigo-600">{project.budget}€</span>
              <Link
                to={`/projects/${project.id}`}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Voir les détails →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;