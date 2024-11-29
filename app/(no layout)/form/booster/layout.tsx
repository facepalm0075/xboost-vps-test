import type { Metadata } from "next";
import Image from "next/image";
import "./styles.css";

export const metadata: Metadata = {
	title: "xBoosts",
	description: "Future of Boosting",
};


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Image src={"/boosterFormBg.jpg"} width={300} height={150} alt="bg-wallpaper" className="bform-bg" />
			<div className="bform-container">
				{children}
			</div>
		</>
	);
}
