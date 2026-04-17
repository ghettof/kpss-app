export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { ders, seviye, zorluk, konu } = req.body;

  const prompt = `Sen bir KPSS sınav uzmanısın. ${ders} dersinden, ${seviye} seviyesinde, ${zorluk} zorlukta${konu ? `, "${konu}" konusunda` : ''} 5 adet çoktan seçmeli soru üret.

Her soru için:
- Gerçekçi ve KPSS tarzında olsun
- 5 şık olsun (A, B, C, D, E)
- Doğru cevap ve kısa açıklama olsun

Yanıtı SADECE şu JSON formatında ver, başka hiçbir şey yazma:
[
  {
    "soru": "Soru metni",
    "secenekler": ["A) ...", "B) ...", "C) ...", "D) ...", "E) ..."],
    "cevap": 0,
    "aciklama": "Açıklama metni"
  }
]`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5', // ✅ Düzeltildi
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    // ✅ API hatasını yakala ve detaylı döndür
    if (!response.ok) {
      return res.status(500).json({ 
        error: 'Anthropic API hatası', 
        detail: data 
      });
    }

    const metin = data.content[0].text;
    const temiz = metin.replace(/```json|```/g, '').trim();
    const sorular = JSON.parse(temiz);
    return res.status(200).json(sorular);

  } catch (e) {
    return res.status(500).json({ error: e.message }); // ✅ Gerçek hatayı göster
  }
}