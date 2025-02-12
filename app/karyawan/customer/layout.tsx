import type { Metadata } from "next";
import "react-toastify/ReactToastify.css"

export const metadata: Metadata = {
  title: "SekopTix",
  description: "Sekopling Tiket Kereta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}