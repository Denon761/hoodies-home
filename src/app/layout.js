import { Montserrat, Archivo_Black } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import SiteChrome from "./components/SiteChrome";

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
  title: "HoodiesHome | The Classic Hoodie",
  description:
    "A heavyweight, garment-dyed cotton hoodie in four colors. Free shipping, secure checkout, easy returns.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${archivoBlack.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
