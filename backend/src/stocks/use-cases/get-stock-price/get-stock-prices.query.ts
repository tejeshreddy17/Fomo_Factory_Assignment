import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Stocks } from "src/stocks/schemas";

export class GetStockPriceQuery {
  constructor(
    @InjectModel(Stocks.name)
    private stocksPriceModel: Model<Stocks>
  ) {}

  async run(code: string): Promise<{ code: string; rate: string }[]> {
    const stockPrices = await this.stocksPriceModel
      .find({ code: new RegExp(code, "i") })
      .limit(20)
      .sort({ time: -1 })
      .exec();

    return stockPrices;
  }
}
