import type { Metadata } from "next";
import { Raleway, Open_Sans } from "next/font/google";
import "../globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "Studio San Damiano",
  description: "Medical clinic excellence",
};

export async function generateStaticParams() {
  return [{ lang: 'it' }, { lang: 'en' }];
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = await params;
  
  return (
    <html lang={lang} className={`${raleway.variable} ${openSans.variable} antialiased`}>
      <body className="font-open-sans text-brand-dark bg-brand-light">
        {children}
      </body>
    </html>
  );
}
