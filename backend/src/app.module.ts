import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "db/data-source";
import { DataSource } from "typeorm";
import { StocksModule } from "./stocks/stocks.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    MongooseModule.forRoot(dataSourceOptions.uri, {
      dbName: dataSourceOptions.dbName,
      ignoreUndefined: true,
    }),
    ScheduleModule.forRoot(),
    StocksModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
