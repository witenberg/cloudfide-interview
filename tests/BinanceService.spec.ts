import axios from "axios";
import { BinanceService } from "../src/services/BinanceService";
import { mockBinanceRawResponseIncrease, mockKlineDateIncrease } from "./mocks/kline.mock";
import dotenv from "dotenv";
dotenv.config();

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("BinanceService (unit)", () => {
    let binanceService: BinanceService;

    beforeEach(() => {
        jest.clearAllMocks();

        mockedAxios.create.mockReturnValue(mockedAxios as any);

        binanceService = new BinanceService(process.env.BINANCE_API_URL!);
    });

    it("should fetch and transform historical data correctly", async () => {
        mockedAxios.get.mockResolvedValue({ data: mockBinanceRawResponseIncrease });

        const result = await binanceService.getHistoricalData("BTCUSDT", "1d", 3);

        expect(mockedAxios.get).toHaveBeenCalledWith("/api/v3/klines", {
            params: { symbol: "BTCUSDT", interval: "1d", limit: 3 },
        });

        expect(result).toEqual(mockKlineDateIncrease);
    });

    it("should throw an error if the API call fails", async () => {
        mockedAxios.get.mockRejectedValue(new Error("Network error"));

        await expect(binanceService.getHistoricalData("BTCUSDT", "1d", 3)).rejects.toThrow("Network error");
    });
});