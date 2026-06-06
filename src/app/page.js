'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('download');
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
        setError('Invalid link! Please enter a valid TikTok video URL.');
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
        setError(data.error || 'Video not found. Please ensure the video is public.');
      }
    } catch (err) {
      setError('Server connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[100dvh] bg-[#f8fafc] text-slate-900 flex flex-col relative font-sans antialiased overflow-x-hidden">
      
      {/* Background Soft Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-blue-50 via-indigo-50/50 to-transparent pointer-events-none z-0"></div>

      {/* HEADER / NAVBAR */}
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center px-6 py-5 z-10 border-b border-slate-200/60 bg-white/60 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-3">
            
            {/* LOGO BARU: PERPADUAN BULAT & SEGITIGA DOWNLOAD MODERN */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0 relative overflow-hidden group">
                {/* Efek Kilauan Segitiga Latar Belakang */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
                {/* Ikon Kombinasi Segitiga Play + Panah Download */}
                <svg className="w-5 h-5 text-white relative z-10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    {/* Lingkaran Internal Halus */}
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
                    {/* Segitiga Play / Bentuk Panah Tajam Modern */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m0-15l8.5 7.5L9 19.5M9 12h11" className="hidden" />
                    {/* Desain Panah Download Eksklusif */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l4-4m-4 4l-4-4M4 18h16" />
                </svg>
            </div>

            <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900 leading-none">Tik<span className="text-blue-600">Snap</span></span>
                <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mt-1">Next-Gen Downloader</span>
            </div>
        </div>
        <div>
            <span className="px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-bold text-blue-600 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Ultra Node Active
            </span>
        </div>
      </header>

      {/* HERO TITLE */}
      <section className="text-center px-6 pt-10 pb-4 z-10 max-w-2xl mx-auto space-y-2">
         <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">
            TikTok Video Downloader
         </h1>
         <p className="text-xs md:text-sm text-slate-500 font-semibold tracking-wide">
            Download high-quality videos without watermark. Fast, secure, and completely free.
         </p>
      </section>

      {/* CONTROLLER 3 LEMBAR */}
      <div className="w-full max-w-md mx-auto px-6 z-10 mt-2">
         <div className="bg-slate-200/70 p-1 rounded-2xl flex gap-1 shadow-inner border border-slate-300/30 backdrop-blur-md">
             <button 
                 onClick={() => setActiveTab('download')}
                 className={`flex-1 py-3 text-xs font-black rounded-xl transition-all duration-300 ${activeTab === 'download' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
             >
                 ⚡ Download
             </button>
             <button 
                 onClick={() => setActiveTab('guide')}
                 className={`flex-1 py-3 text-xs font-black rounded-xl transition-all duration-300 ${activeTab === 'guide' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
             >
                 📖 Guide
             </button>
             <button 
                 onClick={() => setActiveTab('features')}
                 className={`flex-1 py-3 text-xs font-black rounded-xl transition-all duration-300 ${activeTab === 'features' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
             >
                 💎 Features
             </button>
         </div>
      </div>

      {/* AREA LEMBAR KONTEN INTERAKTIF */}
      <div className="flex-1 w-full max-w-xl mx-auto p-6 flex flex-col justify-start z-10 mt-2 min-h-[350px]">
        
        {/* ================= LEMBAR 1: DOWNLOADER ================= */}
        {activeTab === 'download' && (
          <div className="space-y-6 animate-slide-in w-full">
            <div className="bg-white border border-slate-200 p-5 md:p-6 rounded-3xl shadow-xl shadow-slate-200/50 space-y-4">
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase px-1">Paste TikTok Link Below</label>
                    <input
                        type="url"
                        placeholder="https://www.tiktok.com/@username/video/..."
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl focus:outline-none text-slate-900 placeholder-slate-400 text-sm font-medium transition-all"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                
                <button
                    onClick={handleDownload}
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-black text-sm rounded-xl active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            PROCESSING...
                        </>
                    ) : 'DOWNLOAD VIDEO'}
                </button>
            </div>

            {error && <p className="text-red-600 text-center text-xs font-bold bg-red-50/80 py-3 px-4 rounded-xl border border-red-200 animate-pulse">⚠️ {error}</p>}

            {/* HASIL UNDUHAN KARTU PUTIH BERSIH */}
            {videoData && (
              <div className="bg-white border border-blue-100 p-5 rounded-3xl flex gap-4 animate-scale-up shadow-xl shadow-blue-500/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-bl-xl tracking-widest uppercase">HD READY</div>
                  <img src={videoData.cover} alt="Cover" className="w-24 h-36 object-cover rounded-xl border border-slate-100 shrink-0 shadow-md" />
                  <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                      <div>
                          <p className="font-black text-base text-slate-900 truncate">@{videoData.author}</p>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 font-medium leading-relaxed">
                            {videoData.title || 'TikTok Video File'}
                          </p>
                      </div>
                      <a href={videoData.videoUrl} target="_blank" rel="noreferrer" className="w-full text-center py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-500/10 active:scale-95 transition-all tracking-wider uppercase">
                          SAVE VIDEO NOW
                      </a>
                  </div>
              </div>
            )}
          </div>
        )}

        {/* ================= LEMBAR 2: PANDUAN BERGAYA KARTU CERAH ================= */}
        {activeTab === 'guide' && (
          <div className="space-y-4 animate-slide-in w-full">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex gap-4 items-center shadow-sm transition-all hover:border-blue-500/30">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black border border-blue-100 shadow-sm shrink-0">1</div>
                <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Copy URL</h4>
                    <p className="text-xs text-slate-500 mt-0.5 font-semibold">Open TikTok, click share and select 'Copy Link'.</p>
                </div>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex gap-4 items-center shadow-sm transition-all hover:border-blue-500/30">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black border border-indigo-100 shadow-sm shrink-0">2</div>
                <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Paste Link</h4>
                    <p className="text-xs text-slate-500 mt-0.5 font-semibold">Navigate back here, open 'Download' tab and paste.</p>
                </div>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex gap-4 items-center shadow-sm transition-all hover:border-blue-500/30">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black border border-purple-100 shadow-sm shrink-0">3</div>
                <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Get File</h4>
                    <p className="text-xs text-slate-500 mt-0.5 font-semibold">Click Download and save your watermark-free video.</p>
                </div>
            </div>
          </div>
        )}

        {/* ================= LEMBAR 3: FITUR GRID BERWARNA SEGAR ================= */}
        {activeTab === 'features' && (
          <div className="grid grid-cols-2 gap-3 animate-slide-in w-full">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                <span className="text-lg">✨</span>
                <h4 className="font-extrabold text-xs text-slate-900 tracking-tight">No Watermark</h4>
                <p className="text-[11px] text-slate-500 leading-normal font-semibold">Clean video files without any logo overlays.</p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                <span className="text-lg">⚡</span>
                <h4 className="font-extrabold text-xs text-slate-900 tracking-tight">High Speed</h4>
                <p className="text-[11px] text-slate-500 leading-normal font-semibold">Instant processing via advanced cloud server.</p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                <span className="text-lg">🔒</span>
                <h4 className="font-extrabold text-xs text-slate-900 tracking-tight">Secure Service</h4>
                <p className="text-[11px] text-slate-500 leading-normal font-semibold">No data logging, 100% private and safe.</p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                <span className="text-lg">💻</span>
                <h4 className="font-extrabold text-xs text-slate-900 tracking-tight">Fully Responsive</h4>
                <p className="text-[11px] text-slate-500 leading-normal font-semibold">Works perfectly on iOS, Android, and PC browsers.</p>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="w-full max-w-4xl mx-auto py-6 border-t border-slate-200 text-center text-slate-400 px-6 z-10 mt-auto">
        <p className="text-[11px] font-bold tracking-wide">
          © 2026 TikSnap Global. Free Premium Utility. Not affiliated with TikTok Official.
        </p>
      </footer>

      {/* ANIMASI TRANSISI */}
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
            animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-up {
            animation: scale-up 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        body {
            background-color: #f8fafc;
        }
      `}</style>
    </main>
  );
}
