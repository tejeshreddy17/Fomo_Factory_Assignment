import { Model } from "mongoose";
import { Stocks } from "../../schemas";
import { InjectModel } from "@nestjs/mongoose";

export class GetStockSymbolsQuery {
  constructor(
    @InjectModel(Stocks.name)
    private stocksPriceModel: Model<Stocks>
  ) {}

  async run(): Promise<string[]> {
    const stocks = await this.stocksPriceModel.find().exec();

    const stockSymbols = stocks.map((stock) => stock.code);
    const uniqueStockSymbols = [...new Set(stockSymbols)];

    return uniqueStockSymbols;
  }
}
