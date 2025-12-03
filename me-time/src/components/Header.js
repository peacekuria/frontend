// frontend/src/components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Mental Wellness Checker</h1>
        <p className="header-subtitle">Assess your mental health and find helpful resources</p>
      </div>
    </header>
  );
};

export default Header;