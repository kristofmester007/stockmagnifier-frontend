import React, { useState } from 'react';
import styles from './StockList.module.css';

function StockList({ stocks, onStockSelect, selectedTicker }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.ticker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemClick = (ticker) => {
    if (selectedTicker === ticker) {
      onStockSelect(null);
    } else {
      onStockSelect(ticker);
    }
  };

  return (
    <div className={styles.stockListContainer}>
      <div className={styles.searchBarContainer}>
        <input
          type="text"
          placeholder="Search stocks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchBox}
        />
      </div>
      <ul className={styles.stockList}>
        {filteredStocks.map((stock) => (
          <li
            key={stock.ticker}
            className={`${styles.stockItem} ${
              selectedTicker === stock.ticker ? styles.selectedStock : ''
            }`}
            onClick={() => handleItemClick(stock.ticker)}
          >
            {stock.company}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockList;