import React, { createContext, useContext } from "react";
import { useAppSelector } from "@/store/hooks";
import { getTheme, Theme } from "@/themes";
import { Center, Loader, LoadingOverlay } from "@mantine/core";
import { BrandingConfig } from "@/types/theme";

interface ComponentContextType {
	theme: Theme | null;
	brandingConfig: BrandingConfig | null;
	loading: boolean;
	error: string | null;
}

const ComponentContext = createContext<ComponentContextType>({
	theme: null,
	brandingConfig: null,
	loading: false,
	error: null,
});

export function ComponentProvider({ children }: { children: React.ReactNode }) {
	const {
		branding: brandingConfig,
		loading,
		error,
	} = useAppSelector((state) => state.storefront);

	const theme = brandingConfig.theme ? getTheme(brandingConfig.theme) : null;

	if (loading) {
		return (
			<Center my={400}>
				<Loader
					color={brandingConfig.primary_color}
					size={"sm"}
				/>
			</Center>
		);
	}

	return (
		<ComponentContext.Provider
			value={{
				theme,
				brandingConfig,
				loading,
				error,
			}}>
			{children}
		</ComponentContext.Provider>
	);
}

export const useThemeComponents = () => {
	const context = useContext(ComponentContext);

	if (context.error) {
		throw new Error(`Theme loading failed: ${context.error}`);
	}

	if (!context.theme) {
		throw new Error("Theme not loaded or invalid theme specified");
	}

	return {
		...context.theme.components,
		brandingConfig: context.brandingConfig,
	};
};

export const useThemePages = () => {
	const context = useContext(ComponentContext);

	if (context.error) {
		throw new Error(`Theme loading failed: ${context.error}`);
	}

	if (!context.theme) {
		throw new Error("Theme not loaded or invalid theme specified");
	}

	return {
		...context.theme.pages,
		brandingConfig: context.brandingConfig,
	};
};

// Additional hook for checking theme state
export const useThemeState = () => {
	const context = useContext(ComponentContext);
	return {
		loading: context.loading,
		error: context.error,
		hasTheme: !!context.theme,
		brandingConfig: context.brandingConfig,
	};
};
