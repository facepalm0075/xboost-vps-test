import { Amiko, Lexend, Lato } from "next/font/google";

export const amiko = Amiko({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-amiko",
});
export const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-lexend",
});
export const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
  variable: "--font-lato",
});
