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
        setError('Please enter a valid TikTok video URL.');
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
        setError(data.error || 'Video not found or is set to private.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[100dvh] bg-[#fdfdfd] text-slate-800 flex flex-col relative font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      
      {/* BACKGROUND TEXTURE PRO (Grid Pattern & Soft Cinematic Glow) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-indigo-100/50 via-blue-50/30 to-transparent blur-3xl pointer-events-none z-0"></div>

      {/* HEADER PRO */}
      <header className="w-full max-w-5xl mx-auto flex justify-between items-center px-6 py-6 z-10 relative">
        <div className="flex items-center gap-3">
            {/* ICON PRO: Presisi & Elegan */}
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-500 opacity-10"></div>
                <svg className="w-5 h-5 text-indigo-600 relative z-10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4" className="opacity-30" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v10m0 0l3.5-3.5M12 15l-3.5-3.5M6 19h12" />
                </svg>
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                    Tik<span className="text-indigo-600">Snap</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1">
                    Pro Engine
                </span>
            </div>
        </div>
        <div>
            <div className="px-3 py-1.5 bg-white border border-slate-200/60 rounded-full text-[11px] font-bold text-slate-600 flex items-center gap-2 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                System Operational
            </div>
        </div>
      </header>

      {/* MAIN WRAPPER (Glassmorphism & Precision Lighting) */}
      <div className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-start z-10 mt-6 sm:mt-10">
        
        <div className="text-center space-y-3 mb-8">
             <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Extract Video <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">In True Quality.</span>
             </h1>
             <p className="text-sm text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
                Seamlessly download TikTok content without watermarks. Powered by enterprise-grade cloud servers.
             </p>
        </div>

        {/* PRO CONTAINER (White Glass Effect) */}
        <div className="w-full bg-white/80 backdrop-blur-2xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-2 sm:p-3 rounded-[2rem] transition-all duration-500 relative">
            
            {/* TABS (iOS Style Segmented Control) */}
            <div className="bg-slate-100/80 p-1.5 rounded-3xl flex gap-1 mb-4 border border-slate-200/50">
                {['download', 'guide', 'features'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-2xl transition-all duration-300 capitalize ${
                            activeTab === tab 
                            ? 'bg-white text-indigo-600 shadow-[0_2px_10px_rgba(0,0,0,0.04)]' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="p-2 sm:p-4 min-h-[280px]">
                {/* ================= TAB 1: DOWNLOADER ================= */}
                {activeTab === 'download' && (
                <div className="space-y-5 animate-fade-in w-full">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <input
                            type="url"
                            placeholder="Paste your TikTok link here..."
                            className="w-full pl-12 pr-5 py-4 bg-slate-50/50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl focus:outline-none text-slate-900 placeholder-slate-400 text-sm font-medium transition-all"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    
                    <button
                        onClick={handleDownload}
                        disabled={loading}
                        className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                EXTRACTING MEDIA...
                            </>
                        ) : 'START DOWNLOAD'}
                    </button>

                    {error && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 py-3 px-4 rounded-xl border border-red-100 text-xs font-bold animate-fade-in">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {error}
                        </div>
                    )}

                    {videoData && (
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex gap-4 animate-slide-up shadow-sm">
                        <img src={videoData.cover} alt="Cover" className="w-20 h-28 object-cover rounded-xl border border-slate-200 shadow-sm" />
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                            <div>
                                <p className="font-bold text-sm text-slate-900 truncate">@{videoData.author}</p>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                    {videoData.title || 'Extracted Media File'}
                                </p>
                            </div>
                            <a href={videoData.videoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Save to Device
                            </a>
                        </div>
                    </div>
                    )}
                </div>
                )}

                {/* ================= TAB 2: GUIDE ================= */}
                {activeTab === 'guide' && (
                <div className="space-y-3 animate-fade-in w-full">
                    {[
                        { step: 1, title: 'Locate Video', desc: 'Find your target video on the TikTok app or web.' },
                        { step: 2, title: 'Copy URL', desc: 'Tap the share icon and select "Copy Link".' },
                        { step: 3, title: 'Extract & Save', desc: 'Paste the link here and initiate the download.' }
                    ].map((item) => (
                        <div key={item.step} className="group p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all flex gap-4 items-center">
                            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                {item.step}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                )}

                {/* ================= TAB 3: FEATURES ================= */}
                {activeTab === 'features' && (
                <div className="grid grid-cols-2 gap-3 animate-fade-in w-full">
                    {[
                        { icon: '🎥', title: 'Original Quality', desc: 'Preserves the original HD resolution.' },
                        { icon: '✨', title: 'Clean Output', desc: 'Removes all platform watermarks automatically.' },
                        { icon: '⚡', title: 'Edge Network', desc: 'Routed via global edge servers for speed.' },
                        { icon: '🛡️', title: 'Privacy First', desc: 'No user data or history is ever logged.' }
                    ].map((feat, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100/80 space-y-2 hover:shadow-md transition-all">
                            <span className="text-lg bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm border border-slate-100">{feat.icon}</span>
                            <div>
                                <h4 className="font-bold text-xs text-slate-900">{feat.title}</h4>
                                <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{feat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full mt-auto py-8 text-center z-10">
        <p className="text-[11px] font-medium text-slate-400 tracking-wide">
          © 2026 TikSnap Pro Edition. Independent Utility Platform.
        </p>
      </footer>

      <style jsx global>{`
        @keyframes fade-in {
            from { opacity: 0; filter: blur(4px); }
            to { opacity: 1; filter: blur(0); }
        }
        @keyframes slide-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }
        .animate-slide-up {
            animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        body {
            background-color: #fdfdfd;
        }
        /* Custom Scrollbar for Pro look */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
      `}</style>
    </main>
  );
}
