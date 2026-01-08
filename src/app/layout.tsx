import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/contexts/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "Optombazar.uz - Ulgurji Savdo Platformasi",
    template: "%s | Optombazar.uz",
  },
  description: "Eng arzon ulgurji narxlarda paketlar, bir martalik idishlar va xo'jalik mollari. Toshkent bo'ylab yetkazib berish xizmati.",
  keywords: ["ulgurji savdo", "optom bozor", "toshkent", "yetkazib berish", "arzon narxlar", "paketlar", "idishlar"],
  authors: [{ name: "Optombazar" }],
  creator: "Optombazar",
  publisher: "Optombazar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://optombazar.uz"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://optombazar.uz",
    siteName: "Optombazar.uz",
    title: "Optombazar.uz - Ulgurji Savdo Platformasi",
    description: "Eng arzon ulgurji narxlarda paketlar, bir martalik idishlar va xo'jalik mollari.",
    images: [
      {
        url: "/icons/icon-512.png",
        width: 512,
        height: 512,
        alt: "Optombazar Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Optombazar.uz - Ulgurji Savdo Platformasi",
    description: "Eng arzon ulgurji narxlarda paketlar, bir martalik idishlar va xo'jalik mollari.",
    images: ["/icons/icon-512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/icons/icon-192.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <head>
        <meta name="theme-color" content="#2563eb" />
        <meta name="google-site-verification" content="YiAAePBFA8dD9NF17NktAQMiWqN24uozqQl-vBndSyk" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-slate-900`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
