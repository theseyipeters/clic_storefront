import { Icon } from "@iconify/react";
export default function Search() {
	return (
		<div className="w-full flex items-center bg-gray-100 font-normal h-[45px] rounded-md overflow-hidden px-4">
			<input
				type="text"
				placeholder="Search products"
				className="w-full bg-transparent text-sm font-normal h-full focus:outline-none"
			/>

			<Icon icon={"hugeicons:search-01"} />
		</div>
	);
}
