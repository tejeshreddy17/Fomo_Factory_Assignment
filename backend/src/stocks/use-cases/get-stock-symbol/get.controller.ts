import { Controller, Get } from "@nestjs/common";
import { GetStockSymbolsQuery } from "./get.query";

@Controller("stock-symbols")
export class GetStockSymbolsController {
  constructor(private readonly query: GetStockSymbolsQuery) {}

  @Get("")
  async getStockSymbols() {
    return await this.query.run();
  }
}
