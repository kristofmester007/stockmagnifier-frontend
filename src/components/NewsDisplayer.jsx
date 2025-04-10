import React from 'react';
import styles from './NewsDisplayer.module.css';
import SentimentScore from './SentimentScore';

function NewsDisplayer({ newsItem }) {
  const { summary, date, 'sentiment-score': sentimentScore } = newsItem;

  const formattedDate = new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className={styles.container}>
      <div className={styles.dateArea}>
        <span>📅 {formattedDate}</span>
      </div>
      <div className={styles.summaryArea}>
        <p className={styles.summaryText}>{summary}</p>
      </div>
      <div className={styles.sentimentArea}>
        <span>Sentiment Score: </span>
        <SentimentScore score={sentimentScore} />
      </div>
    </div>
  );
}

export default NewsDisplayer;