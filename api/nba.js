export default async function handler(req, res) {
  // 取得 /api/nba/ 後面的路徑
  const path = req.url.replace('/api/nba', '').replace(/^\/?/, '');
  const url = `https://cdn.nba.com/static/json/${path}`;

  try {
    const r = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Referer': 'https://www.nba.com/',
        'User-Agent': 'Mozilla/5.0 (compatible; Courtside/1.0)',
      },
    });

    if (!r.ok) {
      res.status(r.status).json({ error: `NBA API error: ${r.status}` });
      return;
    }

    const data = await r.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=5');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
