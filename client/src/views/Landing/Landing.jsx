import React from 'react';
import './Landing.style.css';

const LandingPage = () => {
  const handleIngresar = () => {
    window.location.reload();

    window.location.href = '/home';
  };

  return (
    <div className="landing-page">
      <div className="background-image"></div>
      <div className="content">
        <h1>Explora nuestro increíble mundo canino</h1>
        <button onClick={handleIngresar}>Ingresar</button>
      </div>
    </div>
  );
};

export default LandingPage;