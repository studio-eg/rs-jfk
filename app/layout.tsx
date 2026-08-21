import type { Metadata } from "next";
import { Fraunces, Lato } from "next/font/google";
import "./globals.css";
import { AgentationProvider } from "@/components/AgentationProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Realschule John-F.-Kennedy-Platz",
    template: "%s | Realschule John-F.-Kennedy-Platz",
  },
  description:
    "Realschule John-F.-Kennedy-Platz in Braunschweig – eigenverantwortliches und kooperatives Lernen in einer gewaltfreien Schule.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${fraunces.variable} ${lato.variable}`}>
      <body className="font-[family-name:var(--font-body)] antialiased">
        <Navbar />
        {children}
        <Footer />
        <AgentationProvider />
      </body>
    </html>
  );
}
