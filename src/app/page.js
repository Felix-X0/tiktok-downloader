'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('download'); // State untuk kontrol 3 lembar
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
        setError('Invalid link! Please paste a valid TikTok video URL.');
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
        setError(data.error || 'Video not found. Make sure the video is public.');
      }
    } catch (err) {
      setError('Server connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Background sinematik kaya warna (Deep Slate dengan Aura Neon Indigo-Purple)
    <main className="min-h-[100dvh] bg-[#090d16] text-white flex flex-col relative font-sans antialiased overflow-x-hidden">
      
      {/* Ornamen Desain Latar Belakang (Aura Glow Berwarna) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* HEADER / NAVBAR TRUSTED LOGO */}
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center px-6 py-5 z-10">
        <div className="flex items-center gap-3">
            {/* Logo SVG Premium Mewah & Terpercaya */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-pulse">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path>
                </svg>
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white leading-none">Tik<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Snap</span></span>
                <span className="text-[9px] text-indigo-300 font-extrabold tracking-widest uppercase mt-1">Premium Downloader</span>
            </div>
        </div>
        <div>
            <span className="px-3 py-1 bg-indigo-950/50 border border-indigo-500/30 rounded-full text-[11px] font-bold text-indigo-300 flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Global Engine v2.0
            </span>
        </div>
      </header>

      {/* HERO TITLE (Selalu Terlihat Menarik di Atas) */}
      <section className="text-center px-6 pt-8 pb-4 z-10 max-w-2xl mx-auto space-y-2">
         <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-white">
            TikTok Video Downloader
         </h1>
         <p className="text-xs md:text-sm text-slate-400 font-medium">
            High-speed cloud processing without logos. Save your favorite videos instantly.
         </p>
      </section>

      {/* SEGMENTED CONTROLLER (Navigasi 3 Lembar yang Mewah) */}
      <div className="w-full max-w-md mx-auto px-6 z-10 mt-2">
         <div className="bg-slate-900/80 p-1 rounded-2xl border border-slate-800/80 flex gap-1 shadow-xl backdrop-blur-md">
             <button 
                 onClick={() => setActiveTab('download')}
                 className={`flex-1 py-3 text-xs font-black rounded-xl transition-all duration-300 ${activeTab === 'download' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}
             >
                 ⚡ Download
             </button>
             <button 
                 onClick={() => setActiveTab('guide')}
                 className={`flex-1 py-3 text-xs font-black rounded-xl transition-all duration-300 ${activeTab === 'guide' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}
             >
                 📖 Guide
             </button>
             <button 
                 onClick={() => setActiveTab('features')}
                 className={`flex-1 py-3 text-xs font-black rounded-xl transition-all duration-300 ${activeTab === 'features' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}
             >
                 💎 Features
             </button>
         </div>
      </div>

      {/* AREA LEMBAR KONTEN INTERAKTIF */}
      <div className="flex-1 w-full max-w-xl mx-auto p-6 flex flex-col justify-start z-10 mt-4 min-h-[350px]">
        
        {/* ================= LEMBAR 1: DOWNLOADER ================= */}
        {activeTab === 'download' && (
          <div className="space-y-6 animate-slide-in w-full">
            <div className="bg-slate-900/60 border border-slate-800 p-4 md:p-6 rounded-3xl shadow-2xl backdrop-blur-md space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-extrabold text-indigo-400 tracking-wider uppercase px-1">Paste TikTok URL Below</label>
                    <input
                        type="url"
                        placeholder="https://vm.tiktok.com/..."
                        className="w-full px-5 py-4 bg-slate-950 border border-slate-800 focus:border-indigo-500/60 rounded-xl focus:outline-none text-white placeholder-slate-600 text-sm font-medium transition-all shadow-inner"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                
                <button
                    onClick={handleDownload}
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white font-black text-sm rounded-xl active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            CONVERTING NOW...
                        </>
                    ) : 'GET VIDEO FILE'}
                </button>
            </div>

            {error && <p className="text-red-400 text-center text-xs font-bold bg-red-500/10 py-3 px-4 rounded-xl border border-red-500/20 animate-pulse">⚠️ {error}</p>}

            {/* HASIL UNDUHAN EDITAN KAYA WARNA */}
            {videoData && (
              <div className="bg-gradient-to-b from-slate-900 to-indigo-950/40 border border-indigo-500/30 p-5 rounded-3xl flex gap-4 animate-scale-up shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-bl-xl tracking-widest uppercase">HD UNLOCKED</div>
                  <img src={videoData.cover} alt="Cover" className="w-24 h-36 object-cover rounded-xl border border-slate-800 shrink-0 shadow-lg" />
                  <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                      <div>
                          <p className="font-black text-base text-white truncate">@{videoData.author}</p>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-medium leading-relaxed">
                            {videoData.title || 'No description provided.'}
                          </p>
                      </div>
                      <a href={videoData.videoUrl} target="_blank" rel="noreferrer" className="w-full text-center py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-black rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all tracking-wider uppercase">
                          Download Server MP4
                      </a>
                  </div>
              </div>
            )}
          </div>
        )}

        {/* ================= LEMBAR 2: PANDUAN BERGAYA KARTU ================= */}
        {activeTab === 'guide' && (
          <div className="space-y-4 animate-slide-in w-full">
            <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-2xl flex gap-4 items-center transition-all hover:border-indigo-500/30">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-black shadow-md shrink-0">1</div>
                <div>
                    <h4 className="font-extrabold text-sm text-white">Copy Link</h4>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Tap Share on TikTok and select Copy Link.</p>
                </div>
            </div>
            <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-2xl flex gap-4 items-center transition-all hover:border-purple-500/30">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-black shadow-md shrink-0">2</div>
                <div>
                    <h4 className="font-extrabold text-sm text-white">Paste URL</h4>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Switch to 'Download' tab and paste your link.</p>
                </div>
            </div>
            <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-2xl flex gap-4 items-center transition-all hover:border-pink-500/30">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 text-white flex items-center justify-center font-black shadow-md shrink-0">3</div>
                <div>
                    <h4 className="font-extrabold text-sm text-white">Save Media</h4>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Click Download button and secure your file instantly.</p>
                </div>
            </div>
          </div>
        )}

        {/* ================= LEMBAR 3: FITUR GRID KAYA WARNA ================= */}
        {activeTab === 'features' && (
          <div className="grid grid-cols-2 gap-3 animate-slide-in w-full">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-lg">🔥</span>
                <h4 className="font-extrabold text-xs text-white tracking-tight">Zero Watermark</h4>
                <p className="text-[11px] text-slate-500 leading-normal font-medium">Completely clean files without brand logos.</p>
            </div>
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-lg">⚡</span>
                <h4 className="font-extrabold text-xs text-white tracking-tight">Cloud Engine</h4>
                <p className="text-[11px] text-slate-500 leading-normal font-medium">Ultra-fast response backend processing.</p>
            </div>
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-lg">🔒</span>
                <h4 className="font-extrabold text-xs text-white tracking-tight">Safe & Anonymous</h4>
                <p className="text-[11px] text-slate-500 leading-normal font-medium">No tracking, no registration data required.</p>
            </div>
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-lg">🌍</span>
                <h4 className="font-extrabold text-xs text-white tracking-tight">Global Support</h4>
                <p className="text-[11px] text-slate-500 leading-normal font-medium">Compatible across all iOS, Android & PC systems.</p>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="w-full max-w-4xl mx-auto py-6 border-t border-slate-900 text-center text-slate-600 px-6 z-10">
        <p className="text-[11px] font-medium tracking-wide">
          © 2026 TikSnap Global. High-fidelity independent web utility. Not affiliated with TikTok Inc.
        </p>
      </footer>

      {/* ANIMASI TRANSISI HALUS */}
      <style jsx global>{`
        @keyframes slide-in {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-up {
            from { opacity: 0; transform: scale(0.97); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-slide-in {
            animation: slide-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-up {
            animation: scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        body {
            background-color: #090d16;
        }
      `}</style>
    </main>
  );
}
