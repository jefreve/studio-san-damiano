import type { Metadata } from "next";
import { Raleway, Open_Sans } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { getDictionary } from "@/lib/get-dictionary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import ChatWidget from "@/components/ChatWidget";

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
  params: Promise<{ lang: string }>;
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
        <Footer />
        <ChatWidget />

        {/* --- RB BOOKING WIDGET INTEGRATION --- */}
        <Script id="rb-widget-config" strategy="beforeInteractive">
          {`
            window.RB_WIDGET_CONFIG = {
              name: "Studio San Damiano",
              phone: "02 8342 1276",
              logoUrl: '/logo-san-damiano.webp',
              branding: {
                primaryColor: "#5a5a5a",
                accentColor: "#f5e4d7",
                fontFamily: "Raleway, sans-serif",
                borderRadius: "2px"
              },
              trigger: { show: false },
              services: [
                { id: 'S1', name: 'CONSULTAZIONE MEDICINA ESTETICA', duration: '30 min' },
                { id: 'S2', name: 'VISITA ODONTOIATRICA', duration: '45 min' },
                { id: 'S3', name: 'IGENE ORALE PROFESSIONALE', duration: '60 min' },
                { id: 'S4', name: 'CONSULTAZIONE EAGLEGRID®', duration: '45 min' },
                { id: 'S5', name: 'FILLER / BOTOX / BIO', duration: '30 min' }
              ],
              doctors: [
                { id: 'D1', name: 'Dott.ssa Silvia Bonfiglio' },
                { id: 'D2', name: 'Dott. Mario V. Longo' },
                { id: 'D3', name: 'Dott.ssa Ozana G. Cristea' },
                { id: 'D4', name: 'Dott. Alessandro Sorrenti' },
                { id: 'D5', name: 'Dott. Gianluca Marzorati' },
                { id: 'D6', name: 'Dott. Roberto Logozzo' },
                { id: 'D7', name: 'Dott.ssa Vittoria Risso' },
                { id: 'D8', name: 'Dott. Roberto Berlusconi' },
                { id: 'D9', name: 'Dott.ssa Valeria Colombo' },
                { id: 'D10', name: 'Dott. Ruggero Tagliabue' },
                { id: 'D11', name: 'Dott.ssa Iole Cucinotto' }
              ],
              texts: {
                welcomeTitle: "Prenota il tuo appuntamento",
                welcomeSubtitle: "Scegli il servizio e l'orario più comodo per te"
              }
            };
          `}
        </Script>
        <Script src="/dist/widget-v2.js" strategy="afterInteractive" />
        <div id="rb-booking-widget"></div>
        {/* ------------------------------------- */}
      </body>
    </html>
  );
}
