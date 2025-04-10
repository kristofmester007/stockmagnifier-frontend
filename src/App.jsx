import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AnalysisPage from './pages/AnalysisPage';
import RecommendationsPage from './pages/RecommendationsPage';
import Navbar from './components/Navbar';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.appContainer}>
        <Navbar />
        <div className={styles.contentContainer}>
          <Routes>
            <Route path="/analysis/:ticker?" element={<AnalysisPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/" element={<Navigate replace to="/analysis" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;