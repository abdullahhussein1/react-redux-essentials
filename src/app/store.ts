import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import notificationsReducer from "@/features/notifications/notificationsSlice";
import { apiSlice } from "@/features/api/apiSlice";
import { listenerMiddleware } from "./listenerMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(apiSlice.middleware);
  },
});

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>;
