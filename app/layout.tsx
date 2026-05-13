import "./globals.css";

export const metadata = {
  title: "GK Focus USDT Escrow | Secure Crypto Escrow Platform",

  description:
    "Professional USDT escrow platform for secure OTC crypto transactions. Safe, trusted, and admin-protected escrow service worldwide.",

  keywords: [
    "USDT escrow",
    "crypto escrow",
    "OTC escrow",
    "secure USDT trading",
    "GK Focus",
  ],

  authors: [
    {
      name: "GK Focus",
    },
  ],

  openGraph: {
    title:
      "GK Focus USDT Escrow",

    description:
      "Secure and trusted USDT escrow platform for safe crypto trading worldwide.",

    url:
      "https://gkfocususdtescrow.com",

    siteName:
      "GK Focus USDT Escrow",

    locale:
      "en_US",

    type:
      "website",
  },

  icons: {
    icon: "/favicon-new.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">

      <body>

        {children}

      </body>

    </html>
  );
}