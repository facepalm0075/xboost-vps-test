import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { lexend } from "@/app/Font";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/lib/utils";
import "./styles.css";
import StoreProvider from "../redux/Provider";

export const metadata: Metadata = {
	title: "xBoost",
	description: "Future of Boosting",
};

export const viewport: Viewport = {
	initialScale: 1.0,
	width: "device-width",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				id="body"
				style={{ fontWeight: "400", fontSize: "15px" }}
				className={`${lexend.className} ${cn("min-h-screen bg-background font-sans antialiased", lexend.variable)}`}
			>
				<StoreProvider>
					<NextTopLoader speed={1500} showSpinner={false} />
					<div className="flex panel-layout-container">
						<div className="w-80"></div>
						<div className="w-full px-5 pt-5 relative">{children}</div>
						<div className="w-80 h-fit mt-7"></div>
					</div>
				</StoreProvider>
			</body>
		</html>
	);
}
