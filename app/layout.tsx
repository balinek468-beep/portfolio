import "./globals.css";
import ChunkRecovery from "./components/ChunkRecovery";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className="dark">
        <ChunkRecovery />
        {children}
      </body>
    </html>
  );

}
