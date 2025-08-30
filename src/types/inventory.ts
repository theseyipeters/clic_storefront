export interface Product {
	id: string;
	name: string;
	slug: string;
	sku: string;
	description: string;
	pricing: {
		price: number;
		cost_price: number;
		is_taxable: boolean;
		tax_included: boolean;
		discount_type: "none" | "flat" | "percentage";
		discount_value: number;
		final_price: number;
	};
	images: string[];
	category: string;
	stock_quantity: number;
	created_at: Date;
}

export interface SubCategory {
	label: string;
	value: string;
}

export interface ProductCategory {
	label: string;
	value: string;
	subCategory: SubCategory[];
}
