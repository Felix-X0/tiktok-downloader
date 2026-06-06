import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Menggunakan API publik gratis dari TikWM (stabil dan tanpa perlu API key)
    const response = await fetch('https://www.tikwm.com/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        url: url,
        hd: '1' // Request video kualitas HD
      }),
    });

    const result = await response.json();

    if (result.code === 0 && result.data) {
      return NextResponse.json({
        success: true,
        title: result.data.title,
        cover: result.data.cover,
        videoUrl: result.data.play, // Link video tanpa watermark
        author: result.data.author.nickname
      });
    } else {
      return NextResponse.json({ error: 'Invalid TikTok URL or video not found.' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
