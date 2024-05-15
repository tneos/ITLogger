import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
  logs: [],
  current: null,
  loading: false,
  error: null,
};

// Get logs from server
export const getLogs = createAsyncThunk("logs/getLogs", async () => {
  const response = await fetch("/logs");
  const jsonData = await response.json();
  return jsonData;
});

// Add new log
export const addLog = createAsyncThunk("logs/addLog", async log => {
  const response = await fetch("/logs", {
    method: "POST",
    body: JSON.stringify(log),
    headers: {
      "Content-Type": "application/json",
    },
  });
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
    builder
      .addCase(addLog.pending, state => {
        state.isLoading = true;
      })
      .addCase(addLog.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.logs.push(payload);
      })
      .addCase(addLog.rejected, state => {
        state.isLoading = false;
      });
  },
});

export default logSlice.reducer;
