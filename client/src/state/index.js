import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  userId: null, // Initialize userId as null
  isAuthenticated: false, // Initialize the isAuthenticated state
  isSideBarOpen: true,
  isAttachmentOpen: false,
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
    setIsSideBarOpen: (state, action) => {
      state.isSideBarOpen = action.payload; // Add a new reducer to update isSideBarOpen
    },
    setIsAttachmentOpen: (state, action) => {
      state.isAttachmentOpen = action.payload; // Add a new reducer to update isSideBarOpen
    },
  },
});

export const {
  setMode,
  setUserId,
  setIsAuthenticated,
  setIsSideBarOpen,
  setIsAttachmentOpen,
} = globalSlice.actions;

// Selector to get the isAuthenticated value
export const selectIsAuthenticated = (state) => state.global.isAuthenticated;
export const selectIsSideBarOpen = (state) => state.global.isSideBarOpen; // Add a selector for isSideBarOpen
export const selectIsAttachmentOpen = (state) => state.global.isAttachmentOpen; // Add a selector for isSideBarOpen

export default globalSlice.reducer;
