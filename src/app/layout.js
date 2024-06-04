import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from './Provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Construnet",
  description: "La nueva aplicación de generación de presupuestos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
