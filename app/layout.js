import "./globals.css";

export const metadata = {
  title: "AI Schedule Optimizer – Mahasiswa",
  description: "Optimalkan jadwal belajarmu dengan kecerdasan buatan. Analisis beban kuliah, prioritas tugas, dan rekomendasi jadwal mingguan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-gray-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
