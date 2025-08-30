// import { getFromCookies } from "@/helpers";
import { Product } from "@/types/inventory";
import { BrandingConfig } from "@/types/theme";
import { SocialLinks, StorePolicies } from "@/types/vendor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fallbackConfig = {
	logo_url: "/fallback-logo.png",
	primary_color: "#000000",
	secondary_color: "#FFFFFF",
	theme: "classic",
	font_family: "Inter",
	favicon_url: null,
};

export interface Vendor {
	store_name: string;
	slug: string;
	store_description?: string;
	email_address?: string;
	phone_number?: string;
	whatsapp_number?: string;
	branding_config: BrandingConfig;
	social_links: SocialLinks;
	store_policies: StorePolicies;
}

interface StorefrontState {
	vendor: Vendor | null;
	branding: BrandingConfig | null;
	products: Product[] | null;
}

const initialState: StorefrontState = {
	vendor: null,
	branding: null,
	products: null,
};

const storefrontSlice = createSlice({
	name: "storefront",
	initialState,
	reducers: {
		setVendor: (state, action) => {
			state.vendor = action.payload;
		},
		setBranding: (state, action) => {
			state.branding = action.payload;
		},
		setProducts: (state, action) => {
			state.products = action.payload;
		},
	},
});

export const { setBranding, setProducts, setVendor } = storefrontSlice.actions;
export default storefrontSlice.reducer;
