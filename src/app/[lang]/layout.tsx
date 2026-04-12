import type { Metadata } from "next";
import { Raleway, Open_Sans } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/lib/get-dictionary";
import Navbar from "@/components/Navbar";

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
  description: "Studio Medico Specialistico a Milano",
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
  const dictionary = await getDictionary(lang);
  
  return (
    <html lang={lang} className={`${raleway.variable} ${openSans.variable} antialiased`}>
      <body className="font-open-sans text-brand-dark bg-brand-light flex flex-col min-h-screen">
        <Navbar lang={lang} dictionary={dictionary} />
        <main className="flex-1 pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
