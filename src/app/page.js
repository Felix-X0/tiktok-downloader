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

    if (!url.includes('tiktok.com')) {
        setError('Invalid link. Please paste a valid TikTok video URL.');
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
        setError(data.error || 'Video not found. Is it private or deleted?');
      }
    } catch (err) {
      setError('Server connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-indigo-600/10 via-purple-600/5 to-transparent blur-3xl pointer-events-none z-0"></div>

      {/* HEADER */}
      <header className="w-full max-w-6xl flex justify-between items-center px-4 py-5 border-b border-slate-900 relative z-10">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path>
                </svg>
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white leading-none">Tik<span className="text-indigo-400">Snap</span></span>
                <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase mt-0.5">HD Downloader</span>
            </div>
        </div>
        <div>
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold text-indigo-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Global Server Online
            </span>
        </div>
      </header>

      {/* HERO & INPUT */}
      <section className="max-w-4xl w-full text-center px-4 pt-16 pb-6 relative z-10 flex flex-col items-center space-y-8">
        <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
                TikTok Video Downloader <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Without Watermark for Free</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-medium">
                Download TikTok videos in ultra high-quality HD quality instantly. Fast, anonymous, and no registration required.
            </p>
        </div>

        {/* SLOT IKLAN ATAS (RESPONSIVE AD SLOT) */}
        <div className="w-full max-w-2xl bg-slate-900/30 border border-dashed border-slate-800 py-3 rounded-xl text-center text-xs text-slate-600 tracking-widest uppercase">
            [ ADVERTISEMENT SLOT 1 ]
        </div>

        {/* INPUT BOX */}
        <div className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl border border-slate-800 shadow-2xl flex flex-col sm:flex-row gap-2 transition-all focus-within:border-indigo-500/50">
          <input
            type="url"
            placeholder="Paste TikTok video link here..."
            className="flex-1 px-5 py-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl focus:outline-none text-white placeholder-slate-600 text-sm"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            onClick={handleDownload}
            disabled={loading}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold rounded-xl transition disabled:opacity-60 shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 text-sm shrink-0"
          >
            {loading ? 'Processing...' : 'Download'}
          </button>
        </div>

        {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-3 rounded-xl text-xs font-semibold max-w-md">
                {error}
            </div>
        )}

        {/* DOWNLOAD RESULT */}
        {videoData && (
          <div className="w-full max-w-xl bg-slate-900 border border-indigo-500/20 p-5 rounded-2xl text-left shadow-2xl animate-fade-in relative">
            <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-bl-xl tracking-wider uppercase">Success</div>
            <div className="flex gap-4 items-center sm:items-start">
                <img src={videoData.cover} alt="Cover" className="w-24 h-36 object-cover rounded-xl border border-slate-800 shrink-0 shadow-md" />
                <div className="flex-1 min-w-0 space-y-4">
                  <div>
                      <p className="font-extrabold text-base text-white truncate">@{videoData.author}</p>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-medium leading-relaxed">
                        {videoData.title || 'No description available.'}
                      </p>
                  </div>
                  <a
                    href={videoData.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-lg w-full sm:w-auto"
                  >
                    DOWNLOAD VIDEO (HD)
                  </a>
                </div>
            </div>
          </div>
        )}

        {/* SLOT IKLAN BAWAH (STRATEGIS DI BAWAH TOMBOL) */}
        <div className="w-full max-w-2xl bg-slate-900/30 border border-dashed border-slate-800 py-6 rounded-xl text-center text-xs text-slate-600 tracking-widest uppercase">
            [ ADVERTISEMENT SLOT 2 ]
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="w-full max-w-5xl px-4 py-12 border-t border-slate-900/60 relative z-10">
         <div className="text-center mb-10">
             <h2 className="text-xl md:text-2xl font-extrabold text-white">Why Use TikSnap?</h2>
             <p className="text-xs text-slate-500 mt-1">The best features of our premium video downloader</p>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
             <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-xl space-y-3">
                 <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">⚡</div>
                 <h3 className="font-bold text-sm text-white">No Watermark</h3>
                 <p className="text-xs text-slate-500 leading-relaxed">Get clean video files completely free from annoying logos or user tags.</p>
             </div>
             <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-xl space-y-3">
                 <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">🚀</div>
                 <h3 className="font-bold text-sm text-white">High Speed</h3>
                 <p className="text-xs text-slate-500 leading-relaxed">Our servers process the request instantly. Your video is ready in seconds.</p>
             </div>
             <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-xl space-y-3">
                 <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center">🛡️</div>
                 <h3 className="font-bold text-sm text-white">100% Secure</h3>
                 <p className="text-xs text-slate-500 leading-relaxed">We respect your privacy. We do not store any logs or downloaded videos.</p>
             </div>
             <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-xl space-y-3">
                 <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">📱</div>
                 <h3 className="font-bold text-sm text-white">All Devices</h3>
                 <p className="text-xs text-slate-500 leading-relaxed">Works perfectly on iOS, Android, Windows, and macOS via web browser.</p>
             </div>
         </div>
      </section>

      {/* HOW TO DOWNLOAD */}
      <section className="w-full max-w-4xl px-4 py-12 border-t border-slate-900/60 relative z-10 bg-slate-900/20 rounded-3xl mb-16 border border-slate-900">
         <div className="text-center mb-10">
             <h2 className="text-xl md:text-2xl font-extrabold text-white">How to Download TikTok Videos Without Watermark</h2>
             <p className="text-xs text-slate-500 mt-1">Follow these 3 simple steps</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
             <div className="flex gap-4 items-start">
                 <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700">1</div>
                 <div className="space-y-1">
                     <h4 className="font-bold text-sm text-white">Copy Video Link</h4>
                     <p className="text-xs text-slate-500 leading-relaxed">Open TikTok app, tap the "Share" button on your video, and select "Copy Link".</p>
                 </div>
             </div>
             <div className="flex gap-4 items-start">
                 <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700">2</div>
                 <div className="space-y-1">
                     <h4 className="font-bold text-sm text-white">Paste Link Here</h4>
                     <p className="text-xs text-slate-500 leading-relaxed">Return to TikSnap, paste the link into the URL input box at the top of the page.</p>
                 </div>
             </div>
             <div className="flex gap-4 items-start">
                 <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md">3</div>
                 <div className="space-y-1">
                     <h4 className="font-bold text-sm text-white">Get Your Video</h4>
                     <p className="text-xs text-slate-500 leading-relaxed">Click the "Download" button, wait for processing, and click "DOWNLOAD VIDEO".</p>
                 </div>
             </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full max-w-6xl mt-auto py-8 border-t border-slate-900 relative z-10 text-center text-slate-600 px-4">
        <p className="text-xs font-medium">
          © 2026 TikSnap Global. Free Premium Utility. We are not affiliated with TikTok inc.
        </p>
      </footer>

      <style jsx global>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.4s ease-out forwards;
        }
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            background-color: #020617;
        }
      `}</style>
    </main>
  );
}
