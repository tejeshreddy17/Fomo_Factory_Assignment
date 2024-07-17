import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import * as controllers from "./index.controllers";
import { StocksPriceUpdaterJob } from "./use-cases/stock-price-updater/stock-price-updater-job";
import { Stocks, StocksSchema } from "./schemas";
import { GetStockPriceQuery } from "./use-cases/get-stock-price/get-stock-prices.query";
import { GetStockSymbolsQuery } from "./use-cases/get-stock-symbol/get.query";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stocks.name, schema: StocksSchema }]),
  ],
  controllers: [...Object.values(controllers)],
  providers: [StocksPriceUpdaterJob, GetStockPriceQuery, GetStockSymbolsQuery],
})
export class StocksModule {}
