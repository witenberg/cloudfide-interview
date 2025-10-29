import { AnalysisService } from "../src/services/AnalysisService";
import { mockKlineDateDecrease, mockKlineDateIncrease } from "./mocks/kline.mock";

describe("AnalysisService (unit)", () => {
    let analysisService: AnalysisService;

    beforeEach(() => {
        analysisService = new AnalysisService();
    });

    const commonInput = { symbol: "BTCUSDT", interval: "1d" };

    it('should correctly analyze price changes for a decreasing trend', () => {
        const input = { ...commonInput, data: mockKlineDateDecrease };
        const result = analysisService.analyzePriceChanges(input);

        expect(result.trend).toBe("decrease");
        expect(result.priceChangePercent).toBeCloseTo(-2.25, 2);
    });

    it('should correctly analyze price changes for a increasing trend', () => {
        const input = { ...commonInput, data: mockKlineDateIncrease };
        const result = analysisService.analyzePriceChanges(input);

        expect(result.trend).toBe("increase");
        expect(result.priceChangePercent).toBeCloseTo(3.88, 2);
    });

});
