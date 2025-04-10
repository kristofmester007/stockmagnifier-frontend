import React from 'react';
import styles from './SentimentScore.module.css';

function SentimentScore({ score }) {
  const roundedScore = (1000*score).toFixed(0);

  const getSentimentColor = (score) => {
    if (score > 100) return 'green';
    if (score < -100) return 'red';
    return 'yellow';
  };

  const sentimentColor = getSentimentColor(roundedScore);

  return (
    <span className={styles.sentimentScore} style={{ color: sentimentColor }}>
      {roundedScore}
    </span>
  );
}

export default SentimentScore;