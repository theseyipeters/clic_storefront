import { CartItem, Product } from "@/types/inventory";

export const toCartItem = (product: Product, quantity = 1): CartItem => ({
	id: product.id,
	name: product.name,
	slug: product.slug,
	sku: product.sku,
	original_price: product.pricing.price,
	price: product.pricing.final_price,
	image: product.images[0],
	quantity,
	category: product.category,
	isTaxable: product.pricing.is_taxable,
	taxIncluded: product.pricing.tax_included,
	discountType: product.pricing.discount_type as
		| "none"
		| "percentage"
		| "fixed",
	discountValue: product.pricing.discount_value,
});
