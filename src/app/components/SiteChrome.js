import Header from "./Header";
import Footer from "./Footer";

export default function SiteChrome({ children }) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
