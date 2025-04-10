import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StockList from '../components/StockList';
import StockDisplayer from '../components/StockDisplayer';
import styles from './AnalysisPage.module.css';
import { fetchStockData, fetchStockList } from '../services/apiService';
import { RingLoader } from 'react-spinners';

function AnalysisPage() {
  const [allStocks, setAllStocks] = useState([]);
  const [selectedStockData, setSelectedStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTicker, setSelectedTicker] = useState(null);
  const { ticker: urlTicker } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadStockList = async () => {
      setLoading(true);
      try {
        const stocks = await fetchStockList();
        setAllStocks(stocks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStockList();
  }, []);

  useEffect(() => {
    if (urlTicker && allStocks.some((stock) => stock.ticker.toLowerCase() === urlTicker.toLowerCase())) {
      handleStockSelect(urlTicker.toUpperCase());
    }
  }, [urlTicker, allStocks]);

  const handleStockSelect = async (ticker) => {
    setSelectedTicker(ticker);
    if (ticker === null) {
      setSelectedStockData(null);
      navigate('/analysis');
      return;
    }

    //setLoading(true);
    setError(null);
    try {
      const data = await fetchStockData(ticker);
      setSelectedStockData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

    if (ticker) {
      navigate(`/analysis/${ticker.toLowerCase()}`);
    } else {
      navigate('/analysis');
    }
  };

  const renderNoSelectionMessage = () => (
    <div className={styles.noSelectionMessage}>
      <h3>Select a company from the list to analyze its stock sentiment.</h3>
      <p>
        The currently examined stocks are the top 50 companies from the S&P 500
        index.
      </p>
      <p>
        <b>Sentiment score</b>s for individual news articles range from -1000 to
        1000, where negative values indicate negative sentiment, positive values
        indicate positive sentiment, and 0 represents neutral sentiment.
      </p>
      <p>
        The <b>Average Sentiment</b> is the mean sentiment score of all relevant
        news articles.
      </p>
      <p>
        The <b>Weighted Average Sentiment</b> is calculated by applying a decaying
        weight to older news. Each day, the weight of a news article is reduced
        by 15%, and news older than one week is excluded. This emphasizes the
        impact of recent news on the overall sentiment.
      </p>
      <p>
        The <b>time-series graph</b> displays the average daily sentiment for the
        selected stock over the past week, where Day 0 is today and the x-axis
        represents the number of days ago.
      </p>
      <p className={styles.warning}>
        <b>Important Disclaimer:</b> Sentiment analysis is just one of many
        factors to consider when making investment decisions. Do not rely solely
        on this information for trading purposes. Consult with a financial
        professional before making any decisions.
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className={styles.appContainer}>
        <RingLoader color="#ccc" loading={loading} size={80} />
      </div>
    );
  }

  if (error) {
    return <div className={styles.appContainer}>Error: {error}</div>;
  }

  return (
    <div className={styles.appContainer}>
      <div className={styles.stockListContainer}>
        <StockList
          stocks={allStocks}
          onStockSelect={handleStockSelect}
          selectedTicker={selectedTicker}
        />
      </div>
      <div className={styles.stockDisplayerContainer}>
        {selectedStockData ? (
          <StockDisplayer stockData={selectedStockData} />
        ) : (
          renderNoSelectionMessage()
        )}
      </div>
    </div>
  );
}

export default AnalysisPage;