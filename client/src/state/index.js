import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  userId: null, // Initialize userId as null
  isAuthenticated: false, // Initialize the isAuthenticated state
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      state.isAuthenticated = action.payload !== null; // Update isAuthenticated based on the presence of userId
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setMode, setUserId, setIsAuthenticated } = globalSlice.actions;

// Selector to get the isAuthenticated value
export const selectIsAuthenticated = (state) => state.global.isAuthenticated;

export default globalSlice.reducer;
