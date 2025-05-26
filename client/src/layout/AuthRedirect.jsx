import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      navigate('/dashboard');
    } else {
      toast.info('Please login to access the app');
      navigate('/login');
    }
  }, [navigate]);

  return null;
};

export default AuthRedirect
