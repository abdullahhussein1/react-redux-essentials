import { client } from "@/api/client";
import { RootState } from "@/app/store";
import { createAppAsyncThunk } from "@/app/withTypes";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  username: string | null;
}

const initialState: AuthState = {
  username: null,
};

export const login = createAppAsyncThunk(
  "auth/login",
  async (username: string) => {
    await client.post("/fakeApi/login", { username });
    return username;
  }
);

export const logout = createAppAsyncThunk("auth/logout", async () => {
  await client.post("/fakeApi/logout", {});
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.username = null;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUsername = (state: RootState) => state.auth.username;
