import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
import { AuthState, selectCurrentUsername } from "../auth/authSlice";

interface User {
  id: string;
  name: string;
}

const initialState: User[] = [
  { id: "0", name: "Ahmed Muhammed" },
  { id: "1", name: "Hoshang Khidr" },
  { id: "2", name: "Muhammed Yasin" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;

export const selectAllUsers = (state: RootState) => state.users;

export const selectUserById = (state: RootState, userName: string) =>
  state.users.find((user) => user.id === userName);

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state);
  if (!currentUsername) return;
  return selectUserById(state, currentUsername);
};
