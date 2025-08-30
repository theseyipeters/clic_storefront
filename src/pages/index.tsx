import { useAppSelector } from "@/store/hooks";
import { useThemePages } from "../components/providers/ComponentProvider";

export default function HomePage() {
	const { branding } = useAppSelector((state) => state.storefront);
	const { Home } = useThemePages();

	return <Home brandingConfig={branding} />;
}
