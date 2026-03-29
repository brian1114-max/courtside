export default async function handler(req, res) {
  const path = req.url.replace('/api/f1', '').replace(/^\/?/, '');
  const url = `https://api.jolpi.ca/ergast/f1/${path}`;

  try {
    const r = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; Courtside/1.0)',
      },
    });

    if (!r.ok) {
      res.status(r.status).json({ error: `F1 API error: ${r.status}` });
      return;
    }

    const data = await r.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
