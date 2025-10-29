import { Kline, AnalysisResult } from "../types/analysis.types";

export interface AnalysisInput {
    symbol: string;
    interval: string;
    data: Kline[];
} 