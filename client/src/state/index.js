import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  token: null,
  user_id: null, // Initialize userId as null
  company_id: null,
  isAuthenticated: false, // Initialize the isAuthenticated state
  isSideBarOpen: true,
  isAttachmentOpen: false,
  isDiaryOpen: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = action.payload !== null; // Update isAuthenticated based on the presence of userId
    },
    setCompanyId: (state, action) => {
      state.company_id = action.payload;
    },
    setUserId: (state, action) => {
      state.user_id = action.payload;
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
    setIsDiaryOpen: (state, action) => {
      state.isDiaryOpen = action.payload; // Add a new reducer to update isSideBarOpen
    },
  },
});

export const {
  setMode,
  setToken,
  setCompanyId,
  setUserId,
  setIsAuthenticated,
  setIsSideBarOpen,
  setIsAttachmentOpen,
  setIsDiaryOpen,
} = globalSlice.actions;

export const selectToken = (state) => state.global.token;
export const selectIsAuthenticated = (state) => state.global.isAuthenticated;
export const selectIsSideBarOpen = (state) => state.global.isSideBarOpen; // Add a selector for isSideBarOpen
export const selectIsAttachmentOpen = (state) => state.global.isAttachmentOpen; // Add a selector for isSideBarOpen
export const selectIsDiaryOpen = (state) => state.global.isDiaryOpen; // Add a selector for isSideBarOpen

export default globalSlice.reducer;
