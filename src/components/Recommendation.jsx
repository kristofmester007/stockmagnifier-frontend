import React from 'react';
import { Link } from 'react-router-dom';
import SentimentScore from './SentimentScore';
import styles from './Recommendation.module.css';

function Recommendation({ ticker, score }) {
  return (
    <div className={styles.recommendation}>
      <Link to={`/analysis/${ticker.toLowerCase()}`} className={styles.ticker}>
        {ticker}
      </Link>
      <SentimentScore score={score} />
    </div>
  );
}

export default Recommendation;