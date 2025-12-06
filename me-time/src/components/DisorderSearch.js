// frontend/src/components/DisorderSearch.js
import React, { useState } from 'react';
import './DisorderSearch.css';

// Backend API base URL
const API_BASE_URL = 'http://localhost:8000';

const DisorderSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [disorder, setDisorder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a disorder name');
      return;
    }
    
    setLoading(true);
    setError('');
    setDisorder(null);
    
    try {
      // Call backend API
      const response = await fetch(`${API_BASE_URL}/api/disorders/search?name=${searchTerm}`);
      
      if (!response.ok) {
        throw new Error('Disorder not found');
      }
      
      const data = await response.json();
      setDisorder(data);
      
    } catch (error) {
      console.error('Search error:', error);
      setError('Disorder not found. Try: depression, anxiety, or bipolar');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // Quick search examples
  const quickSearch = (term) => {
    setSearchTerm(term);
    setTimeout(() => handleSearch(), 100);
  };
  
  return (
    <div className="disorder-search">
      <h2 className="section-title">Find Disorder Information</h2>
      <p className="section-description">
        Search for mental health conditions to learn about symptoms and treatments.
      </p>
      
      {/* Search Box */}
      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search disorder (e.g., depression)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="search-btn"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {/* Quick Search Examples */}
        <div className="quick-search">
          <p>Try searching for:</p>
          <div className="example-tags">
            {['depression', 'anxiety', 'bipolar'].map(term => (
              <button
                key={term}
                className="example-tag"
                onClick={() => quickSearch(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {/* Disorder Results */}
      {disorder && (
        <div className="disorder-card">
          <div className="disorder-header">
            <h3 className="disorder-name">{disorder.name}</h3>
          </div>
          
          <div className="disorder-description">
            <h4>Description</h4>
            <p>{disorder.description}</p>
          </div>
          
          <div className="disorder-remedies">
            <h4>Treatment Options</h4>
            <ul>
              {disorder.remedies.map((remedy, index) => (
                <li key={index}>{remedy}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* Search Tips */}
      {!disorder && !error && (
        <div className="search-tips">
          <h4>💡 Search Tips</h4>
          <ul>
            <li>Be specific with disorder names</li>
            <li>Check spelling if no results appear</li>
            <li>Try common disorders like anxiety or depression</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DisorderSearch;