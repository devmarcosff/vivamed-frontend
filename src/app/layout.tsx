import { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'rsuite/Button/styles/index.css';
import "./globals.css";


const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Vivamed | Bom Jesus do Itabapoana'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br">
      <body className={`${urbanist.className} bg-allintra-primary-50 overflow-x-hidden`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
