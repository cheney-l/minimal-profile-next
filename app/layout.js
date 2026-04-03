import { Manrope, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { siteContent } from "./site-content";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const notoSerif = Noto_Serif_SC({
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
  preload: false
});

export const metadata = {
  title: siteContent.meta.title,
  description: siteContent.meta.description
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className={`${manrope.variable} ${notoSerif.variable} antialiased`}>{children}</body>
    </html>
  );
}
