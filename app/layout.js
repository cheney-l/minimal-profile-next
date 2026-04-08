import { Manrope, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import BuildVersionGuard from "./components/build-version-guard";
import { siteContent } from "./site-content";
import RuntimeErrorMonitor from "./components/runtime-error-monitor";

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
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className={`${manrope.variable} ${notoSerif.variable} antialiased`}>
        <BuildVersionGuard />
        <RuntimeErrorMonitor />
        {children}
      </body>
    </html>
  );
}
