import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  type: 'user' | 'project' | 'service';
  title: string;
  description: string;
  image?: string;
  link: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchSearchResults();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchSearchResults = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setResults(data);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Erreur de recherche:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setShowResults(false);
    setSearchTerm('');
    navigate(result.link);
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="flex items-center bg-white rounded-lg shadow-sm">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher..."
          className="w-full px-4 py-2 rounded-l-lg focus:outline-none"
        />
        {isLoading ? (
          <div className="px-4 py-2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-600 border-t-transparent"></div>
          </div>
        ) : (
          <button 
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            onClick={() => {
              if (searchTerm) fetchSearchResults();
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-50">
          <div className="py-2">
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleResultClick(result)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
              >
                {result.image && (
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-8 h-8 rounded object-cover mr-3"
                  />
                )}
                <div>
                  <div className="font-medium">{result.title}</div>
                  <div className="text-sm text-gray-600">{result.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {showResults && searchTerm && results.length === 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-50">
          <div className="px-4 py-3 text-gray-600">
            Aucun résultat trouvé pour "{searchTerm}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;