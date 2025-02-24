import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  provider: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  reviews: {
    id: string;
    rating: number;
    comment: string;
    author: {
      name: string;
      avatar?: string;
    };
    createdAt: string;
  }[];
}

const ServiceDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setService(data);
      } else {
        navigate('/services');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du service:', error);
      navigate('/services');
    } finally {
      setLoading(false);
    }
  };

  const handleBookService = async () => {
    try {
      const response = await fetch(`/api/services/${id}/book`, {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        navigate('/bookings');
      }
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
    }
  };

  if (loading) return <div className="text-center py-8">Chargement...</div>;
  if (!service) return <div className="text-center py-8">Service non trouvé</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
                <div className="flex items-center mb-4">
                  <img
                    src={service.provider.avatar || '/default-avatar.png'}
                    alt={service.provider.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <Link 
                      to={`/profile/${service.provider.id}`}
                      className="font-semibold hover:text-indigo-600"
                    >
                      {service.provider.name}
                    </Link>
                    <div className="flex items-center">
                      <span className="text-yellow-400">{'★'.repeat(service.provider.rating)}</span>
                      <span className="text-gray-300">{'★'.repeat(5 - service.provider.rating)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {service.price}€
                </div>
                <div className="text-gray-600">{service.duration}</div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{service.description}</p>
            </div>

            <button
              onClick={handleBookService}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Réserver ce service
            </button>
          </div>

          <div className="border-t">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Avis ({service.reviews.length})</h2>
              <div className="space-y-6">
                {service.reviews.map(review => (
                  <div key={review.id} className="border-b last:border-b-0 pb-6 last:pb-0">
                    <div className="flex items-center mb-2">
                      <img
                        src={review.author.avatar || '/default-avatar.png'}
                        alt={review.author.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-semibold">{review.author.name}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                      <span className="text-gray-300">{'★'.repeat(5 - review.rating)}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;