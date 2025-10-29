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

## API Endpoint

### Analysis Endpoint
**GET** `/analysis`

Fetches historical price data from Binance and analyzes price changes.

**Query Parameters:**
- `symbol` (required): Trading pair symbol (e.g., "BTCUSDT", "ETHUSDT")
- `interval` (required): Time interval (e.g., "1h", "4h", "1d")
- `limit` (optional): Number of data points (1-1000, default: 100)

**Example Request:**
```bash
curl "http://localhost:3000/api/v1/analysis?symbol=BTCUSDT&interval=1h&limit=24"
```

**Example Response:**
```json
{
    "symbol":"BTCUSDT",
    "interval":"1d",
    "totalPeriods":100,
    "startTime":"2025-07-22T00:00:00.000Z"
    ,"endTime":"2025-10-29T00:00:00.000Z",
    "startPrice":117380.36,
    "endPrice":112898.44,
    "priceChange":-4481.92,
    "priceChangePercent":-3.82,
    "trend":"decrease"
}
```

## Testing

**Run tests:**
```bash
npm test
```
