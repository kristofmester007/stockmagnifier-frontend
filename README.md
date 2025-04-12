#   StockMagnifier - Stock Sentiment Analysis Application  - Frontend

StockMagnifier is a web application that provides sentiment analysis for the top 50 companies of the S&P 500 index.

##   Key Functionalities

* Displays a list of the top 50 S&P 500 companies.
* Shows sentiment analysis data, including:
    * Individual news sentiment scores (range: -1000 to 1000).
    * Average sentiment.
    * Weighted average sentiment (with decaying weight for older news).
    * Daily sentiment trend graph (past week).
* Provides recommendations based on weighted average sentiment.
* Allows users to select a company to view detailed analysis.

##   Running Locally

To run this application locally, follow these steps:

1.  **Backend (FastAPI):**
    * Ensure the backend server is running.
    * Verify that the frontend's API service (`./src/services/apiService.js`) points to the correct backend address (IP and port).
2.  **Frontend (React/Vite):**
    * Ensure Node.js and npm are installed.
    * Navigate to the `app` directory.
    * Install frontend dependencies: `npm install`
    * Run the frontend development server: `npm run dev`
    * Open your browser to the URL provided by Vite (usually `http://localhost:5173`).

##   Building

To create a production build of the frontend:

1.  Navigate to the `app` directory.
2.  Run the build command: `npm run build`
3.  The production-ready files will be located in the `dist` directory. You will need to serve these files using a web server (e.g., Nginx, Apache, or a Node.js server) for deployment.
4.  Run the application to make sure everything went well: `npm run preview`

## Related Projects

You can also find the backend related to this project at https://github.com/kristofmester007/stockmagnifier-backend.

A deployed version of this project is available at: https://stockmagnifier.com

##   Copyright

Copyright © 2025 Kristóf Szabó. Developed as a BSc Thesis project at Eötvös Loránd University (ELTE).