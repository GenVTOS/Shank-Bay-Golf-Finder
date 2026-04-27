import './globals.css';

export const metadata = {
  title: "Boys' Golf Trip 2026 — Brisbane Edition",
  description: "Fifteen golf trip destinations within 3 hours of Brisbane. Late March / early April 2026.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d3b25',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
