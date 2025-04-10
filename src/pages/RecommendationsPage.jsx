import React, { useState, useEffect } from 'react';
import styles from './RecommendationsPage.module.css';
import { fetchRecommendations } from '../services/apiService';
import Recommendation from '../components/Recommendation';
import { RingLoader } from 'react-spinners';

function RecommendationsPage() {
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadRecommendations = async () => {
            setLoading(true);
            try {
                const data = await fetchRecommendations();
                setRecommendations(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadRecommendations();
    }, []);

    if (loading) {
        return (
            <div className={styles.container}>
                <RingLoader color="#ccc" loading={loading} size={80} />
            </div>
        );
    }

    if (error) {
        return <div className={styles.container}>Error: {error}</div>;
    }

    if (!recommendations) {
        return <div className={styles.container}>No recommendations available.</div>;
    }

    return (
        <div className={styles.page}>
            <p>Recommendations are based on the weighted average sentiment scores of the analyzed stocks.</p>
            <p>Click a ticker symbol to view detailed information.</p>
            <div className={styles.container}>
                <div className={styles.recommendationList}>
                    <h2>Best performers</h2>
                    {recommendations.top_5_best.map((item) => (
                        <Recommendation
                            key={item.ticker}
                            ticker={item.ticker}
                            score={item.weighted_average}
                        />
                    ))}
                </div>
                <div className={styles.recommendationList}>
                    <h2>Worst performers</h2>
                    {recommendations.top_5_worst.map((item) => (
                        <Recommendation
                            key={item.ticker}
                            ticker={item.ticker}
                            score={item.weighted_average}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RecommendationsPage;