import { useEffect } from 'react';

export const OAuthSuccess = () => {
  useEffect(() => {
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({ type: 'OAUTH_SUCCESS' }, window.location.origin);
      window.close();
    }
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <h2>Login Successful!</h2>
        <p>This window should close automatically...</p>
      </div>
    </div>
  );
};
