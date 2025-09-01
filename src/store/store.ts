"use client";
import { configureStore } from "@reduxjs/toolkit";
import storefrontReducer from "@/slices/storefrontSlice";
import actionReducer from "@/slices/actionSlice";

export const store = configureStore({
	reducer: {
		action: actionReducer,
		storefront: storefrontReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
