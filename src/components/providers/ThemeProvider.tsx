import { useEffect } from "react";
import { MantineProvider, ColorSchemeScript, createTheme } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	setCurrentSubdomain,
	getBrandingConfig,
	getStoreInventory,
} from "@/slices/storefrontSlice";
import { generateColors } from "@mantine/colors-generator";
import { HelmetProvider } from "react-helmet-async";

interface ThemeProviderProps {
	children: React.ReactNode;
	subdomain: string;
}

export function ThemeProvider({ children, subdomain }: ThemeProviderProps) {
	const dispatch = useAppDispatch();
	const { branding, loading, error, vendor } = useAppSelector(
		(state) => state.storefront
	);

	// Fetch branding config for current subdomain
	useEffect(() => {
		if (subdomain && branding.favicon_url === "/") {
			dispatch(setCurrentSubdomain(subdomain));
			dispatch(getBrandingConfig(subdomain));
			dispatch(getStoreInventory(subdomain));
		}
	}, [subdomain, dispatch]);

	// Update favicon dynamically
	useEffect(() => {
		if (branding?.favicon_url) {
			console.log("ThemeProvider - Updating favicon:", branding.favicon_url);
			const favicon = document.querySelector(
				"link[rel*='icon']"
			) as HTMLLinkElement;
			if (favicon) {
				favicon.href = branding.favicon_url;
			} else {
				// Create favicon link if it doesn't exist
				const newFavicon = document.createElement("link");
				newFavicon.rel = "icon";
				newFavicon.href = branding.favicon_url;
				document.head.appendChild(newFavicon);
			}
		}
	}, [branding?.favicon_url]);

	// Update document title
	useEffect(() => {
		if (subdomain && branding) {
			const title = vendor?.store_name || "";
			document.title = title;
		}
	}, [subdomain, branding]);

	const primaryColorName = "branding";
	const primaryHex = branding.primary_color!;
	const brandingColorScale = generateColors(primaryHex!);

	const themeObject = createTheme({
		fontFamily: `${branding.font_family!}, sans-serif`,
		colors: {
			[primaryColorName]: brandingColorScale,
		},
		primaryColor: primaryColorName,
	});
	// Show loading state
	if (loading && !branding) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}>
				Loading theme...
			</div>
		);
	}

	// Show error state
	if (error && !branding) {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}>
				<h2>Failed to load theme</h2>
				<p>{error}</p>
				<button
					onClick={() => subdomain && dispatch(getBrandingConfig(subdomain))}
					style={{
						padding: "8px 16px",
						background: "#3b82f6",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}>
					Retry
				</button>
			</div>
		);
	}

	return (
		<>
			<HelmetProvider>
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"
				/>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Geist:wght@100..900&family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..1000&family=Mozilla+Text:wght@200..700&family=Rubik:ital,wght@0,300..900;1,300..900&family=Space+Grotesk:wght@300..700&display=swap"
					rel="stylesheet"
				/>
				{/* This script ensures system/browser theme preference syncs */}
				<ColorSchemeScript defaultColorScheme="light" />

				<MantineProvider
					theme={themeObject}
					defaultColorScheme="light">
					{children}
				</MantineProvider>
			</HelmetProvider>
		</>
	);
}
