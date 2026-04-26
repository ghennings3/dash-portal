import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dash Portal",
  description: "Seu ponto de partida minimalista e premium para a web. Organize seus sites favoritos com a estética JetBrains.",
  keywords: ["dashboard", "startpage", "minimalist", "bookmarks", "jetbrains"],
  openGraph: {
    title: "Dash Portal",
    description: "Seu ponto de partida minimalista e premium para a web.",
    url: "https://dash-portal.vercel.app",
    siteName: "Dash Portal",
    images: [
      {
        url: "https://dash-portal.vercel.app/og-image.png", // Recommended placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dash Portal",
    description: "Seu ponto de partida minimalista e premium para a web.",
    images: ["https://dash-portal.vercel.app/og-image.png"], // Recommended placeholder
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
      <body className="bg-zinc-950 text-white selection:bg-zinc-800">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          themes={["dark", "light", "sunset", "cyberpunk", "hacker", "dracula"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
