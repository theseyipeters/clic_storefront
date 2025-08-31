import React from "react";
import { Image, Text, Box, Indicator } from "@mantine/core";
import { BrandingConfig } from "@/types/theme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import Search from "./common/Search/Search";
import { toggleCartDrawer } from "@/slices/actionSlice";

interface ClassicHeaderProps {
	brandingConfig: BrandingConfig;
}

export function Header({ brandingConfig }: ClassicHeaderProps) {
	const dispatch = useAppDispatch();
	const { vendor, cartItems } = useAppSelector((state) => state.storefront);
	const branding = brandingConfig;
	return (
		<header
			style={{ background: "white", fontFamily: branding.font_family }}
			className="h-[80px] text-black font-bold px-[15px] 2xl:px-0 w-full  mx-auto flex items-center justify-center">
			<div className="w-full grid grid-cols-3 gap-3 items-center justify-between max-w-[1440px]">
				<div className="flex items-center gap-2">
					<div className="w-[40px] rounded-full overflow-hidden">
						<Image
							src={branding.logo_url}
							alt="logo"
							width={"100%"}
						/>
					</div>
					<Text className="hidden lg:block">{vendor?.store_name}</Text>
				</div>
				<div>
					{" "}
					<Search />{" "}
				</div>
				<div className="w-full flex">
					<div className="w-fit flex items-center justify-end ml-auto gap-8">
						<div className="flex items-center">
							<Icon
								icon={"emojione-monotone:flag-for-nigeria"}
								color="#699d3c"
								fontSize={30}
							/>

							<Box className="text-sm capitalize font-medium ml-2">NGN</Box>
						</div>

						<Indicator
							autoContrast
							inline
							label={cartItems.length}
							size={20}>
							<button
								onClick={() => dispatch(toggleCartDrawer(true))}
								className="flex items-center hover:text-[var(--brand-color)] transition-all duration-300 ease-in-out cursor-pointer">
								<Icon
									icon={"ph:shopping-cart"}
									fontSize={25}
								/>
								{/* <span className="text-sm capitalize font-medium ml-2">
									Cart
								</span> */}
							</button>
						</Indicator>

						<div className="flex items-center justify-center w-full lg:gap-2">
							<span className="flex-shrink-0 flex items-center justify-center text-primary-1 w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-xl leading-none rounded-md bg-gray-100 capitalize pt-[2px] font-semibold">
								<Icon
									icon={"mynaui:user"}
									fontSize={25}
								/>
							</span>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
