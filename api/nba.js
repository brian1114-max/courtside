export default async function handler(req, res) {
  // path 從 query parameter 傳進來（由 vercel.json rewrites 設定）
  const path = req.query.path ? [].concat(req.query.path).join('/') : '';
  const qs = Object.entries(req.query)
    .filter(([k]) => k !== 'path')
    .map(([k,v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');
  const url = `https://cdn.nba.com/static/json/${path}${qs ? '?'+qs : ''}`;

  try {
    const r = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    if (!r.ok) { res.status(r.status).json({ error: `NBA API ${r.status}` }); return; }
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=5');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message, url });
  }
}
