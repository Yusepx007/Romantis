import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Untuk Fitri Maharani 💌 — Happy National Girlfriend Day",
  description:
    "Sebuah kejutan kecil yang penuh cinta, spesial di Hari National Girlfriend Day, 1 Agustus — khusus untuk Fitri Maharani.",
  openGraph: {
    title: "Untuk Fitri Maharani 💌",
    description: "Kejutan romantis spesial hari ini, sayangku ❤️",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lato:wght@300;400;700&family=Dancing+Script:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
