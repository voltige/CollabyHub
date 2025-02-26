export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'completed';
  createdAt: string;
  updatedAt: string;
  owner: User;
  contributors: User[];
}