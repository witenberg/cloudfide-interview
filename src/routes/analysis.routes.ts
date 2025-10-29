import { Router } from "express";
import { BinanceService } from "../services/BinanceService";
import { AnalysisRepository } from "../repositories/AnalysisRepository";
import { AnalysisService } from "../services/AnalysisService";
import { AnalysisController } from "../controllers/AnalysisController";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

const binanceService = new BinanceService(process.env.BINANCE_API_URL!);
const analysisService = new AnalysisService();
const analysisRepository = new AnalysisRepository();

const analysisController = new AnalysisController(binanceService, analysisService, analysisRepository);

router.get('/', analysisController.getAnalysis.bind(analysisController));

export default router;
