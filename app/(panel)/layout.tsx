import type { Metadata } from "next";
import "@/app/globals.css";
import "./styles.css";

export const metadata: Metadata = {
	title: "xBoost",
	description: "Future of Boosting",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="flex panel-layout-container">
				<div className="w-80"></div>
				<div className="w-full px-5 pt-5 relative">{children}</div>
				<div className="w-80 h-fit mt-7"></div>
			</div>
		</>
	);
}
