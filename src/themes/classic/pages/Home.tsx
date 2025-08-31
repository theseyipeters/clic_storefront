import { useState } from "react";
import { Text, Box, Tabs, Paper } from "@mantine/core";
import styles from "../styles/classic.module.css";
import { BrandingConfig } from "@/types/theme";
import { useAppSelector } from "@/store/hooks";
import ProductCard from "../components/ProductCard";
import { productCategories } from "@/data/inventoryData";
import Link from "next/link";

interface ClassicHomeProps {
	brandingConfig: BrandingConfig;
}

export function Home({ brandingConfig }: ClassicHomeProps) {
	const [activeTab, setActiveTab] = useState<string | null>("all");
	const branding = brandingConfig;
	const { vendor, products } = useAppSelector((state) => state.storefront);
	return (
		<main className="">
			{/* =======  Banner ======= */}
			<Box
				h={400}
				w={"100%"}
				className="flex flex-col items-center justify-center"
				bg={branding.primary_color}>
				<Text
					c={"white"}
					fz={50}
					fw={700}>
					Welcome to {vendor?.store_name}!
				</Text>
				<Text
					c={"white"}
					fz={20}>
					{vendor?.store_description}
				</Text>
			</Box>

			{/* ========= Products ========= */}
			<div className="mt-[60px] mb-[120px] max-w-[1280px] px-[15px] 2xl:px-0 mx-auto">
				{/* ====== Sort categories filter */}
				<div className="w-full flex items-center justify-between">
					<Box>
						<Tabs
							classNames={{
								tab: styles.tab,
							}}
							value={activeTab}
							onChange={setActiveTab}
							variant="pills"
							defaultValue="all">
							<Tabs.List>
								<Tabs.Tab value="all">All</Tabs.Tab>
								{productCategories.slice(0, 4).map((item, index) => (
									<Tabs.Tab
										key={index}
										value={item.value}>
										{item.label}
									</Tabs.Tab>
								))}
							</Tabs.List>
						</Tabs>
					</Box>
					<div></div>
				</div>

				{/* ========= products ===== */}
				<div className="mt-[50px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-10 max-w-[1280px] mx-auto">
					{products?.map((product, idx) => (
						<ProductCard
							key={idx}
							product={product}
						/>
					))}
				</div>
			</div>
		</main>
	);
}
