import { CartItem as ICartItem } from "@/types/inventory";
import { Group, Image, Text, NumberInput, Stack, Badge } from "@mantine/core";
import { useAppDispatch } from "@/store/hooks";
import { removeFromCart, updateQuantity } from "@/slices/storefrontSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import Amount from "../../Amount/Amount";

interface CartItemProps {
	cart: ICartItem;
	isLast: boolean;
}

export default function CartItem({ cart, isLast }: CartItemProps) {
	const dispatch = useAppDispatch();

	const handleRemove = () => {
		dispatch(removeFromCart(cart.id));
	};

	const handleQuantityChange = (value: number | string) => {
		const qty = typeof value === "string" ? parseInt(value) : value;
		if (!isNaN(qty) && qty > 0) {
			dispatch(updateQuantity({ id: cart.id, quantity: qty }));
		}
	};

	return (
		<Group
			pos={"relative"}
			w={"100%"}
			gap="md"
			align="flex-start"
			py="md"
			px="sm"
			className={!isLast ? "border-b border-gray-200" : ""}
			wrap="nowrap">
			{/* Thumbnail */}
			<Image
				src={cart.image}
				alt={cart.name}
				w={80}
				h={80}
				fit="cover"
				radius="md"
			/>

			{/* Product Info */}

			<Stack
				gap={0}
				className="flex-1">
				<div className="flex-1">
					<Text
						truncate
						lineClamp={2}
						w={250}
						fw={500}
						size="sm">
						{cart.name}
					</Text>
					<Text
						size="xs"
						c="dimmed">
						{cart.sku}
					</Text>
					<div className="flex items-center w-full justify-between mt-2">
						{/* Quantity Controls */}
						<NumberInput
							value={cart.quantity}
							min={1}
							size="xs"
							onChange={handleQuantityChange}
							style={{ width: 70 }}
						/>
						<div className="flex flex-col items-end">
							<div className="flex items-center gap-2 mb-1">
								{cart.discountType !== "none" && (
									<Badge
										variant="outline"
										fw={400}
										size="sm"
										color="green">
										-{cart.discountValue}%
									</Badge>
								)}
								<Amount
									fw={cart.discountType !== "none" ? 400 : 600}
									opacity={cart.discountType !== "none" ? 0.4 : 1}
									value={
										cart.discountType !== "none"
											? cart.original_price
											: cart.price
									}
									isDiscounted={cart.discountType !== "none"}
								/>
							</div>
							{cart.discountType !== "none" && (
								<Amount
									fw={600}
									value={cart.price}
								/>
							)}
						</div>
					</div>
				</div>
				<div className="absolute right-0 top-0 ">
					{/* Remove Button */}
					<button
						className="w-fit cursor-pointer"
						onClick={handleRemove}>
						<Icon
							icon={"mynaui:trash"}
							fontSize={20}
							color="red"
						/>
					</button>
				</div>
			</Stack>
		</Group>
	);
}
