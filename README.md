# Binance Price Analyzer API

App has one API endpoint, which fetches historical data (klines) from public Binance API, analyze change from first price to last price in given time interval and returns simple report in JSON. Every succesful result is logged to MongoDB database.

## Requirements
 * Node.js v22.18.0 (or newer)
 * npm
 * MongoDB

# Start
1. **Clone repo:**
    ```bash
    git clone https://github.com/witenberg/cloudfide-interview
    cd cloudfie-interview
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure environmental variables:**
    Copy file `.env.example` and name it `.env`
    ```bash
    cp .env.example .env
    ```
    Make sure, that `MONGO_URI` points to your database.

4. **Run the app:**
    ```bash
    npm run dev
    ```
    Server will serve at `http://localhost:3000`.

