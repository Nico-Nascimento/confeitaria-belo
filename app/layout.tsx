import "./globals.css";
import { Poppins } from "next/font/google";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // você pode escolher os pesos que vai usar
});

export const metadata = {
  title: "Belô Doces e Sabores",
  description: "Cardápio digital de bolos e doces",
  icons: {
    icon: "/favicon.ico",      
    apple: "/apple-touch-icon.png", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
