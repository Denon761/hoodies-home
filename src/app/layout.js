import Script from "next/script";
import { Montserrat, Archivo_Black } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import SiteChrome from "./components/SiteChrome";
import { SITE_URL, SITE_NAME } from "./lib/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HoodiesHome | Heavyweight Hoodies, Built to Last",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Shop the HoodiesHome heavyweight hoodie — 400GSM cotton fleece across every current drop. Free shipping, secure checkout, easy returns.",
  keywords: ["heavyweight hoodie", "cotton fleece hoodie", "streetwear hoodie", "HoodiesHome"],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "HoodiesHome | Heavyweight Hoodies, Built to Last",
    description:
      "Shop the HoodiesHome heavyweight hoodie — 400GSM cotton fleece across every current drop.",
    url: SITE_URL,
    images: [{ url: "/images/hero1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HoodiesHome | Heavyweight Hoodies, Built to Last",
    description:
      "Shop the HoodiesHome heavyweight hoodie — 400GSM cotton fleece across every current drop.",
    images: ["/images/hero1.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${archivoBlack.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://js.stripe.com" />
        <link rel="preconnect" href="https://api.stripe.com" />
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "y4zs1z3ku5");
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
