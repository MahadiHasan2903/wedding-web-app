import "./globals.css";
import type { Metadata } from "next";
import "slick-carousel/slick/slick.css";
import { Inter } from "next/font/google";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer } from "react-toastify";
import AuthProvider from "@/lib/providers/AuthProvider";
import { APPLICATION_NAME } from "@/lib/config/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: APPLICATION_NAME,
  description: `${APPLICATION_NAME} is a trusted matrimonial platform connecting individuals from France and Cuba seeking meaningful, lifelong relationships. Discover matches, communicate securely, and begin your journey toward a beautiful union.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-light`}>
        <AuthProvider>
          <main>
            <div className="w-full">{children}</div>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              draggable
              pauseOnHover
              theme="colored"
              transition={Bounce}
              style={{
                zIndex: 9999999,
              }}
            />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
