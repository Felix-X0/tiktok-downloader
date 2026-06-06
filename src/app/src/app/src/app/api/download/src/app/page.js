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
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full text-center space-y-6">
        
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          TikTok Downloader
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          Download TikTok videos without watermark in High Quality HD for free.
        </p>

        {/* Form Input */}
        <form onSubmit={handleDownload} className="flex flex-col sm:flex-row gap-2 mt-4">
          <input
            type="url"
            placeholder="Paste TikTok link here (e.g., https://vm.tiktok.com/...)"
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-850 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-slate-500 text-sm"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-cyan-500 font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50 text-slate-950 font-bold text-sm"
          >
            {loading ? 'Processing...' : 'Download'}
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

        {/* Result Card */}
        {videoData && (
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 mt-6 flex flex-col items-center space-y-4 shadow-2xl">
            <img 
              src={videoData.cover} 
              alt="Video Cover" 
              className="w-32 h-44 object-cover rounded-lg shadow-md border border-slate-700" 
            />
            <div className="text-center w-full">
              <p className="font-bold text-lg text-cyan-400">@{videoData.author}</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto truncate px-2">
                {videoData.title || 'No Title'}
              </p>
            </div>
            
            {/* Tombol Aksi Unduh */}
            <a
              href={videoData.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-block text-center py-3 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold rounded-lg hover:opacity-90 transition shadow-lg"
            >
              Download Video (HD No Watermark)
            </a>
          </div>
        )}

        {/* Footer info */}
        <p className="text-xs text-slate-600 mt-8">
          Our service is free and requires no registration or software installation.
        </p>
      </div>
    </main>
  );
}
