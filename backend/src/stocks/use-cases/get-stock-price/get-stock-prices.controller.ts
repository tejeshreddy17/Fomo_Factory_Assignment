import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetStockPriceQuery } from "./get-stock-prices.query";

@Controller("stock-price")
export class GetStockPricesController {
  constructor(private readonly query: GetStockPriceQuery) {}

  @Get(":code")
  async getStockPrice(@Param("code") code: string) {
    return await this.query.run(code);
  }
}
