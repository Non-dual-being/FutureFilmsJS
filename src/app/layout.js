import "./globals.css"; // Zorg ervoor dat je de juiste pad gebruikt om je globale CSS te importeren

export const metadata = {
  title: "Jukebox Future Films",
  description: "Redirecting...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
