import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export const OAuthButtons = () => {
  const navigate = useNavigate();
  const { loadUser } = useAuth();

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      // only accept messages from backend success page
      if (event.origin !== 'https://quirk-app-backend.onrender.com') return;
      if (event.data && event.data.type === 'OAUTH_SUCCESS') {
        await loadUser();
        navigate('/home');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [loadUser, navigate]);

  return (
    <div className="flex flex-col gap-4 mt-6">
      <button 
        onClick={() => window.open('https://quirk-app-backend.onrender.com/api/v1/oauth/google', 'oauth', 'width=500,height=600')}
        className="w-full flex gap-3 items-center justify-center py-2.5 border border-gray-700 rounded-full hover:bg-gray-900 transition-all transform hover:scale-105 active:scale-95 font-semibold"
      >
        <FcGoogle size={22} />
        Continue with Google
      </button>
      
      <button
        onClick={() => window.open('https://quirk-app-backend.onrender.com/api/v1/oauth/github', 'oauth', 'width=500,height=600')}
        className="w-full flex gap-3 items-center justify-center py-2.5 border border-gray-700 rounded-full hover:bg-gray-900 transition-all transform hover:scale-105 active:scale-95 font-semibold"
      >
        <FaGithub size={22} />
        Continue with GitHub
      </button>
    </div>
  );
};
