import React from 'react';
import GoogleLogin from './GoogleLogin';

function App() {
  const handleLoginSuccess = (response: any) => {
    console.log('Google login response:', response);
    // decode JWT here if you want
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Login to Mood Diary</h2>
      <GoogleLogin handleGoogleLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default App;
