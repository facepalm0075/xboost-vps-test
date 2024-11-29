import Navbar from "./NavBar";
import Footer from "./Footer";
import ScrollFix from "@/app/components/ScrollFix";
import "@/app/globals.css";
import MainChatHolder from "../components/MainChatHolder";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Navbar />
			{children}
			<ScrollFix />
			<Footer />
		</>
	);
}
