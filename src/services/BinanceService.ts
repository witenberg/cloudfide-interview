import axios, { AxiosInstance } from "axios";
import { BinanceKlineArray, Kline } from "../types/analysis.types";

/**
 * Service responsible for communication with  Binance API
 */
export class BinanceService {
    private readonly client: AxiosInstance;

    constructor(baseURL: string) {
        if (!baseURL) {
            throw new Error("Base URL is required");
        }
        this.client = axios.create({
            baseURL,
            timeout: 10000,
        });
    }

    /**
     * Fetching historical data
     */
     public async getHistoricalData(
        symbol: string,
        interval: string,
        limit: number = 100,
     ): Promise<Kline[]> {
        console.log(`Fetching historical data for ${symbol} at ${interval} with limit ${limit}`);
        try {
            const { data } = await this.client.get<BinanceKlineArray[]>(
                `/api/v3/klines`,
                {
                    params: { symbol, interval, limit },
                },
            );
            
            if (!data || data.length === 0) {
                return [];
            }

            return data.map(this.transformDataToKline);
        }
        catch (error) {
            console.error("Error fetching historical data:", error);
            throw error;
        }
     }

     private transformDataToKline(data: BinanceKlineArray): Kline {
        return {
            openTime: Number(data[0]),
            open: Number(data[1]),
            close: Number(data[4]),
        };
    }
}
