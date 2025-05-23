
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import AdminDashboard from '@/components/admin/AdminDashboard';

const Admin = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in or not admin
    if (!loading && (!user || profile?.user_type !== 'admin')) {
      navigate('/');
    }
  }, [user, profile, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mr-3"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user || profile?.user_type !== 'admin') {
    return null; // Will redirect in useEffect
  }

  return <AdminDashboard />;
};

export default Admin;
