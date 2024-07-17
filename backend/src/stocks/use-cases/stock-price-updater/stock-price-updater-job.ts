import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Interval } from "@nestjs/schedule";
import { Model } from "mongoose";
import { Stocks } from "src/stocks/schemas";

const intervalTime = parseInt(process.env.REFRESH_TIMER);

@Injectable()
export class StocksPriceUpdaterJob {
  constructor(
    @InjectModel(Stocks.name)
    private stocksPriceModel: Model<Stocks>
  ) {}

  @Interval(intervalTime)
  async handle() {
    const stocks = await this.getStockPriceData();
    await this.updateStockPrices(stocks);
  }

  private async getStockPriceData(): Promise<stockResponse[]> {
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": process.env.api_key,
    };

    const payload = {
      currency: "USD",
      sort: "rank",
      order: "ascending",
      offset: 0,
      limit: parseInt(process.env.NO_OF_STOCKS),
      meta: false,
    };

    const response = await fetch("https://api.livecoinwatch.com/coins/list", {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    return await response.json();
  }

  private async updateStockPrices(stocks: stockResponse[]) {
    for (const stock of stocks) {
      const stockEntity = new this.stocksPriceModel({
        code: stock.code,
        rate: stock.rate,
        time: new Date(),
      });

      await stockEntity.save();
    }
  }
}

export type stockResponse = {
  code: string;
  rate: number;
  volume: number;
  cap: number;
  delta: {
    hour: number;
    day: number;
    week: number;
    month: number;
    quarter: number;
    year: number;
  };
};
