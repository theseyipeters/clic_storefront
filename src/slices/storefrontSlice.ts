/* eslint-disable @typescript-eslint/no-explicit-any */
import API from "@/lib/axios";
import { CartItem, Product } from "@/types/inventory";
import { BrandingConfig, Vendor } from "@/types/vendor";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const fallbackConfig = {
	logo_url: "/fallback-logo.png",
	primary_color: "#000000",
	secondary_color: "#FFFFFF",
	theme: "classic",
	font_family: "Inter",
	favicon_url: "/",
};

interface StorefrontState {
	vendor: Vendor | null;
	branding: BrandingConfig;
	products: Product[] | null;
	cartItems: CartItem[];
	currentSubdomain: string | null;
	loading: boolean;
	error: string | null;
}

const initialState: StorefrontState = {
	vendor: null,
	branding: fallbackConfig,
	products: null,
	cartItems: [],
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

const storefrontSlice = createSlice({
	name: "storefront",
	initialState,
	reducers: {
		setCurrentSubdomain: (state, action: PayloadAction<string>) => {
			state.currentSubdomain = action.payload;
		},

		clearError: (state) => {
			state.error = null;
		},
		clearBranding: (state) => {
			state.branding = fallbackConfig;
		},

		addToCart: (state, action: PayloadAction<CartItem>) => {
			const existing = state.cartItems?.find(
				(item) => item.id === action.payload.id
			);
			if (existing) {
				existing.quantity += action.payload.quantity;
			} else {
				state.cartItems?.push(action.payload);
			}
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.cartItems = state.cartItems.filter(
				(item) => item.id !== action.payload
			);
		},
		updateQuantity: (
			state,
			action: PayloadAction<{ id: string; quantity: number }>
		) => {
			const item = state.cartItems?.find((i) => i.id === action.payload.id);
			if (item) item.quantity = action.payload.quantity;
		},
		clearCart: (state) => {
			state.cartItems = [];
		},
		setCart: (state, action: PayloadAction<CartItem[]>) => {
			state.cartItems = action.payload;
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

export const {
	setCurrentSubdomain,
	clearError,
	clearBranding,
	setCart,
	updateQuantity,
	clearCart,
	removeFromCart,
	addToCart,
} = storefrontSlice.actions;

export default storefrontSlice.reducer;
