"use client";
import { configureStore } from "@reduxjs/toolkit";
import brandingReducer from "@/slices/brandingSlice";
import storefrontReducer from "@/slices/storefrontSlice";

export const store = configureStore({
	reducer: {
		branding: brandingReducer,
		storefront: storefrontReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
