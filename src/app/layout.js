import './globals.css';

export const metadata = {
  title: 'Free TikTok Video Downloader HD - No Watermark',
  description: 'Download TikTok videos online without watermark in high quality HD. Fast, free, and works globally on all devices.',
  // Verifikasi Google Search Console
  verification: {
    google: 'Kk_QsKz7-SZhAA0wzc3gkDUW5BkfQYd7uU63FlqCRw8',
  },
  // Open Graph untuk tampilan profesional saat di-share ke WhatsApp/Sosmed
  openGraph: {
    title: 'Free TikTok Video Downloader HD - No Watermark',
    description: 'Download TikTok videos online without watermark in high quality HD.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
