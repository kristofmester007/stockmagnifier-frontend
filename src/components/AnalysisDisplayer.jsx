import React, { useState, useEffect, useRef } from 'react';
import styles from './AnalysisDisplayer.module.css';
import SentimentScore from './SentimentScore';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function AnalysisDisplayer({ stockData }) {
    const {
        ticker,
        total_news: totalNews,
        average_sentiment: averageSentiment,
        weighted_average_sentiment: weightedAverageSentiment,
        average_daily_sentiments: averageDailySentiments,
    } = stockData;

    const [isExpanded, setIsExpanded] = useState(true);
    const chartRef = useRef(null);

    const chartData = {
        labels: averageDailySentiments
            ? Object.keys(averageDailySentiments).reverse()
            : [],
        datasets: [
            {
                label: 'Daily Average Sentiment',
                data: averageDailySentiments
                    ? Object.values(averageDailySentiments)
                        .reverse()
                        .map((value) => Math.round(value * 1000))
                    : [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#fff',
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#fff',
                },
                grid: {
                    color: '#fff',
                },
            },
            y: {
                min: -1000,
                max: 1000,
                ticks: {
                    color: '#fff',
                },
                grid: {
                    color: '#fff',
                },
            },
        },
    };

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.update();
        }
    }, [averageDailySentiments]);

    return (
        <div className={styles.stockInfo}>
            {isExpanded ? (
                <div className={styles.fasz}>
                    <div>
                        <h2>{ticker} Stock Analysis</h2>
                        <p>Total News: {totalNews}</p>
                        <p>
                            Average Sentiment:
                            <SentimentScore score={averageSentiment} />
                        </p>
                        <p>
                            Weighted Average Sentiment:
                            <SentimentScore score={weightedAverageSentiment} />
                        </p>
                    </div>
                    {averageDailySentiments && (
                        <div className={styles.chartContainer}>
                            <Line
                                ref={chartRef}
                                data={chartData}
                                options={chartOptions}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.collapsedInfo}>
                    <span>{ticker}</span>
                    <SentimentScore score={weightedAverageSentiment} />
                </div>
            )}
            <div
                className={styles.expandTriangle}
                style={{
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                }}
            ></div>
        </div>
    );
}

export default AnalysisDisplayer;