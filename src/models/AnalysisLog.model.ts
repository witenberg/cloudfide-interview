import { Schema, model, Document } from "mongoose";
import { AnalysisResult } from "../types/analysis.types";

export interface IAnalysisLog extends AnalysisResult, Document {
    createdAt: Date;
}

const AnalysisLogSchema = new Schema<IAnalysisLog>({
    symbol: { type: String, required: true, index: true },
    interval: { type: String, required: true },
    totalPeriods: { type: Number, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    startPrice: { type: Number, required: true },
    endPrice: { type: Number, required: true },
    priceChange: { type: Number, required: true },
    priceChangePercent: { type: Number, required: true },
    trend: { type: String, enum: ['increase', 'decrease', 'stable'], required: true },
    createdAt: { type: Date, default: Date.now, index: true },
});

const AnalysisLogModel = model<IAnalysisLog>("AnalysisLog", AnalysisLogSchema);

export default AnalysisLogModel;