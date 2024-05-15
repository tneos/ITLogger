import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
  techs: [],
  loading: false,
  error: null,
};

// Get techs from server
export const getTechs = createAsyncThunk("logs/getTechs", async () => {
  const response = await fetch("/techs");
  const jsonData = await response.json();
  return jsonData;
});

export const techSlice = createSlice({
  name: "tech",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTechs.pending, state => {
        state.loading = true;
      })
      .addCase(getTechs.fulfilled, (state, action) => {
        state.loading = false;
        state.techs = action.payload;
      })
      .addCase(getTechs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.statusText;
      });
  },
});

export default techSlice.reducer;
