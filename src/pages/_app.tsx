/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@mantine/core/styles.css";
import { Provider } from "react-redux";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import {
	ComponentProvider,
	useThemeComponents,
} from "../components/providers/ComponentProvider";
import { store } from "@/store/store";
import { useAppSelector } from "@/store/hooks";
import CartPersistence from "@/components/utils/CartPersistence";

interface CustomAppProps extends AppProps {
	subdomain: string;
}

interface AppWithLayoutProps {
	Component: AppProps["Component"];
	pageProps: AppProps["pageProps"];
}

function AppWithLayout({ Component, pageProps }: AppWithLayoutProps) {
	const { Layout } = useThemeComponents();
	const { branding: brandingConfig } = useAppSelector(
		(state) => state.storefront
	);

	return (
		<Layout brandingConfig={brandingConfig}>
			<Component {...pageProps} />
		</Layout>
	);
}

export default function App({
	Component,
	pageProps,
	subdomain,
}: CustomAppProps) {
	return (
		<Provider store={store}>
			<CartPersistence />
			<ThemeProvider subdomain={subdomain}>
				<ComponentProvider>
					<AppWithLayout
						Component={Component}
						pageProps={pageProps}
					/>
				</ComponentProvider>
			</ThemeProvider>
		</Provider>
	);
}

App.getInitialProps = async (ctx: any) => {
	const subdomain = ctx.ctx.req?.headers["x-subdomain"] || "";
	return { subdomain };
};
