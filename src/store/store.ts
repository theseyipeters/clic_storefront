"use client";
import { configureStore } from "@reduxjs/toolkit";
import storefrontReducer from "@/slices/storefrontSlice";

export const store = configureStore({
	reducer: {
		storefront: storefrontReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
