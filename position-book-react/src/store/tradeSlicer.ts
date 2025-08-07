import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Position, TradeEvent } from "../types";
import axios from "../api/axiosInstance";
interface TradeState {
  positions: Position[];
  events: TradeEvent[];
  loading: boolean;
  error: string | null;
}

const initialState: TradeState = {
  positions: [],
  events: [],
  loading: false,
  error: null,
};

export const fetchPositions = createAsyncThunk<
  Position[],
  void,
  { rejectValue: string }
>("trades/fetchPositions", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<{ Positions: Position[] }>(
      "/trades/positions"
    );
    return response.data.Positions;
  } catch (err: any) {
    return rejectWithValue("Failed to fetch positions");
  }
});

export const postTrade = createAsyncThunk<
  TradeEvent[], // payload.events[]
  { events: TradeEvent[] },
  { rejectValue: string }
>("trades/postTrade", async (payload, { dispatch, rejectWithValue }) => {
  try {
    await axios.post("/trades", payload);
    dispatch(fetchPositions());
    return payload.events;
  } catch (err: any) {
    return rejectWithValue("Failed to post trade");
  }
});

const tradeSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH POSITIONS
      .addCase(fetchPositions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPositions.fulfilled,
        (state, action: PayloadAction<Position[]>) => {
          state.loading = false;
          state.positions = action.payload; // now an array
        }
      )
      .addCase(fetchPositions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // POST TRADE
      .addCase(postTrade.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(
        postTrade.fulfilled,
        (state, action: PayloadAction<TradeEvent[]>) => {
          state.events.push(...action.payload);
        }
      );
  },
});
export default tradeSlice.reducer;
