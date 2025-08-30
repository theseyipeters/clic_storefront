import { BrandingConfig } from "@/types/theme";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface ClassicLayoutProps {
	children: React.ReactNode;
	brandingConfig: BrandingConfig;
}

export function Layout({ children, brandingConfig }: ClassicLayoutProps) {
	return (
		<>
			<div className="flex flex-col min-h-screen relative">
				<div className="fixed w-full z-10">
					<Header brandingConfig={brandingConfig} />
				</div>
				<div className="flex-grow mt-[80px] relative">{children}</div>
				<Footer />
			</div>
		</>
	);
}
