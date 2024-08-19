import  "../globals.css";

export const metadata = {
  title: "Jukebox Future Films - Video Player",
  description: "Bekijk de geselecteerde video's",
};

export default function VideoPlayerLayout({ children }) {
  return (
    <html lang="en">
      <body className="videoPlayer">
        {children}
      </body>
    </html>
  );
}
