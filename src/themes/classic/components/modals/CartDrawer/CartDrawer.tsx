import { toggleCartDrawer } from "@/slices/actionSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	Drawer,
	ScrollArea,
	Stack,
	Text,
	Group,
	Divider,
	Button,
} from "@mantine/core";
import CartItem from "../../common/Cart/CartItem/CartItem";
import Link from "next/link";

export default function CartDrawer() {
	const dispatch = useAppDispatch();
	const { cartItems } = useAppSelector((state) => state.storefront);
	const { cartDrawer } = useAppSelector((state) => state.action);

	// Calculate total price
	const total = cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	return (
		<Drawer
			opened={cartDrawer}
			position="right"
			size={"25%"}
			overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
			scrollAreaComponent={ScrollArea.Autosize}
			title={
				<Text
					fz={20}
					fw={600}>
					Cart
				</Text>
			}
			onClose={() => dispatch(toggleCartDrawer(false))}>
			<Stack
				gap="md"
				h="100%"
				pos={"relative"}>
				{/* Cart items */}
				{cartItems.length > 0 ? (
					<Stack
						gap="sm"
						flex={1}>
						{cartItems.map((item, idx) => (
							<CartItem
								cart={item}
								key={item.id}
								isLast={idx === cartItems.length - 1}
							/>
						))}
					</Stack>
				) : (
					<Text
						c="dimmed"
						ta="center"
						mt="xl">
						Your cart is empty 🛒
					</Text>
				)}

				{/* Divider + Footer */}
				{cartItems.length > 0 && (
					<Stack
						gap={0}
						mt={20}>
						<Divider />

						<Group
							mt={20}
							justify="space-between">
							<Text fw={600}>Total:</Text>
							<Text fw={700}>₦{total.toLocaleString()}</Text>
						</Group>
						<Group
							justify="space-between"
							mt={5}>
							<Text
								size="sm"
								c="dimmed"
								fw={400}>
								Delivery fee:
							</Text>
							<Text
								size="sm"
								c="dimmed"
								fw={400}>
								₦1,000
							</Text>
						</Group>

						<Stack
							mt={20}
							gap={10}>
							<Button
								component={Link}
								href={"/cart"}
								autoContrast
								h={50}
								variant="outline"
								fullWidth>
								View Cart
							</Button>
							<Button
								autoContrast
								h={50}
								fw={500}
								fullWidth
								onClick={() => {
									console.log("Proceed to checkout");
								}}>
								Proceed to Checkout
							</Button>
						</Stack>
					</Stack>
				)}
			</Stack>
		</Drawer>
	);
}
