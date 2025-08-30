import { type NextRequest, NextResponse } from "next/server";
import { rootDomain } from "@/lib/utils";

function extractSubdomain(request: NextRequest): string | null {
	const url = request.url;
	const host = request.headers.get("host") || "";
	let hostname = host.split(":")[0];

	// Local development environment
	if (url.includes("localhost") || url.includes("127.0.0.1")) {
		// Try to extract subdomain from the full URL
		const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
		if (fullUrlMatch && fullUrlMatch[1]) {
			return fullUrlMatch[1];
		}

		// Fallback to host header approach
		if (hostname.includes(".localhost")) {
			return hostname.split(".")[0];
		}

		return null;
	}

	// Production environment
	const rootDomainFormatted = rootDomain.split(":")[0];

	if (hostname.startsWith("www.")) {
		hostname = hostname.slice(4);
	}

	// Handle preview deployment URLs (tenant---branch-name.vercel.app)
	if (hostname.includes("---") && hostname.endsWith(".vercel.app")) {
		const parts = hostname.split("---");
		return parts.length > 0 ? parts[0] : null;
	}

	// Regular subdomain detection
	const isSubdomain =
		hostname !== rootDomainFormatted &&
		hostname !== `www.${rootDomainFormatted}` &&
		hostname.endsWith(`.${rootDomainFormatted}`);

	return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, "") : null;
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const subdomain = extractSubdomain(request);

	if (subdomain) {
		// Block access to admin page from subdomains
		if (pathname.startsWith("/admin")) {
			return NextResponse.redirect(new URL("/", request.url));
		}

		// For the root path on a subdomain, rewrite to the subdomain page
		if (pathname === "/") {
			return NextResponse.rewrite(new URL(`/s/${subdomain}`, request.url));
		}
	}

	// On the root domain, allow normal access
	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. all root files inside /public (e.g. /favicon.ico)
		 */
		"/((?!api|_next|[\\w-]+\\.\\w+).*)",
	],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
// 	const url = request.nextUrl.clone();
// 	const hostname = request.headers.get("host") || "";

// 	console.log("Middleware - Full hostname:", hostname); // Debug log

// 	// Extract subdomain from hostname
// 	let subdomain = "";

// 	if (hostname.includes("localhost")) {
// 		// For local development, you might want to simulate subdomains
// 		// localhost:3000 -> no subdomain
// 		// client1.localhost:3000 -> client1
// 		const parts = hostname.split(".");
// 		if (parts.length > 1 && parts[0] !== "localhost") {
// 			subdomain = parts[0];
// 		}
// 	} else {
// 		// For production: client1.yourdomain.com -> client1
// 		const parts = hostname.split(".");
// 		if (parts.length > 2) {
// 			subdomain = parts[0];
// 		}
// 		// Skip www
// 		if (subdomain === "www") {
// 			subdomain = "";
// 		}
// 	}

// 	console.log("Middleware - Extracted subdomain:", subdomain); // Debug log

// 	// Create response and add subdomain to headers
// 	const response = NextResponse.next();
// 	response.headers.set("x-subdomain", subdomain);

// 	return response;
// }

// export const config = {
// 	matcher: [
// 		/*
// 		 * Match all request paths except for the ones starting with:
// 		 * - api (API routes)
// 		 * - _next/static (static files)
// 		 * - _next/image (image optimization files)
// 		 * - favicon.ico (favicon file)
// 		 * - public folder files
// 		 */
// 		"/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)",
// 	],
// };
