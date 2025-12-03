// frontend/src/components/Assessment.js
import React, { useState } from 'react';
import './Assessment.css';

const Assessment = () => {
  // State for answers and result
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // 5 assessment questions
  const questions = [
    "Have you felt sad or hopeless recently?",
    "Have you lost interest in activities you used to enjoy?",
    "Have you had changes in appetite or weight?",
    "Do you have trouble sleeping?",
    "Do you often feel tired or lack energy?"
  ];
  
  // Handle answer selection
  const handleAnswer = (index, answer) => {
    setAnswers(prev => ({ ...prev, [index]: answer }));
  };
  
  // Submit assessment
  const handleSubmit = async () => {
    // Check if all questions answered
    if (Object.keys(answers).length < 5) {
      alert('Please answer all 5 questions');
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare answers array
      const answersArray = questions.map((_, index) => answers[index] || 'no');
      
      // Send to backend API
      const response = await fetch('/api/assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: answersArray })
      });
      
      const data = await response.json();
      setResult(data);
      
    } catch (error) {
      console.error('Error:', error);
      // Fallback calculation if API fails
      calculateLocalResult();
    } finally {
      setLoading(false);
    }
  };
  
  // Fallback calculation
  const calculateLocalResult = () => {
    const yesCount = Object.values(answers).filter(a => a === 'yes').length;
    
    if (yesCount >= 3) {
      setResult({
        result: "You may benefit from professional support.",
        remedies: [
          "Talk to a mental health professional",
          "Practice daily self-care",
          "Maintain regular sleep",
          "Connect with supportive people",
          "Consider therapy"
        ],
        severity: "high"
      });
    } else if (yesCount >= 1) {
      setResult({
        result: "Monitor your mental health and practice self-care.",
        remedies: [
          "Practice mindfulness",
          "Maintain routine",
          "Exercise regularly",
          "Talk to friends",
          "Monitor your mood"
        ],
        severity: "medium"
      });
    } else {
      setResult({
        result: "You're doing well. Keep it up!",
        remedies: [
          "Continue healthy habits",
          "Stay connected",
          "Practice stress relief",
          "Regular check-ins",
          "Help others"
        ],
        severity: "low"
      });
    }
  };
  
  // Reset assessment
  const handleReset = () => {
    setAnswers({});
    setResult(null);
  };
  
  return (
    <div className="assessment">
      <h2 className="section-title">Mental Health Assessment</h2>
      <p className="section-description">
        Answer these 5 questions honestly about your recent feelings.
      </p>
      
      {/* Questions */}
      <div className="questions">
        {questions.map((question, index) => (
          <div key={index} className="question-card">
            <p className="question-text">{question}</p>
            <div className="options">
              {['yes', 'no', 'unsure'].map(option => (
                <button
                  key={option}
                  className={`option-btn ${answers[index] === option ? 'selected' : ''}`}
                  onClick={() => handleAnswer(index, option)}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          className="submit-btn" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Get Assessment'}
        </button>
        <button className="reset-btn" onClick={handleReset}>
          Reset Answers
        </button>
      </div>
      
      {/* Results */}
      {result && (
        <div className={`result-card severity-${result.severity}`}>
          <h3>Your Assessment Result</h3>
          <p className="result-message">{result.result}</p>
          
          <h4>Recommended Actions:</h4>
          <ul className="remedies-list">
            {result.remedies.map((remedy, index) => (
              <li key={index}>{remedy}</li>
            ))}
          </ul>
          
          <div className="severity">
            <span className="severity-label">Severity:</span>
            <span className={`severity-badge ${result.severity}`}>
              {result.severity.toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessment;