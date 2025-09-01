import { Text, type TextProps } from "@mantine/core";

interface AmountProps extends TextProps {
	value: string | number;
	type?: string;
	isCreditDebit?: boolean;
	hideSign?: boolean;
	isDiscounted?: boolean;
}

export default function Amount({
	value,
	type,
	isCreditDebit,
	hideSign,
	isDiscounted,
	...props
}: AmountProps) {
	// Remove "NGN" prefix and commas from the value if it's a string, then convert it to a number
	const cleanedValue =
		typeof value === "string"
			? parseFloat(
					value
						.replace(/(NGN|USD)/g, "")
						.trim()
						.replace(/,/g, "")
			  )
			: value;

	function handleColor() {
		if (isCreditDebit) {
			return cleanedValue >= 0 ? "green" : "red";
		}

		switch (type?.toLowerCase()) {
			case "credit":
				return "green";
			case "debit":
				return "red";
			default:
				return "#101828";
		}
	}

	if (isNaN(cleanedValue)) {
		return <Text fw={500}>N/A</Text>;
	}

	const formattedValue = new Intl.NumberFormat("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(cleanedValue);

	return (
		<Text
			c={handleColor()}
			fz={isDiscounted ? 14 : 16}
			td={isDiscounted ? "line-through" : ""} // 👈 strike-through if discounted
			{...props}>
			₦{formattedValue}
		</Text>
	);
}
