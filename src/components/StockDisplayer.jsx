import React from 'react';
import AnalysisDisplayer from './AnalysisDisplayer';
import NewsList from './NewsList';
import styles from './StockDisplayer.module.css';

function StockDisplayer({ stockData }) {
  return (
    <div className={styles.container}>
      <AnalysisDisplayer stockData={stockData} />
      {stockData.news && stockData.news.length > 0 ? (
        <NewsList news={stockData.news} />
      ) : (
        <div className={styles.noNewsMessage}>
          <p>No news found for this stock.</p>
        </div>
      )}
    </div>
  );
}

export default StockDisplayer;