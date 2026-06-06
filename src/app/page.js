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
        setError('Tautan tidak valid. Pastikan Anda memasukkan link video TikTok yang benar.');
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
        setError(data.error || 'Video tidak ditemukan. Pastikan video tidak di-private.');
      }
    } catch (err) {
      setError('Gagal terhubung ke server. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* BACKGROUND DECORATION (Efek Glow Premium) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-indigo-600/10 via-purple-600/5 to-transparent blur-3xl pointer-events-none z-0"></div>

      {/* HEADER / NAVBAR */}
      <header className="w-full max-w-6xl flex justify-between items-center px-4 py-5 border-b border-slate-900 relative z-10">
        <div className="flex items-center gap-3">
            {/* LOGO WEB PREMIUM (SVG Kustom Terpercaya) */}
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
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold text-indigo-400 flex items-center gap-1.5 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Server Aktif
            </span>
        </div>
      </header>

      {/* HERO SECTION & INPUT AREA */}
      <section className="max-w-4xl w-full text-center px-4 pt-16 pb-12 relative z-10 flex flex-col items-center space-y-8">
        <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
                TikTok Video Downloader <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Tanpa Watermark Gratis</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-medium">
                Unduh video TikTok dengan kualitas HD terbaik secara instan. Cepat, aman, dan tanpa perlu login/pendaftaran.
            </p>
        </div>

        {/* KOTAK INPUT UTAMA */}
        <div className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl border border-slate-800 shadow-2xl flex flex-col sm:flex-row gap-2 transition-all focus-within:border-indigo-500/50">
          <input
            type="url"
            placeholder="Tempel tautan video TikTok di sini..."
            className="flex-1 px-5 py-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl focus:outline-none focus:border-slate-700 text-white placeholder-slate-600 text-sm transition"
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
            {loading ? (
                <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Memproses...
                </>
            ) : (
                <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    Unduh
                </>
            )}
          </button>
        </div>

        {/* NOTIFIKASI ERROR */}
        {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-3 rounded-xl text-xs font-semibold max-w-md animate-fade-in">
                {error}
            </div>
        )}

        {/* KOTAK HASIL (ELEVATED CARD STYLE) */}
        {videoData && (
          <div className="w-full max-w-xl bg-slate-900 border border-indigo-500/20 p-5 rounded-2xl text-left shadow-2xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-bl-xl tracking-wider uppercase">Sukses</div>
            <div className="flex gap-4 items-center sm:items-start">
                <img 
                  src={videoData.cover} 
                  alt="Video Cover" 
                  className="w-24 h-36 object-cover rounded-xl border border-slate-800 shrink-0 shadow-md" 
                />
                <div className="flex-1 min-w-0 space-y-4">
                  <div>
                      <p className="font-extrabold text-base text-white truncate">@{videoData.author}</p>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-medium leading-relaxed">
                        {videoData.title || 'Tidak ada deskripsi video.'}
                      </p>
                  </div>
                  <a
                    href={videoData.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-emerald-600/10 w-full sm:w-auto"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    DOWNLOAD MP4 (HD)
                  </a>
                </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION: KEUNGGULAN FITUR (GRID STYLE SEPERTI KOL.ID) */}
      <section className="w-full max-w-5xl px-4 py-12 border-t border-slate-900/60 relative z-10">
         <div className="text-center mb-10">
             <h2 className="text-xl md:text-2xl font-extrabold text-white">Kenapa Memilih TikSnap?</h2>
             <p className="text-xs text-slate-500 mt-1">Keunggulan utama alat pengunduh video kami</p>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
             {/* Fitur 1 */}
             <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-xl space-y-3">
                 <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                 </div>
                 <h3 className="font-bold text-sm text-white">Tanpa Watermark</h3>
                 <p className="text-xs text-slate-500 leading-relaxed">Hasil unduhan bersih total tanpa logo TikTok atau username yang mengganggu konten.</p>
             </div>
             {/* Fitur 2 */}
             <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-xl space-y-3">
                 <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                 </div>
                 <h3 className="font-bold text-sm text-white">Kecepatan Tinggi</h3>
                 <p className="text-xs text-slate-500 leading-relaxed">Proses konversi server super cepat, video langsung siap diunduh dalam hitungan detik.</p>
             </div>
             {/* Fitur 3 */}
             <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-xl space-y-3">
                 <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                 </div>
                 <h3 className="font-bold text-sm text-white">100% Aman & Privasi</h3>
                 <p className="text-xs text-slate-500 leading-relaxed">Kami tidak menyimpan data video atau tautan Anda. Sistem sepenuhnya anonim dan aman.</p>
             </div>
             {/* Fitur 4 */}
             <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-xl space-y-3">
                 <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 002-2H4a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                 </div>
                 <h3 className="font-bold text-sm text-white">Kompatibel Semua HP</h3>
                 <p className="text-xs text-slate-500 leading-relaxed">Lancar digunakan melalui browser iOS, Android, macOS, maupun perangkat Windows Anda.</p>
             </div>
         </div>
      </section>

      {/* SECTION: CARA DOWNLOAD (PANDUAN LALU LINTAS USER) */}
      <section className="w-full max-w-4xl px-4 py-12 border-t border-slate-900/60 relative z-10 bg-slate-900/20 rounded-3xl mb-16 border border-slate-900">
         <div className="text-center mb-10">
             <h2 className="text-xl md:text-2xl font-extrabold text-white">Cara Download Video TikTok Tanpa Watermark</h2>
             <p className="text-xs text-slate-500 mt-1">Ikuti 3 langkah mudah berikut ini</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
             <div className="flex gap-4 items-start">
                 <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700">1</div>
                 <div className="space-y-1">
                     <h4 className="font-bold text-sm text-white">Salin Tautan Video</h4>
                     <p className="text-xs text-slate-500 leading-relaxed">Buka aplikasi TikTok, pilih video yang ingin diunduh, klik tombol 'Bagikan' lalu pilih 'Salin Tautan'.</p>
                 </div>
             </div>
             <div className="flex gap-4 items-start">
                 <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700">2</div>
                 <div className="space-y-1">
                     <h4 className="font-bold text-sm text-white">Tempel Tautan Di Sini</h4>
                     <p className="text-xs text-slate-500 leading-relaxed">Kembali ke situs TikSnap, tempel tautan yang telah disalin ke dalam kolom input di atas.</p>
                 </div>
             </div>
             <div className="flex gap-4 items-start">
                 <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20">3</div>
                 <div className="space-y-1">
                     <h4 className="font-bold text-sm text-white">Unduh Video HD</h4>
                     <p className="text-xs text-slate-500 leading-relaxed">Klik tombol 'Unduh', tunggu konversi selesai, lalu klik tombol 'DOWNLOAD MP4' untuk menyimpan video.</p>
                 </div>
             </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full max-w-6xl mt-auto py-8 border-t border-slate-900 relative z-10 text-center text-slate-600 px-4">
        <p className="text-xs font-medium">
          © 2026 TikSnap Global. Layanan Utilitas Gratis. Kami tidak berafiliasi dengan TikTok resmi.
        </p>
      </footer>

      {/* STYLING TAMBAHAN ANIMASI */}
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
