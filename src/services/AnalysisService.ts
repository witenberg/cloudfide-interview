import { Kline, AnalysisResult } from "../types/analysis.types";

export interface AnalysisInput {
    symbol: string;
    interval: string;
    data: Kline[];
} 

export class AnalysisService {
    public analyzePriceChanges(input: AnalysisInput): AnalysisResult {
        const { symbol, interval, data } = input;

        if (!data || data.length === 0) {
            throw new Error("No data provided");
        }

        const firstPeriod = data[0];
        const lastPeriod = data[data.length - 1];
        const totalPeriods = data.length;

        const startPrice = firstPeriod.open;
        const endPrice = lastPeriod.open;

        const priceChange = endPrice - startPrice;
        const priceChangePercent = (priceChange / startPrice) * 100;

        let trend: AnalysisResult["trend"] = "stable";

        if (priceChangePercent > 0.1) {
            trend = "increase";
        }
        else if (priceChangePercent < -0.1) {
            trend = "decrease";
        }

        return {
            symbol: symbol.toUpperCase(),
            interval,
            totalPeriods,
            startTime: new Date(firstPeriod.openTime).toISOString(),
            endTime: new Date(lastPeriod.openTime).toISOString(),
            startPrice,
            endPrice,
            priceChange: parseFloat(priceChange.toFixed(6)),
            priceChangePercent: parseFloat(priceChangePercent.toFixed(2)),
            trend,
        }   
    }
}

