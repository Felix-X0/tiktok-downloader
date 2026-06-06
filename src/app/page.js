'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState('');

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setVideoData(null);

    // Regex simpel untuk validasi link TikTok (ramah HP)
    if (!url.includes('tiktok.com')) {
        setError('Please paste a valid TikTok link.');
        setLoading(false);
        return;
    }

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      
      if (data.success) {
        setVideoData(data);
      } else {
        setError(data.error || 'Video not found. Private or deleted?');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Background Utama: Deep Navy dengan efek Noise halus (opsional via CSS)
    <main className="min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center p-4 relative overflow-hidden font-sans">
      
      {/* Efek Cahaya Neon Latar Belakang (Aura Glow) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-fuchsia-600 rounded-full blur-[160px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-cyan-500 rounded-full blur-[140px] opacity-15 pointer-events-none"></div>

      {/* Header / Navbar Simpel Modern */}
      <header className="w-full max-w-7xl flex justify-between items-center py-5 border-b border-slate-800/50 mb-10 relative z-10">
        <div className="flex items-center gap-2">
            {/* Icon Logo Simpel */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-fuchsia-500/20">
                <span className="font-black text-black text-xs">TT</span>
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">Snap<span className="text-fuchsia-500">Tik</span></span>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">v1.0 Global</span>
        </div>
      </header>

      {/* Konten Utama */}
      <div className="max-w-3xl w-full text-center flex flex-col items-center space-y-10 relative z-10 mt-10 md:mt-20">
        
        {/* Teks Judul Hero Khas SaaS Modern */}
        <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] text-white">
              Download TikTok<br />
              <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">Without Watermark</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto font-medium tracking-wide">
              Instantly save high-quality HD videos without logos. Fast, free, and secure for creators worldwide.
            </p>
        </div>

        {/* Kotak Input yang Didominasi Efek Glowing & Glassmorphism */}
        <div className="w-full max-w-2xl bg-[#0b1120]/60 backdrop-blur-xl p-3 rounded-3xl border border-slate-800/60 shadow-[0_0_60px_-10px_rgba(168,85,247,0.15)] flex flex-col sm:flex-row gap-3 transition-all hover:border-fuchsia-500/30">
          <input
            type="url"
            placeholder="Paste TikTok video link here..."
            className="flex-1 px-6 py-4 bg-slate-900/50 border border-slate-800/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 text-white placeholder-slate-600 text-base transition duration-300"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            onClick={handleDownload}
            disabled={loading}
            className="px-10 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 font-bold rounded-2xl hover:from-fuchsia-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-60 text-white shadow-lg shadow-fuchsia-500/30 hover:shadow-fuchsia-500/50 flex items-center justify-center gap-2 active:scale-95"
          >
            {loading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Processing
                </>
            ) : 'Download'}
          </button>
        </div>

        {/* Error Message yang Rapi */}
        {error && (
            <div className="bg-red-950/50 border border-red-500/50 text-red-300 px-6 py-3 rounded-xl text-sm font-medium animate-pulse">
                ⚠️ {error}
            </div>
        )}

        {/* Result Card: Efek Elevated Glassmorphism Premium */}
        {videoData && (
          <div className="w-full max-w-2xl bg-[#0b1120]/80 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-fuchsia-500/30 mt-10 shadow-[0_0_80px_-10px_rgba(34,211,238,0.15)] animate-fade-in transition-all">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                
                {/* Thumbnail dengan Glow halus */}
                <div className="relative shrink-0">
                    <img 
                      src={videoData.cover} 
                      alt="Video Cover" 
                      className="w-32 h-44 md:w-36 md:h-52 object-cover rounded-2xl shadow-xl border-2 border-slate-700/50 relative z-10" 
                    />
                    <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-30 rounded-full scale-75"></div>
                </div>

                {/* Info & Tombol */}
                <div className="flex-1 w-full text-center md:text-left space-y-5">
                  <div className="space-y-1">
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                          <span className="px-3 py-1 bg-cyan-950 text-cyan-300 text-xs font-bold rounded-full border border-cyan-500/30">HD QUALITY</span>
                          <span className="text-sm text-slate-500">No Watermark</span>
                      </div>
                      <p className="font-black text-2xl tracking-tighter text-white">@{videoData.author}</p>
                      <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto md:mx-0 leading-relaxed font-medium">
                        {videoData.title || 'Untitled TikTok Video'}
                      </p>
                  </div>
                  
                  {/* Tombol Unduh Kaca */}
                  <a
                    href={videoData.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-3 py-4 bg-slate-800/40 border border-slate-700 hover:border-cyan-500/50 text-cyan-300 font-bold rounded-2xl hover:bg-slate-800/80 transition-all duration-300 active:scale-95 shadow-lg group"
                  >
                    <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    SAVE HD VIDEO
                  </a>
                </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Minimalis Profesional */}
      <footer className="w-full max-w-7xl mt-auto py-10 border-t border-slate-800/50 relative z-10 text-center text-slate-600">
        <p className="text-xs font-medium tracking-wider">
          © 2026 SnapTik Global. Free Utility Tool. Not affiliated with TikTok.
        </p>
      </footer>

      {/* CSS Tambahan untuk Animasi Halus (Tempel di bagian paling bawah layout.js atau globals.css jika ingin sempurna, tapi di sini juga bisa) */}
      <style jsx global>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
        }
        /* Menggunakan font modern bawaan sistem yang bersih */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
            -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </main>
  );
}
