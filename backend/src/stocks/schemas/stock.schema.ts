import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, HydratedDocument } from "mongoose";

export type ApplicationLogDocument = HydratedDocument<Stocks>;

@Schema({ collection: "stocks" })
export class Stocks {
  @Prop({ index: true })
  code: string;

  @Prop()
  rate: string;

  @Prop()
  currency: string;

  @Prop({ type: Date })
  time: Date;
}

export const StocksSchema = SchemaFactory.createForClass(Stocks);
