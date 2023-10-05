import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: null,
  email: null,
  password: "mudar@123",
  role: null,
};

export const setUserSlice = createSlice({
  name: "addUser",
  initialState,
  reducers: {
    setSelectedUser(state, { payload }) {
      return { ...state, ...payload };
    },
    clearSelectedUser(state) {
      return { initialState };
    },
  },
});

export const { setSelectedUser, clearSelectedUser } = setUserSlice.actions;

export const selectedUser = (state) => state.userData;

export default setUserSlice.reducer;
