import './globals.css';

// Contoh di dalam src/app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="Kk_QsKz7-SZhAA0wzc3gkDUW5BkfQYd7uU63FlqCRw8" />
      </head>
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: 'Free TikTok Video Downloader HD - No Watermark',
  description: 'Download TikTok videos online without watermark in high quality HD. Fast, free, and works globally on all devices.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
