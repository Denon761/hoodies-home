"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isConfigurator = pathname?.startsWith("/customize");

  if (isConfigurator) {
    return <main className="flex flex-1 flex-col">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
