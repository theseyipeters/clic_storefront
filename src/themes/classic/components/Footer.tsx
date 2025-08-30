import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

export function Footer() {
	const { vendor } = useAppSelector((state) => state.storefront);

	if (!vendor) return null;

	const {
		store_name,
		store_description,
		email_address,
		phone_number,
		whatsapp_number,
		social_links,
		branding_config,
		// store_policies,
	} = vendor;

	const currentYear = new Date().getFullYear();
	const primaryColor = branding_config?.primary_color || "#000";
	const theme = branding_config?.theme || "Default";

	return (
		<footer
			style={{ backgroundColor: primaryColor }}
			className="text-white text-sm p-6 text-center md:text-left">
			<div className="max-w-6xl mx-auto grid gap-4 md:grid-cols-3">
				{/* Store Info */}
				<div>
					<h2 className="text-lg font-semibold">{store_name}</h2>
					{store_description && (
						<p className="text-xs mt-1">{store_description}</p>
					)}
				</div>

				{/* Contact Info */}
				<div className="space-y-1 text-xs">
					{email_address && (
						<p>
							Email:{" "}
							<a
								href={`mailto:${email_address}`}
								className="underline">
								{email_address}
							</a>
						</p>
					)}
					{phone_number && (
						<p>
							Phone:{" "}
							<a
								href={`tel:${phone_number}`}
								className="underline">
								{phone_number}
							</a>
						</p>
					)}
					{whatsapp_number && (
						<p>
							WhatsApp:{" "}
							<a
								href={`https://wa.me/${whatsapp_number}`}
								target="_blank"
								className="underline">
								Chat
							</a>
						</p>
					)}
				</div>

				{/* Social Links */}
				<div className="flex justify-center md:justify-end gap-4 text-xl">
					{social_links?.facebook && (
						<Link
							href={social_links.facebook}
							target="_blank"
							aria-label="Facebook">
							<i className="fab fa-facebook-f"></i>
						</Link>
					)}
					{social_links?.instagram && (
						<Link
							href={social_links.instagram}
							target="_blank"
							aria-label="Instagram">
							<i className="fab fa-instagram"></i>
						</Link>
					)}
					{social_links?.x && (
						<Link
							href={social_links.x}
							target="_blank"
							aria-label="X (Twitter)">
							<i className="fab fa-x-twitter"></i>
						</Link>
					)}
					{social_links?.tiktok && (
						<Link
							href={social_links.tiktok}
							target="_blank"
							aria-label="TikTok">
							<i className="fab fa-tiktok"></i>
						</Link>
					)}
				</div>
			</div>

			{/* Footer Bottom */}
			<div className="border-t border-white/20 mt-6 pt-4 text-xs text-center">
				<p>
					© {currentYear} {store_name || "Clicr"}. All rights reserved. Theme:{" "}
					{theme}
				</p>
			</div>
		</footer>
	);
}
