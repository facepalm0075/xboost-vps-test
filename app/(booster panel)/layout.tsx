import type { Metadata } from "next";
import "@/app/globals.css";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/app/(main)/NavBar";
import "./styles.css";
import MainChatHolder from "../components/MainChatHolder";

export const metadata: Metadata = {
	title: "xBoost",
	description: "Future of Boosting",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Navbar id2="sec" id="sec" headerClass="profile-header" />
			<NextTopLoader speed={1500} showSpinner={false} />
			<div className="flex profile-layout-container">
				<div className="w-80"></div>
				<div className="w-full px-5 pt-5 relative">{children}</div>
				<div className="w-80 h-fit mt-7"></div>
			</div>
		</>
	);
}
