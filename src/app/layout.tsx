import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sexto Sistema | Agencia de Inteligencia Artificial",
  description: "Una agencia de soluciones simples a tus necesidades complejas. Desarrollo de IA, automatización, chatbots, análisis de datos y más.",
  keywords: ["Inteligencia Artificial", "AI Agency", "Machine Learning", "Automatización", "Chatbots", "Análisis de Datos"],
  authors: [{ name: "Sexto Sistema" }],
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "Sexto Sistema | Agencia de Inteligencia Artificial",
    description: "Una agencia de soluciones simples a tus necesidades complejas, donde tus proyectos se hacen realidad",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sexto Sistema | Agencia de Inteligencia Artificial",
    description: "Una agencia de soluciones simples a tus necesidades complejas",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
