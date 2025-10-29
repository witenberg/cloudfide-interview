/**
 * Raw response from Binance API
 */
export type BinanceKlineArray = (string | number)[]

/**
 * Simple Kline object
 */
export interface Kline {
    openTime: number;
    open: number;
    close: number;
}

/** 
 * Analysis result
 */
export interface AnalysisResult {
    symbol: string;
    interval: string;
    totalPeriods: number;
    startTime: string;
    endTime: string;
    startPrice: number;
    endPrice: number;
    priceChange: number;
    priceChangePercent: number;
    trend: 'increase' | 'decrease' | 'stable';
}
