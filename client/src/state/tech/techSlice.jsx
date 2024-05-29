import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
  techs: "",
  loading: false,
  error: null,
};

// Get techs from server
export const getTechs = createAsyncThunk("techs/getTechs", async () => {
  const response =
    process.env.REACT_APP_ENV !== "production"
      ? await fetch("/techs")
      : await fetch(`${process.env.REACT_APP_BACKEND_URL}/techs`);
  const jsonData = await response.json();
  return jsonData;
});

// Add new technician to server
export const addTech = createAsyncThunk("techs/addTech", async tech => {
  const response =
    process.env.REACT_APP_ENV !== "production"
      ? await fetch("/techs", {
          method: "POST",
          body: JSON.stringify(tech),
          headers: {
            "Content-Type": "application/json",
          },
        })
      : await fetch(`${process.env.REACT_APP_BACKEND_URL}/techs`, {
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
  process.env.REACT_APP_ENV !== "production"
    ? await fetch(`/techs/${id}`, {
        method: "DELETE",
      })
    : await fetch(`${process.env.REACT_APP_BACKEND_URL}/techs/${id}`, {
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
        state.techs = action.payload.techsData;
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
        state.techs = state.techs.filter(tech => tech._id !== action.payload);
      })
      .addCase(deleteTech.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.statusText;
      });
  },
});

export default techSlice.reducer;
