import { Request, Response, NextFunction } from "express";
import { AnalysisController } from "../src/controllers/AnalysisController";
import { BinanceService } from "../src/services/BinanceService";
import { AnalysisService } from "../src/services/AnalysisService";
import { AnalysisRepository } from "../src/repositories/AnalysisRepository";
import { mockKlineDateIncrease } from "./mocks/kline.mock";

jest.mock("../src/services/BinanceService");
jest.mock("../src/services/AnalysisService");
jest.mock("../src/repositories/AnalysisRepository");

describe("AnalysisController (unit)", () => {
    let analysisController: AnalysisController;

    let mockBinanceService: jest.Mocked<BinanceService>;
    let mockAnalysisService: jest.Mocked<AnalysisService>;
    let mockAnalysisRepository: jest.Mocked<AnalysisRepository>;

    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();

        mockBinanceService = new BinanceService(process.env.BINANCE_API_URL!) as jest.Mocked<BinanceService>;
        mockAnalysisService = new AnalysisService() as jest.Mocked<AnalysisService>;
        mockAnalysisRepository = new AnalysisRepository() as jest.Mocked<AnalysisRepository>;

        analysisController = new AnalysisController(mockBinanceService, mockAnalysisService, mockAnalysisRepository);

        mockRequest = {
            query: {
                symbol: "BTCUSDT",
                interval: "1d",
                limit: "3",
            },
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it("should successfully analyze data and return 200", async () => {
        const mockAnalysisResult = {
            trend: "increase",
            priceChangePercent: 3,
        }
        
        mockBinanceService.getHistoricalData.mockResolvedValue(mockKlineDateIncrease);
        mockAnalysisService.analyzePriceChanges.mockReturnValue(mockAnalysisResult as any);
        mockAnalysisRepository.logAnalysis.mockResolvedValue(undefined);

        await analysisController.getAnalysis(mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockBinanceService.getHistoricalData).toHaveBeenCalledWith("BTCUSDT", "1d", 3);
        expect(mockAnalysisService.analyzePriceChanges).toHaveBeenCalledWith({
            symbol: "BTCUSDT",
            interval: "1d",
            data: mockKlineDateIncrease,
        });
        expect(mockAnalysisRepository.logAnalysis).toHaveBeenCalledWith(mockAnalysisResult);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockAnalysisResult);
        expect(mockNext).not.toHaveBeenCalled();

    });

    it("should return 400 if symbol is not provided", async () => {
        mockRequest.query = { interval: "1d", limit: "3" };

        await analysisController.getAnalysis(mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: "Symbol is required" });
        expect(mockBinanceService.getHistoricalData).not.toHaveBeenCalled();
    });
});