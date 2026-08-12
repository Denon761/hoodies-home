import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import SiteChrome from "./components/SiteChrome";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "HoodiesHome | Design Your Perfect Hoodie",
  description:
    "Customize every detail of your hoodie with our live design studio. Premium fabrics, professional printing, fast US delivery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
