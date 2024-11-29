import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/app/(main)/NavBar";
import Sidebar from "./components/Sidebar";
import "./styles.css";
import Cashback from "./components/Cashback";
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
			<Navbar id2="sec" id="sec" headerClass="profile-header" />
			<div className="flex profile-layout-container">
				<div className="w-80">
					<Sidebar />
				</div>
				<div className="w-full px-5 pt-5 relative">{children}</div>
				<div className="w-80 h-fit mt-7">
					<Cashback />
				</div>
			</div>
		</>
	);
}
