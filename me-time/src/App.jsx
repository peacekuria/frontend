// frontend/src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Assessment from './components/Assessment';
import DisorderSearch from './components/DisorderSearch';
import './App.css';

function App() {
  // State for active tab: 'assessment' or 'search'
  const [activeTab, setActiveTab] = useState('assessment');
  
  return (
    <div className="app">
      {/* Header */}
      <Header />
      
      {/* Main Container */}
      <div className="container">
        
        {/* Tab Navigation */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'assessment' ? 'active' : ''}`}
            onClick={() => setActiveTab('assessment')}
          >
            Self Assessment
          </button>
          <button 
            className={`tab ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            Find Disorders
          </button>
        </div>
        
        {/* Main Content */}
        <div className="content">
          {/* Show Assessment or Search based on active tab */}
          {activeTab === 'assessment' ? <Assessment /> : <DisorderSearch />}
          
          {/* Disclaimer */}
          <div className="disclaimer">
            <div className="disclaimer-icon"></div>
            <div className="disclaimer-text">
              <h4>Important Disclaimer</h4>
              <p>
                This tool is for informational purposes only. It is not a substitute 
                for professional medical advice, diagnosis, or treatment. Always seek 
                the advice of qualified mental health providers.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="footer">
          <p>Mental Wellness Checker ©️ 2023 | Educational Purpose Only</p>
          <p className="footer-note">
            If you're experiencing a crisis, please contact emergency services immediately.
          </p>
        </footer>
        
      </div>
    </div>
  );
}

export default App;