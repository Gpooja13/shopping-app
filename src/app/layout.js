import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GlobalContextProvider } from "../context/store";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shopping App",
  description: "Shopping App generated by Next.js 14",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={inter.className} style={{overflowX:"hidden"}}>
          <GlobalContextProvider>
            <Navbar/>
            {children}
            <Footer />
          </GlobalContextProvider>
        </body>
      </html>
     
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}
