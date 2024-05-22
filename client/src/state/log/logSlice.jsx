import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
  logs: "",
  current: null,
  loading: false,
  error: null,
};

// Get logs from server
export const getLogs = createAsyncThunk("logs/getLogs", async () => {
  const response = await fetch("/logs");
  const jsonData = await response.json();
  //console.log(jsonData);
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
  console.log(jsonData);
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
  console.log(log._id);
  const response = await fetch(`/logs/${log._id}`, {
    method: "PUT",
    body: JSON.stringify(log),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonData = await response.json();
  // console.log(jsonData);
  return jsonData;
});

// Search logs
export const searchLogs = createAsyncThunk("logs/searchLogs", async text => {
  const response = await fetch(`/logs?q=${text}`);
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
        state.logs = action.payload.logsData;
      })
      .addCase(getLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.statusText;
      });
    builder
      .addCase(addLog.pending, state => {
        state.loading = true;
      })
      .addCase(addLog.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.logs.push(payload);
      })
      .addCase(addLog.rejected, (state, action) => {
        state.error = action.error.statusText;
      });
    builder
      .addCase(deleteLog.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.logs = state.logs.filter(log => log._id !== payload);
      })
      .addCase(deleteLog.rejected, (state, action) => {
        state.error = action.error.statusText;
      });
    builder
      .addCase(updateLog.fulfilled, (state, {payload}) => {
        console.log(payload.data);
        state.loading = false;
        state.logs = state.logs.map(log =>
          log._id === payload.data.data._id ? payload.data.data : log
        );
      })
      .addCase(updateLog.rejected, (state, action) => {
        state.error = action.error.statusText;
      });
    builder.addCase(searchLogs.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.logs = payload;
    });
  },
});

export const {setCurrent, clearCurrent} = logSlice.actions;
export default logSlice.reducer;
