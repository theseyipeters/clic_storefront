import { useAppDispatch } from "@/store/hooks";
import { Product } from "@/types/inventory";
import { Skeleton } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import AddToCartButton from "./common/AddToCartButton/AddToCartButton";
import Amount from "./common/Amount/Amount";

type ProductCardProps = {
	product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);

	return (
		<div className="bg-white p-3 rounded-2xl">
			{product.images && (
				<div className="bg-gray-200 h-[250px] mb-4 rounded-lg overflow-hidden relative">
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

			<div className="relative">
				<div className="absolute right-0 -top-[50px] z-50">
					<AddToCartButton product={product} />
				</div>
				<div className="flex items-end justify-between gap-2">
					<Link href={`${window.location.origin}/inventory/p/${product.slug}`}>
						<Amount
							fw={700}
							fz={18}
							c={"black"}
							value={product.pricing.final_price}
						/>
					</Link>
				</div>
				<Link href={`${window.location.origin}/inventory/p/${product.slug}`}>
					<h3 className="text-sm text-[#4a5565] font-medium">{product.name}</h3>
				</Link>
			</div>
		</div>
	);
}
