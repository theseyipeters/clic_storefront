import React from "react";
import {
	Container,
	Grid,
	Image,
	Title,
	Text,
	Button,
	NumberInput,
	Group,
	Badge,
} from "@mantine/core";
import styles from "../styles/classic.module.css";
import { BrandingConfig } from "@/types/theme";

interface ClassicProductProps {
	productId: string;
	brandingConfig: BrandingConfig;
}

export function Product({ productId, brandingConfig }: ClassicProductProps) {
	return (
		<Container
			size="lg"
			className={styles.classicProduct}>
			<Grid>
				<Grid.Col
					span={12}
					mb={6}>
					<Image
						src={`https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop&auto=format`}
						alt="Product"
						radius="md"
						className={styles.productImage}
					/>
				</Grid.Col>
				<Grid.Col
					span={12}
					mb={6}>
					<div className={styles.productDetails}>
						<Badge
							color={brandingConfig.primary_color}
							mb="sm">
							Classic Collection
						</Badge>
						<Title
							order={1}
							mb="md"
							style={{ fontFamily: brandingConfig.font_family }}>
							Classic Product {productId}
						</Title>
						<Text
							size="xl"
							fw={700}
							color={brandingConfig.primary_color}
							mb="md">
							$199.99
						</Text>
						<Text
							size="md"
							color="dimmed"
							mb="xl">
							This is a beautifully crafted classic product that embodies
							timeless elegance and superior quality. Perfect for those who
							appreciate traditional design with modern functionality.
						</Text>

						<Group mb="xl">
							<Text>Quantity:</Text>
							<NumberInput
								defaultValue={1}
								min={1}
								max={10}
								style={{ width: "80px" }}
							/>
						</Group>

						<Group>
							<Button
								size="lg"
								style={{
									backgroundColor: brandingConfig.primary_color,
									"&:hover": {
										backgroundColor: brandingConfig.primary_color + "DD",
									},
								}}>
								Add to Cart
							</Button>
							<Button
								size="lg"
								variant="outline"
								color={brandingConfig.primary_color}>
								Buy Now
							</Button>
						</Group>
					</div>
				</Grid.Col>
			</Grid>
		</Container>
	);
}
