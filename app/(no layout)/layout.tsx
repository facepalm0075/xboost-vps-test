import type { Metadata } from "next";
import "@/app/globals.css";
import MainChatHolder from "../components/MainChatHolder";

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
			{children}
		</>
	);
}
