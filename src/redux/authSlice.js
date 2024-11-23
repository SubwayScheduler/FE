import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: localStorage.getItem("id") || null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.token = action.payload.token;

      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.id = null;
      state.token = null;

      localStorage.removeItem("id");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
