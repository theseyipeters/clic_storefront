import { BrandingConfig } from "@/types/theme";
import { Header } from "./Header";
import { Footer } from "./Footer";
import CartDrawer from "./modals/CartDrawer/CartDrawer";

interface ClassicLayoutProps {
	children: React.ReactNode;
	brandingConfig: BrandingConfig;
}

export function Layout({ children, brandingConfig }: ClassicLayoutProps) {
	return (
		<>
			<div className="flex flex-col min-h-screen relative ">
				<div className="fixed w-full z-10">
					<Header brandingConfig={brandingConfig} />
				</div>
				<div className="flex-grow mt-[80px] relative bg-[#f0f0f0]">
					{children}
				</div>
				<Footer />
			</div>

			<CartDrawer />
		</>
	);
}
