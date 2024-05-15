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

// Delete log
export const deleteLog = createAsyncThunk("logs/deleteLog", async id => {
  await fetch(`/logs/${id}`, {
    method: "DELETE",
  });

  return id;
});

// Update log on server
export const updateLog = createAsyncThunk("logs/updateLog", async log => {
  const response = await fetch(`/logs/${log.id}`, {
    method: "PUT",
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
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    clearCurrent: state => {
      state.current = null;
    },
  },
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
        state.error = action.error.message;
      });
    builder
      .addCase(deleteLog.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.logs = state.logs.filter(log => log.id !== payload);
      })
      .addCase(deleteLog.rejected, state => {
        state.error = action.error.message;
      });
    builder
      .addCase(updateLog.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.logs = state.logs.map(log => (log.id === payload.id ? payload : log));
      })
      .addCase(updateLog.rejected, state => {
        state.error = action.error.message;
      });
  },
});

export const {setCurrent, clearCurrent} = logSlice.actions;
export default logSlice.reducer;
