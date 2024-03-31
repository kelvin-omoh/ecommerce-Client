import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "../styles/globals.css";
import Provider from "./components/Provider";
import Layouts from "./components/Layouts";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <Layouts>


          <Provider>

            <Toaster
              position="top-right"
              reverseOrder={false}
            />

            {children}


          </Provider>
        </Layouts>

      </body>
    </html >
  );
}
