import React, { useState } from 'react';

interface FilterOptionsProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
}

interface FilterState {
  priceRange: [number, number];
  categories: string[];
  skills: string[];
  availability: string[];
  rating: number;
  sortBy: 'recent' | 'price_asc' | 'price_desc' | 'rating';
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  onFilterChange,
  initialFilters
}) => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: initialFilters?.priceRange || [0, 1000],
    categories: initialFilters?.categories || [],
    skills: initialFilters?.skills || [],
    availability: initialFilters?.availability || [],
    rating: initialFilters?.rating || 0,
    sortBy: initialFilters?.sortBy || 'recent'
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      {/* Prix */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Budget</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => handleFilterChange('priceRange', [
                Number(e.target.value),
                filters.priceRange[1]
              ])}
              className="w-24 px-3 py-2 border rounded-md"
              min={0}
            />
            <span className="mx-2">-</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [
                filters.priceRange[0],
                Number(e.target.value)
              ])}
              className="w-24 px-3 py-2 border rounded-md"
              min={0}
            />
          </div>
        </div>
      </div>

      {/* Catégories */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Catégories</h3>
        <div className="space-y-2">
          {['Développement', 'Design', 'Marketing', 'Rédaction', 'Conseil'].map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...filters.categories, category]
                    : filters.categories.filter(c => c !== category);
                  handleFilterChange('categories', newCategories);
                }}
                className="h-4 w-4 text-indigo-600 rounded border-gray-300"
              />
              <span className="ml-2 text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Compétences */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Compétences</h3>
        <div className="flex flex-wrap gap-2">
          {['React', 'Node.js', 'Python', 'UI/UX', 'SEO'].map((skill) => (
            <button
              key={skill}
              onClick={() => {
                const newSkills = filters.skills.includes(skill)
                  ? filters.skills.filter(s => s !== skill)
                  : [...filters.skills, skill];
                handleFilterChange('skills', newSkills);
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.skills.includes(skill)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Disponibilité */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Disponibilité</h3>
        <div className="space-y-2">
          {['Temps plein', 'Temps partiel', 'Flexible', 'Week-end'].map((availability) => (
            <label key={availability} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.availability.includes(availability)}
                onChange={(e) => {
                  const newAvailability = e.target.checked
                    ? [...filters.availability, availability]
                    : filters.availability.filter(a => a !== availability);
                  handleFilterChange('availability', newAvailability);
                }}
                className="h-4 w-4 text-indigo-600 rounded border-gray-300"
              />
              <span className="ml-2 text-gray-700">{availability}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Note minimale */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Note minimale</h3>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleFilterChange('rating', star)}
              className="text-2xl"
            >
              <span className={star <= filters.rating ? 'text-yellow-400' : 'text-gray-300'}>
                ★
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tri */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Trier par</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="recent">Plus récents</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix décroissant</option>
          <option value="rating">Meilleures notes</option>
        </select>
      </div>
    </div>
  );
};

export default FilterOptions;