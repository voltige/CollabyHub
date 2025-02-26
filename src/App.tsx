import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Directory from './pages/Directory';
import ServiceDetails from './pages/ServiceDetails';
import Profile from './pages/Profile';
import Network from './pages/Network';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import Tools from './pages/Tools';
import Admin from './pages/Admin';
import Header from './components/Header';
import Footer from './components/Footer';
import Settings from './components/Settings';
import ProjectDetails from './pages/ProjectDetails';
import ProjectForm from './pages/ProjectForm';
import Posts from './pages/Posts';
import PostDetails from './pages/PostDetails';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import ProjectManagement from './pages/ProjectManagement';
import ReportManagement from './pages/ReportManagement';
import BusinessManagement from './pages/BusinessManagement';
import ConnectionManager from './components/ConnectionManager';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './services/queryClient';
import LoadingSpinner from './components/LoadingSpinner';

// Chargement dynamique des routes
const BusinessDashboard = React.lazy(() => import('./components/features/BusinessDashboard'));
const ContentModeration = React.lazy(() => import('./components/features/ContentModeration'));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Landing />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                
                <Route element={<ProtectedRoute />}>
                  <Route path="dashboard" element={<Network />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="projects/:id" element={<ProjectDetails />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="connections" element={<ConnectionManager />} />
                </Route>
                
                <Route element={<AdminRoute />}>
                  <Route path="admin" element={<AdminDashboard />} />
                  <Route path="admin/moderation" element={<ContentModeration />} />
                  <Route path="admin/users" element={<UserManagement />} />
                </Route>
              </Route>
              {/* Routes optimisées */}
              <Route path="/business/:id" element={<BusinessDashboard />} />
              <Route path="/moderation" element={<ContentModeration />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;