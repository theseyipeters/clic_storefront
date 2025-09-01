import { useThemePages } from "@/components/providers/ComponentProvider";
import { useAppSelector } from "@/store/hooks";

export default function CartPage() {
	const { branding } = useAppSelector((state) => state.storefront);
	const { Cart } = useThemePages();

	return <Cart brandingConfig={branding} />;
}
