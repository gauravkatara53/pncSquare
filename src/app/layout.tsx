import "./globals.css";
import { Header as Navbar } from "@/components/common/Navbar";

export const metadata = {
  title: "College Finder",
  description: "Find your dream IIT, NIT, or other colleges easily.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="mx-auto ">{children}</main>
      </body>
    </html>
  );
}
