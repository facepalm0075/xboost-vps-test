import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { lexend } from "@/app/Font";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/lib/utils";
import Navbar from "@/app/(main)/NavBar";
import Sidebar from "./components/Sidebar";
import "./styles.css";
import Cashback from "./components/Cashback";

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
				<Navbar id2="sec" id="sec" headerClass="profile-header" />
				<NextTopLoader speed={1500} showSpinner={false} />
				<div className="flex profile-layout-container">
					<div className="w-80">
						<Sidebar />
					</div>
					<div className="w-full px-5 pt-5 relative">{children}</div>
					<div className="w-80 h-fit mt-7">
						<Cashback />
					</div>
				</div>
			</body>
		</html>
	);
}
