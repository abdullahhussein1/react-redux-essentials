import { createListenerMiddleware, addListener } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "./store";
import { apiSlice } from "@/features/api/apiSlice";

export const addPostsListeners = (startAppListening: AppStartListening) => {
  startAppListening({
    matcher: apiSlice.endpoints.addNewPost.matchFulfilled,
    effect: async (action, listenerApi) => {
      const { toast } = await import("react-tiny-toast");

      const toastId = toast.show("New post added!", {
        variant: "success",
        position: "bottom-right",
        pause: true,
      });

      await listenerApi.delay(5000);
      toast.remove(toastId);
    },
  });
};

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();
export type AppStartListening = typeof startAppListening;

export const addAppListener = addListener.withTypes<RootState, AppDispatch>();
export type AppAddListener = typeof addAppListener;

addPostsListeners(startAppListening);
