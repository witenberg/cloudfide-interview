import { NextFunction, Request, Response } from "express";
import { BinanceService } from "../services/BinanceService";
import { AnalysisService } from "../services/AnalysisService";
import { AnalysisRepository } from "../repositories/AnalysisRepository";
/**
 * Controller responsible for handling analysis requests
 */

export class AnalysisController {
    
    constructor(
        private binanceService: BinanceService,
        private analysisService: AnalysisService,
        private analysisRepository: AnalysisRepository,
    ) {}

    public getAnalysis = async (req: Request, res: Response, next: NextFunction) => {
        try {

            // validate query parameters
            const { symbol, interval, limit = 100 } = req.query;

            if (!symbol || typeof symbol !== 'string') {
                return res.status(400).json({ error: "Symbol is required" });
            }

            if (!interval || typeof interval !== 'string') {
                return res.status(400).json({ error: "Interval is required" });
            }

            const limitNumber = parseInt(limit as string, 10);
            if (isNaN(limitNumber) || limitNumber <= 0 || limitNumber > 1000) {
                return res.status(400).json({ error: "Invalid limit parameter. Must be a number between 1 and 1000" });
            }

            // fetch historical data
            const klineData = await this.binanceService.getHistoricalData(symbol, interval, limitNumber);

            if (klineData.length === 0) {
                return res.status(404).json({ error: "No data found for the given symbol and interval" });
            }

            const analysis = this.analysisService.analyzePriceChanges({
                symbol,
                interval,
                data: klineData,
            });

            // return response if everything ok
            res.status(200).json(analysis);

            // log to db
            this.analysisRepository.logAnalysis(analysis).catch(err => {
                console.error("Error logging analysis:", err);
            });
        }
        catch (error) {
            console.error("Error getting analysis:", error);
            next(error);
        }
    }
}