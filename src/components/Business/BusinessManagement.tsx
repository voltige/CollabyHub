import { useQuery, useMutation } from '@tanstack/react-query'
import api from '@/services/api'

export const BusinessManagement = () => {
  const { data: business, isLoading } = useQuery({
    queryKey: ['business'],
    queryFn: () => api.get('/business').then(res => res.data)
  })

  const updateBusiness = useMutation({
    mutationFn: (data: any) => api.put('/business', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business'] })
    }
  })

  if (isLoading) return <div>Chargement...</div>

  return (
    // ... reste du composant
  )
}