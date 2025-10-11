import "./globals.css";
import { Poppins } from "next/font/google";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // você pode escolher os pesos que vai usar
});

export const metadata = {
  title: "Belô Doces e Sabores",
  description: "Cardápio digital de bolos e doces",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <Head>
        <title>Cardápio da Belô</title>
        <link rel="icon" type="image/png" href="logo.png" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
