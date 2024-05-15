import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
  logs: [],
  current: null,
  loading: false,
  error: null,
};

// Define the async thunk for fetching all the log
export const getLogs = createAsyncThunk("logs/getLogs", async () => {
  const response = await fetch("/logs");
  const jsonData = await response.json();
  return jsonData;
});

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getLogs.pending, state => {
        state.loading = true;
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(getLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default logSlice.reducer;
