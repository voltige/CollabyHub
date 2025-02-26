import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { BusinessCard } from './BusinessCard';
import { BusinessStats } from './BusinessStats';

interface Business {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  type: string;
  siret: string;
  tva?: string;
  // ...existing fields
}

export const BusinessProfile: React.FC = () => {
  const { data: business, isLoading } = useQuery<Business>({
    queryKey: ['business'],
    queryFn: () => fetch('/api/business').then(res => res.json())
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<Business>) => 
      fetch('/api/business', {
        method: 'PUT',
        body: JSON.stringify(data)
      }).then(res => res.json())
  });

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <BusinessCard business={business} onUpdate={updateMutation.mutate} />
      <BusinessStats businessId={business?.id} />
    </div>
  );
};