import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Freelancer {
  id: string;
  name: string;
  title: string;
  skills: string[];
  rating: number;
  hourlyRate: number;
  avatar?: string;
}

const Directory: React.FC = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      const response = await fetch('/api/freelancers', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setFreelancers(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des freelancers:', error);
    }
  };

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = !selectedSkill || freelancer.skills.includes(selectedSkill);
    return matchesSearch && matchesSkill;
  });

  const allSkills = Array.from(new Set(freelancers.flatMap(f => f.skills)));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Annuaire des Freelances</h1>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Rechercher par nom ou titre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="w-64">
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Toutes les compétences</option>
            {allSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFreelancers.map(freelancer => (
          <div key={freelancer.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <img
                src={freelancer.avatar || '/default-avatar.png'}
                alt={freelancer.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{freelancer.name}</h2>
                <p className="text-gray-600">{freelancer.title}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="text-yellow-400">{'★'.repeat(freelancer.rating)}</span>
                <span className="text-gray-300">{'★'.repeat(5 - freelancer.rating)}</span>
                <span className="ml-2 text-gray-600">{freelancer.rating}/5</span>
              </div>
              <p className="text-indigo-600 font-semibold">{freelancer.hourlyRate}€/heure</p>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Compétences:</h3>
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <Link
              to={`/freelancers/${freelancer.id}`}
              className="block w-full text-center bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Voir le profil
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Directory;