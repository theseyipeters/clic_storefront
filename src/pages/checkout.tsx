import { useThemePages } from "@/components/providers/ComponentProvider";
import { useAppSelector } from "@/store/hooks";

export default function CheckoutPage() {
	const { branding } = useAppSelector((state) => state.storefront);
	const { Checkout } = useThemePages();

	return <Checkout brandingConfig={branding} />;
}
