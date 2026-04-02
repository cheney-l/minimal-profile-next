import { Inter } from "next/font/google";
import "./globals.css";
import { siteContent } from "./site-content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata = {
  title: siteContent.meta.title,
  description: siteContent.meta.description
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
