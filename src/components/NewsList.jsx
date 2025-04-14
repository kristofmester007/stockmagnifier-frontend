import React, { useState, useMemo, useEffect  } from 'react';
import NewsDisplayer from './NewsDisplayer';
import styles from './NewsList.module.css';

function NewsList({ news }) {
  const initialSortBy = localStorage.getItem('newsListSortBy') || 'date';
  const initialSortOrder = localStorage.getItem('newsListSortOrder') || 'desc';
  
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const sortedNews = useMemo(() => {
    const sorted = [...news];

    sorted.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'sentiment') {
        comparison = a['sentiment-score'] - b['sentiment-score'];
      } else {
        comparison = new Date(a.date) - new Date(b.date);
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [news, sortBy, sortOrder]);

  const handleSortByChange = (event) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    localStorage.setItem('newsListSortBy', newSortBy);
  };

  const handleSortOrderChange = (event) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
    localStorage.setItem('newsListSortOrder', newSortOrder);
  };

  return (
    <div className={styles.newsList}>
      <div className={styles.sortControls}>
        <label htmlFor="sortBy">Sort By:</label>
        <select id="sortBy" value={sortBy} onChange={handleSortByChange}>
          <option value="date">Date</option>
          <option value="sentiment">Sentiment</option>
        </select>

        <label htmlFor="sortOrder">Order:</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {sortedNews.map((newsItem) => (
        <NewsDisplayer key={newsItem.id} newsItem={newsItem} />
      ))}
    </div>
  );
}

export default NewsList;