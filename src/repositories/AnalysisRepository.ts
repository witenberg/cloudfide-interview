import AnalysisLogModel from "../models/AnalysisLog.model";
import { AnalysisResult } from "../types/analysis.types";

/**
 * Repository responsible for loggin analysis to db
 */
export class AnalysisRepository {

    /**
     * Log analysis result to db
     */
    async logAnalysis(result: AnalysisResult): Promise<void> {
        try {
            const logEntry = new AnalysisLogModel(result);
            await logEntry.save();
            console.log(`Analysis logged: ${result.symbol} - ${result.interval}`);
        }
        catch (error) {
            console.error("Error logging analysis:", error);
            throw error;
        }
    }
}
