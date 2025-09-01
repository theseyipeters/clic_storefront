import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/slices/storefrontSlice";
import { toCartItem } from "@/lib/helpers/helper";
import { Product } from "@/types/inventory";
import { ActionIcon, Indicator } from "@mantine/core";
import { Icon } from "@iconify/react/dist/iconify.js";

type AddToCartButtonProps = {
	product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
	const dispatch = useAppDispatch();
	const { cartItems, branding } = useAppSelector((state) => state.storefront);
	const cartItem = cartItems.find((item) => item.id === product.id);
	const isInCart = cartItems.some((item) => item.id === product.id);

	const handleAddToCart = () => {
		const newCartItem = toCartItem(product, 1);
		dispatch(addToCart(newCartItem));
	};

	return isInCart ? (
		<div className="border-4 border-white rounded-full">
			<Indicator
				autoContrast
				inline
				color="gray"
				size={16}
				offset={4}
				label={cartItem?.quantity}>
				<ActionIcon
					autoContrast
					bg={branding.primary_color}
					w={45}
					h={45}
					onClick={handleAddToCart}
					radius={200}>
					<Icon
						icon={"solar:bag-3-bold"}
						fontSize={25}
					/>
				</ActionIcon>
			</Indicator>
		</div>
	) : (
		<div className="border-4 border-white rounded-full">
			<ActionIcon
				autoContrast
				bg={branding.primary_color}
				w={45}
				h={45}
				onClick={handleAddToCart}
				radius={200}>
				<Icon
					icon={"solar:bag-3-bold"}
					fontSize={25}
				/>
			</ActionIcon>
		</div>
	);
}
