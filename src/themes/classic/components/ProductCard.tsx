import Amount from "@/components/common/Amount/Amount";
import { Product } from "@/types/inventory";
import { Button, Skeleton } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

type ProductCardProps = {
	product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);

	return (
		<div className="">
			{product.images && (
				<div className="bg-white h-[350px] mb-4 rounded-lg overflow-hidden relative">
					{!imageLoaded && !imageError && (
						<Skeleton
							height="100%"
							width="100%"
							radius="lg"
						/>
					)}
					<img
						src={product.images[0]}
						alt={product.name}
						className={`mb-2 w-full h-full object-cover transition-opacity duration-300 ${
							imageLoaded ? "opacity-100" : "opacity-0"
						}`}
						onLoad={() => setImageLoaded(true)}
						onError={() => setImageError(true)}
						style={{ display: imageError ? "none" : "block" }}
					/>
					{imageError && (
						<div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
							Failed to load image
						</div>
					)}
				</div>
			)}
			<Link href={`${window.location.origin}/inventory/p/${product.slug}`}>
				<h3 className="text-lg text-gray-600 font-medium">{product.name}</h3>
			</Link>
			<div className="flex items-end justify-between gap-2 mt-4">
				<Amount
					fw={600}
					fz={18}
					c={"black"}
					value={product.pricing.final_price}
				/>

				<Button
					h={40}
					fz={12}
					radius={50}>
					Add to Cart
				</Button>
			</div>
		</div>
	);
}
