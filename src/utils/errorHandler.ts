import { AxiosError } from 'axios';

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return;
    }
    
    if (error.response?.status === 404) {
      window.location.href = '/404';
      return;
    }
  }
  
  console.error('Une erreur est survenue:', error);
};