import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useSetAuthHeaders = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      navigate('/');
    }
  }, [navigate]);
};

export default useSetAuthHeaders;
