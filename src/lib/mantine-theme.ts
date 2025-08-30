import { BrandingConfig } from "@/types/theme";
import { MantineThemeOverride } from "@mantine/core";

export function createMantineTheme(
	brandingConfig: BrandingConfig | null
): MantineThemeOverride {
	if (!brandingConfig) {
		return {};
	} else {
		console.log("BRANDING CONFIG", brandingConfig);

		return {
			fontFamily: `${brandingConfig?.font_family!}, sans-serif`,
			colors: {
				brand: [
					brandingConfig.primary_color + "10", // Lightest
					brandingConfig.primary_color + "20",
					brandingConfig.primary_color + "30",
					brandingConfig.primary_color + "40",
					brandingConfig.primary_color + "50",
					brandingConfig.primary_color, // Base color
					brandingConfig.primary_color + "70",
					brandingConfig.primary_color + "80",
					brandingConfig.primary_color + "90",
					brandingConfig.primary_color + "FF", // Darkest
				],
			},
			primaryColor: "brand",
			components: {
				Button: {
					styles: {
						root: {
							'&[dataVariant="filled"]': {
								backgroundColor: brandingConfig.primary_color,
								"&:hover": {
									backgroundColor: brandingConfig.primary_color + "DD",
								},
							},
						},
					},
				},
			},
		};
	}
}
