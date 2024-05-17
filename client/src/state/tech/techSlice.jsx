import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
  techs: [],
  loading: false,
  error: null,
};

// Get techs from server
export const getTechs = createAsyncThunk("techs/getTechs", async () => {
  const response = await fetch("/techs");
  const jsonData = await response.json();
  return jsonData;
});

// Add new technician to server
export const addTech = createAsyncThunk("techs/addTech", async tech => {
  const response = await fetch("/techs", {
    method: "POST",
    body: JSON.stringify(tech),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonData = await response.json();
  return jsonData;
});

// Delete technician from server
export const deleteTech = createAsyncThunk("techs/deleteTech", async id => {
  await fetch(`/techs/${id}`, {
    method: "DELETE",
  });

  return id;
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
    builder
      .addCase(addTech.fulfilled, (state, action) => {
        state.loading = false;
        state.techs.push(action.payload);
      })
      .addCase(addTech.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.statusText;
      });
    builder
      .addCase(deleteTech.fulfilled, (state, action) => {
        state.loading = false;
        state.techs = state.techs.filter(tech => tech.id !== action.payload);
      })
      .addCase(deleteTech.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.statusText;
      });
  },
});

export default techSlice.reducer;