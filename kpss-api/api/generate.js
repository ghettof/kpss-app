export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY tanımlı değil (Vercel env variable eksik)' });
  }

  const { ders, seviye, zorluk, konu } = req.body || {};

  if (!ders || !seviye || !zorluk) {
    return res.status(400).json({ error: 'ders, seviye ve zorluk alanları zorunlu' });
  }

  const prompt = `Sen bir KPSS sınav uzmanısın. ${ders} dersinden, ${seviye} seviyesinde, ${zorluk} zorlukta${konu ? `, "${konu}" konusunda` : ''} 5 adet çoktan seçmeli soru üret.

Her soru için:
- Gerçekçi ve KPSS tarzında olsun
- 5 şık olsun (A, B, C, D, E)
- Doğru cevap ve kısa açıklama olsun

Yanıtı SADECE şu JSON formatında ver, başka hiçbir şey yazma, markdown code block kullanma:
[
  {
    "soru": "Soru metni",
    "secenekler": ["A) ...", "B) ...", "C) ...", "D) ...", "E) ..."],
    "cevap": 0,
    "aciklama": "Açıklama metni"
  }
]`;

  // 25 saniyede timeout — Vercel function'ın 30sn sınırının altında kalıp
  // kullanıcıya anlamlı bir hata dönebilmek için
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    clearTimeout(timeout);

    const data = await response.json();

    if (!response.ok) {
      return res.status(502).json({
        error: 'Anthropic API hatası',
        detail: data?.error?.message || data,
      });
    }

    const metin = data?.content?.[0]?.text;
    if (!metin) {
      return res.status(502).json({ error: 'Anthropic yanıtında beklenen içerik yok', detail: data });
    }

    const temiz = metin.replace(/```json|```/g, '').trim();

    let sorular;
    try {
      sorular = JSON.parse(temiz);
    } catch (parseErr) {
      return res.status(502).json({ error: 'Model yanıtı geçerli JSON değil', raw: temiz });
    }

    if (!Array.isArray(sorular) || sorular.length === 0) {
      return res.status(502).json({ error: 'Beklenen formatta soru listesi gelmedi', raw: sorular });
    }

    return res.status(200).json(sorular);

  } catch (e) {
    clearTimeout(timeout);
    if (e.name === 'AbortError') {
      return res.status(504).json({ error: 'İstek zaman aşımına uğradı (25sn), tekrar deneyin' });
    }
    return res.status(500).json({ error: e.message });
  }
}
