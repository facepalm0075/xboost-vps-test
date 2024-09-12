import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { lexend } from "@/app/Font";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/lib/utils";

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
        <NextTopLoader speed={1500} showSpinner={false} />
        {children}
      </body>
      
    </html>
  );
}
