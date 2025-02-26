import { useQuery, useMutation } from '@tanstack/react-query'
import api from '@/services/api'

export const useAuth = () => {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => api.get('/auth/me').then(res => res.data)
  })

  const login = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      api.post('/auth/login', credentials)
  })

  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return { user, login, logout }
}