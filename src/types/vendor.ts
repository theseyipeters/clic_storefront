export interface SocialLinks {
	facebook: string;
	x: string;
	instagram: string;
	tiktok: string;
}

export interface StorePolicies {
	opening_hours: {
		[day: string]: {
			enabled: boolean;
			open_time: string;
			close_time: string;
		};
	};
}

export interface BrandingConfig {
	theme: string;
	font_family: string;
	logo_url: string | null;
	favicon_url: string | null;
	primary_color: string;
	secondary_color: string;
}

export interface Vendor {
	store_name: string;
	slug: string;
	store_description?: string;
	email_address?: string;
	phone_number?: string;
	whatsapp_number?: string;
	branding_config: BrandingConfig;
	social_links: SocialLinks;
	store_policies: StorePolicies;
}
