import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from './Provider';
import Navbar from '../ui/common/Navbar'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Construnet",
  description: "La nueva aplicación de generación de presupuestos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="./favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
