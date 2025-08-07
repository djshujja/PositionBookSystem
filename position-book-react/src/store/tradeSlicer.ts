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

// GET: Fetch positions (unwraps the "Positions" array)
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
    return rejectWithValue(
      err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch positions"
    );
  }
});

// POST: Submit one or more trades
export const postTrade = createAsyncThunk<
  TradeEvent[],
  { events: TradeEvent[] },
  { rejectValue: string }
>("trades/postTrade", async (payload, { dispatch, rejectWithValue }) => {
  try {
    await axios.post("/trades", payload);
    dispatch(fetchPositions());
    return payload.events;
  } catch (err: any) {
    const serverMsg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Failed to post trade";
    return rejectWithValue(serverMsg);
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
          state.positions = action.payload;
        }
      )
      .addCase(fetchPositions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // POST TRADE
      .addCase(postTrade.pending, (state) => {
        state.error = null;
      })
      .addCase(
        postTrade.fulfilled,
        (state, action: PayloadAction<TradeEvent[]>) => {
          state.events.push(...action.payload);
        }
      )
      .addCase(postTrade.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default tradeSlice.reducer;
