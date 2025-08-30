/* eslint-disable @typescript-eslint/no-explicit-any */
import API from "@/lib/axios";
import { Product } from "@/types/inventory";
import { Vendor } from "@/types/vendor";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface BrandingConfig {
	font_family: string;
	theme: string;
	logo_url: string | null;
	favicon_url: string | null;
	primary_color: string;
	secondary_color: string;
}

const fallbackConfig = {
	logo_url: "/fallback-logo.png",
	primary_color: "#000000",
	secondary_color: "#FFFFFF",
	theme: "classic",
	font_family: "Inter",
	favicon_url: "/",
};

interface BrandingState {
	vendor: Vendor | null;
	branding: BrandingConfig;
	products: Product[] | null;
	currentSubdomain: string | null;
	loading: boolean;
	error: string | null;
}

const initialState: BrandingState = {
	vendor: null,
	branding: fallbackConfig,
	products: null,
	currentSubdomain: null,
	loading: false,
	error: null,
};

export const getBrandingConfig = createAsyncThunk(
	"branding/getBranding",
	async (subdomain: string, { rejectWithValue }) => {
		try {
			const response = await API.get(`/branding/${subdomain}`);
			console.log("Branding API response:", response);
			return response.data;
		} catch (error: any) {
			console.error("Branding API error:", error);
			return rejectWithValue(
				error.response?.data?.message || "Failed to fetch branding config"
			);
		}
	}
);
export const getStoreInventory = createAsyncThunk(
	"branding/getStoreInventory",
	async (subdomain: string, { rejectWithValue }) => {
		try {
			const { data } = await API.get(`/products/${subdomain}`);
			console.log("Products response:", data);
			return data.products;
		} catch (error: any) {
			console.error("Error fetching products:", error);
			return rejectWithValue(
				error.response?.data?.message || "Failed to fetch products"
			);
		}
	}
);

const brandingSlice = createSlice({
	name: "branding",
	initialState,
	reducers: {
		setCurrentSubdomain: (state, action: PayloadAction<string>) => {
			state.currentSubdomain = action.payload;
		},
		clearError: (state) => {
			state.error = null;
		},
		// Add action to clear branding when subdomain changes
		clearBranding: (state) => {
			state.branding = fallbackConfig;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getBrandingConfig.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getBrandingConfig.fulfilled, (state, action) => {
				state.loading = false;
				state.branding = action.payload.branding_config;
				state.vendor = action.payload.vendor;
				state.error = null;
			})
			.addCase(getBrandingConfig.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				console.error("Failed to fetch branding config:", action.payload);
			})
			.addCase(getStoreInventory.fulfilled, (state, action) => {
				state.products = action.payload;
			});
	},
});

export const { setCurrentSubdomain, clearError, clearBranding } =
	brandingSlice.actions;

// Selectors
export const selectCurrentBrandingConfig = (state: {
	branding: BrandingState;
}) => state.branding.branding;

export const selectBrandingLoading = (state: { branding: BrandingState }) =>
	state.branding.loading;

export const selectBrandingError = (state: { branding: BrandingState }) =>
	state.branding.error;

export const selectCurrentSubdomain = (state: { branding: BrandingState }) =>
	state.branding.currentSubdomain;

export default brandingSlice.reducer;
