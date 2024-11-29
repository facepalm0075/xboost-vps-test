import Script from "next/script";
import MainChatHolder from "./components/MainChatHolder";
import { cn } from "@/lib/utils";
import { lexend } from "@/app/Font";
import type { Metadata, Viewport } from "next";
import StoreProvider from "@/app/redux/Provider";
import NextTopLoader from "nextjs-toploader";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/_options";

export const metadata: Metadata = {
	title: "xBoost",
	description: "Future of Boosting",
};

export const viewport: Viewport = {
	initialScale: 1.0,
	width: "device-width",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession(authOptions);
	let chatElement = <MainChatHolder />;
	if (session && session.role === "admin") {
		chatElement = <></>;
	}
	return (
		<html lang="en">
			<body
				id="body"
				style={{ fontWeight: "400", fontSize: "15px" }}
				className={`${lexend.className} ${cn("min-h-screen bg-background font-sans antialiased", lexend.variable)}`}
			>
				<NextTopLoader speed={1500} showSpinner={false} />
				<StoreProvider>
					<div className={lexend.className}>
						{children}
						{chatElement}
					</div>
				</StoreProvider>
			</body>
			<Script strategy="lazyOnload" id="link-disable">
				{`
          window.onscroll = function() {pgScroll()};
          var header = document.getElementById("MHeader");
          var fixer = document.getElementById("h-height-fix");
          var sticky = header?.offsetTop+170;
          pgScroll()          
          function pgScroll() {
            var header2 = document.getElementById("game-nav");
            var fixer2 = document.getElementById("game-nav-fixer");
            if (window.pageYOffset > sticky) {
              header.classList.add("header-active");
              fixer.classList.add("h-height-fix");
              if(document.getElementById("game-nav")){
                header2.classList.add("header2-active");
                fixer2.classList.add("h-height-fix2");
              }              
            } else {
              header?.classList.remove("header-active");
              fixer?.classList.remove("h-height-fix");
              if(document.getElementById("game-nav")){
                header2?.classList.remove("header2-active");
                fixer2?.classList.remove("h-height-fix2");
              } 
            }
          }        

      
      `}
			</Script>
		</html>
	);
}
