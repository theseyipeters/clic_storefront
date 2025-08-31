import {
	Button,
	Group,
	Image,
	NumberInput,
	Paper,
	Stack,
	Table,
	Text,
	TextInput,
	ActionIcon,
	Badge,
} from "@mantine/core";
import { BrandingConfig } from "@/types/theme";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppSelector } from "@/store/hooks";
import Amount from "../../components/common/Amount/Amount";

interface ClassicCartProps {
	brandingConfig: BrandingConfig;
}

export function Cart({ brandingConfig }: ClassicCartProps) {
	const { cartItems } = useAppSelector((state) => state.storefront);

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		<div className="w-full bg-[#fff]  pb-[120px]">
			<Group
				className="max-w-[1440px] mx-auto "
				align="start"
				justify="space-between"
				p="lg">
				{/* Left side: Cart items */}
				<Stack
					flex={1}
					mr="xl"
					gap="xl">
					<Text
						fw={600}
						size="xl">
						Cart
					</Text>
					<Table verticalSpacing="md">
						<Table.Thead>
							<Table.Tr>
								<Table.Th>
									<Text
										fz={16}
										fw={600}
										c={"dimmed"}>
										Products
									</Text>
								</Table.Th>
								<Table.Th>
									<Text
										fz={16}
										fw={600}
										c={"dimmed"}>
										Quantity
									</Text>
								</Table.Th>
								<Table.Th>
									<Text
										fz={16}
										fw={600}
										c={"dimmed"}>
										Price
									</Text>
								</Table.Th>
								<Table.Th>
									<Text
										fz={16}
										fw={600}
										c={"dimmed"}>
										Subtotal
									</Text>
								</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{cartItems.map((item) => (
								<Table.Tr key={item.id}>
									{/* Product Info */}
									<Table.Td h={180}>
										<Group align="center">
											<Image
												src={item.image}
												alt={item.name}
												w={100}
												h={100}
												fit="cover"
												radius="md"
											/>
											<Stack gap={2}>
												<Text fw={600}>{item.name}</Text>
												<Text
													size="sm"
													c="dimmed">
													{item.sku}
												</Text>
												<Group
													mt={15}
													gap={5}>
													<ActionIcon
														color="red"
														variant="subtle"
														size="sm">
														<button className="w-fit cursor-pointer">
															<Icon
																icon={"mynaui:trash"}
																fontSize={20}
																color="red"
															/>
														</button>
													</ActionIcon>
													<Text
														size="sm"
														c="red">
														Remove
													</Text>
												</Group>
											</Stack>
										</Group>
									</Table.Td>

									{/* Quantity */}
									<Table.Td>
										<Group gap="xs">
											<ActionIcon
												variant="subtle"
												size="sm">
												–
											</ActionIcon>
											<NumberInput
												value={item.quantity}
												min={1}
												w={60}
												size="sm"
												readOnly
											/>
											<ActionIcon
												variant="subtle"
												size="sm">
												+
											</ActionIcon>
										</Group>
									</Table.Td>

									{/* Price */}
									<Table.Td>
										<Amount value={item.price} />
									</Table.Td>

									{/* Subtotal */}
									<Table.Td>
										<Amount value={item.price * item.quantity} />
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
				</Stack>

				{/* Right side: Summary */}
				<Paper
					shadow="md"
					p="lg"
					radius="lg"
					w={400}>
					<Stack gap="lg">
						<Text
							fw={600}
							size="lg">
							Summary
						</Text>
						<Group justify="space-between">
							<Text c="dimmed">Subtotal</Text>
							<Amount value={subtotal} />
						</Group>
						<Group justify="space-between">
							<Text c="dimmed">Shipping</Text>
							<Group>
								<Badge
									variant="white"
									tt={"capitalize"}
									color="green">
									Free delivery
								</Badge>
								<Amount value={0} />
							</Group>
						</Group>
						<TextInput
							placeholder="Have a promo code?"
							radius="md"
							size="sm"
						/>
						<Group justify="space-between">
							<Text fw={600}>Total</Text>
							<Text fw={600}>${subtotal}</Text>
						</Group>
						<Button
							fullWidth
							radius="md"
							size="md"
							style={{ backgroundColor: brandingConfig.primary_color }}>
							Checkout
						</Button>
					</Stack>
				</Paper>
			</Group>
		</div>
	);
}
