import axios from "axios";
import { RootState } from "../store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const url = "http://localhost:4000";

interface DataEntry {
  time: string;
  price: number;
}

export const fetchAvailableSymbols = createAsyncThunk(
  "stock-symbols",
  async () => {
    const response = await axios.get(`${url}/stock-symbols}`);
    return response.data;
  }
);

interface StockPriceState {
  data: DataEntry[];
  symbol: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  rate: string;
  symbols: string[];
}

const initialState: StockPriceState = {
  data: [],
  symbol: "BTC",
  rate: "",
  status: "idle",
  symbols: [],
};

// Thunk for fetching initial data
export const fetchInitialPriceData = createAsyncThunk(
  "stockCrypto/fetchInitialData",
  async (symbol: string) => {
    const response = await axios.get(`${url}/stock-price/${symbol}`);
    return response.data;
  }
);

export const fetchStockSymbols = createAsyncThunk("stock-symbols", async () => {
  const response = await axios.get(`${url}/stock-symbols`);
  return response.data;
});

const stockPriceSlice = createSlice({
  name: "stockPrice",
  initialState,
  reducers: {
    updateData(state: StockPriceState, action: PayloadAction<DataEntry[]>) {
      state.data = action.payload;
    },
    changeSymbol(state: StockPriceState, action: PayloadAction<string>) {
      state.symbol = action.payload;
    },
    dropDownsymbols(state: StockPriceState, action: PayloadAction<string[]>) {
      state.symbols = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchInitialPriceData.pending, (state: StockPriceState) => {
        state.status = "loading";
      })
      .addCase(
        fetchInitialPriceData.fulfilled,
        (state: StockPriceState, action: PayloadAction<DataEntry[]>) => {
          state.data = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(fetchInitialPriceData.rejected, (state: StockPriceState) => {
        state.status = "failed";
      })
      .addCase(
        fetchStockSymbols.fulfilled,
        (state: StockPriceState, action: PayloadAction<string[]>) => {
          state.symbols = action.payload;
        }
      );
  },
});

export const { updateData, changeSymbol, dropDownsymbols } =
  stockPriceSlice.actions;

export const selectData = (state: RootState) => state.stockCrypto.data;
export const selectSymbol = (state: RootState) => state.stockCrypto.symbol;
export const dropDownSymbols = (state: RootState) => state.stockCrypto.symbols;

export default stockPriceSlice.reducer;
