import React from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Business, BusinessStats } from '@/types';

interface DashboardProps {
  businessId: string;
}

export const BusinessDashboard: React.FC<DashboardProps> = ({ businessId }) => {
  const { data: business } = useQuery<Business>({
    queryKey: ['business', businessId],
    queryFn: () => fetch(`/api/business/${businessId}`).then(res => res.json())
  });

  const { data: stats } = useQuery<BusinessStats>({
    queryKey: ['business-stats', businessId],
    queryFn: () => fetch(`/api/business/${businessId}/stats`).then(res => res.json()),
    refetchInterval: 60000 // Rafraîchissement toutes les minutes
  });

  return (
    <div className="grid md:grid-cols-12 gap-6">
      <div className="md:col-span-8">
        {/* Informations principales */}
        <BusinessInfo business={business} />
      </div>
      <div className="md:col-span-4">
        {/* Statistiques en temps réel */}
        <BusinessStats stats={stats} />
      </div>
    </div>
  );
};