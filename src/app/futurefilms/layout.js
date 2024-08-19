import  "../globals.css";
; // Zorg ervoor dat je de juiste pad gebruikt om je globale CSS te importeren

export const metadata = {
  title: "Jukebox Future Films - Selectie",
  description: "Selecteer een thema voor de video quiz",
};

export default function FutureFilmsLayout({ children }) {
  return (
    <html lang="en">
      <body className="futurefilms">
        {children}
      </body>
    </html>
  );
}
