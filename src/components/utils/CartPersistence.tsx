"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setCart } from "@/slices/storefrontSlice";
import { useAppSelector } from "@/store/hooks";

export default function CartPersistence() {
	const dispatch = useDispatch();
	const { cartItems } = useAppSelector((state) => state.storefront);

	// Load from localStorage on mount
	useEffect(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("cart");
			if (saved) {
				dispatch(setCart(JSON.parse(saved)));
			}
		}
	}, [dispatch]);

	// Save to localStorage when cart changes
	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("cart", JSON.stringify(cartItems));
		}
	}, [cartItems]);

	return null; // doesn’t render anything
}
