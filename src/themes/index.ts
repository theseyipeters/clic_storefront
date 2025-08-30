import { ComponentType } from "react";
import { BrandingConfig } from "@/types/theme";
// Classic theme imports
import * as ClassicComponents from "./classic/components";
import * as ClassicPages from "./classic/pages";

// Future themes can be imported here
// import * as ModernComponents from './modern/components';
// import * as ModernPages from './modern/pages';

export interface ThemeComponents {
	Layout: ComponentType<{
		children: React.ReactNode;
		brandingConfig: BrandingConfig;
	}>;
	Header: ComponentType<{ brandingConfig: BrandingConfig }>;
	Footer: ComponentType<{ brandingConfig: BrandingConfig }>;
}

export interface ThemePages {
	Product: ComponentType<{ productId: string; brandingConfig: BrandingConfig }>;
	Checkout: ComponentType<{ brandingConfig: BrandingConfig }>;
	Home: ComponentType<{ brandingConfig: BrandingConfig }>;
}

export interface Theme {
	components: ThemeComponents;
	pages: ThemePages;
}

const themeRegistry: Record<string, Theme> = {
	classic: {
		components: ClassicComponents,
		pages: ClassicPages,
	},
	// modern: {
	//   components: ModernComponents,
	//   pages: ModernPages,
	// },
};

export const getTheme = (themeName: string): Theme | null => {
	return themeRegistry[themeName] || null;
};

export const getAvailableThemes = (): string[] => {
	return Object.keys(themeRegistry);
};
