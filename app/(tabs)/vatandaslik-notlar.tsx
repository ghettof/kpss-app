import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RENK = '#9b59b6';

const KONULAR = [
  {
    baslik: '📌 Anayasanın Temel İlkeleri',
    icerik: `• 1982 Anayasası halk oylamasıyla kabul edildi
• Türkiye: Demokratik, laik, sosyal hukuk devleti (Madde 2)
• Devletin şekli değiştirilemez (Cumhuriyet)
• Temel haklar: Ancak kanunla kısıtlanabilir (Madde 12)
• Yargı yetkisi: Türk Milleti adına bağımsız mahkemelerce kullanılır`,
  },
  {
    baslik: '📌 TBMM ve Seçimler',
    icerik: `• TBMM: 600 milletvekili (2017 referandumuyla 550'den artırıldı)
• Seçim dönemi: 5 yıl
• Oy kullanma yaşı: 18
• Parti grup kurma: En az 20 milletvekili
• Yasama dokunulmazlığı: Görev süresince yargılanamama
• Milletvekilliği düşer: Cumhurbaşkanı seçilme veya bakan olma`,
  },
  {
    baslik: '📌 Cumhurbaşkanlığı',
    icerik: `• Seçim: 5 yılda bir, en fazla 2 dönem
• Asgari yaş: 40
• CB kararnamesi: Resmi Gazete'de yayımlandığı gün yürürlüğe girer
• Devlet Denetleme Kurulu (DDK): Cumhurbaşkanlığına bağlı
• Cumhurbaşkanlığı Forsunda: 16 yıldız`,
  },
  {
    baslik: '📌 Yüksek Mahkemeler',
    icerik: `• Anayasa Mahkemesi: 15 asıl üye, 1961 Anayasası ile kuruldu
• Anayasa değişikliği: En az 360 oy
• HSK (Hâkimler ve Savcılar Kurulu): 13 üye
• YSK (Yüksek Seçim Kurulu): 7 asıl, 4 yedek (11 toplam)
• Sayıştay: TBMM adına denetim yapar
• Yüksek Mahkemeler: Anayasa Mahkemesi, Yargıtay, Danıştay, Uyuşmazlık Mahkemesi`,
  },
  {
    baslik: '📌 İdare Hukuku',
    icerik: `• Vali: İl idaresinin başı
• Olağanüstü hal: 6 ay ile sınırlı, uzatılabilir
• Kamu Denetçiliği Kurumu: TBMM Başkanlığına bağlı
• Siyasi partilerin mali denetimi: Anayasa Mahkemesi (Sayıştay yardımıyla)
• İstinaf mahkemesi: Bölge Adliye Mahkemesi
• Emredici kural: Aksi kararlaştırılamayan, uyulması zorunlu kurallar`,
  },
  {
    baslik: '📌 Temel Hukuk Kavramları',
    icerik: `• CB kararnamesi kanunlara aykırı olamaz
• Anayasa değişikliği: 360 oy kabul, 400 oy referandumsuz yürürlük
• Siyasi parti kapatma: Anayasa Mahkemesi kararıyla
• Temel hakların özüne dokunulamaz
• Siyasi partiler: Demokratik ve laik cumhuriyet ilkelerine aykırı olamaz`,
  },
];

export default function VatandaslikNotlar() {
  const [acikKonu, setAcikKonu] = useState<number | null>(null);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.geriDon}>
        <Text style={styles.geriDonText}>← Geri</Text>
      </TouchableOpacity>
      <Text style={[styles.baslik, { color: RENK }]}>⚖️ Vatandaşlık Notları</Text>
      {KONULAR.map((konu, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.konuKart, { borderColor: acikKonu === i ? RENK : '#2a2a3e' }]}
          onPress={() => setAcikKonu(acikKonu === i ? null : i)}
          activeOpacity={0.8}
        >
          <View style={styles.konuBaslikRow}>
            <Text style={[styles.konuBaslik, acikKonu === i && { color: RENK }]}>{konu.baslik}</Text>
            <Text style={{ color: acikKonu === i ? RENK : '#666', fontSize: 16 }}>
              {acikKonu === i ? '▲' : '▼'}
            </Text>
          </View>
          {acikKonu === i && (
            <Text style={styles.konuIcerik}>{konu.icerik}</Text>
          )}
        </TouchableOpacity>
      ))}
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a', padding: 16 },
  geriDon: { marginTop: 50, marginBottom: 8 },
  geriDonText: { color: '#6c63ff', fontSize: 16 },
  baslik: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  konuKart: { backgroundColor: '#1a1a2e', borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: 1 },
  konuBaslikRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  konuBaslik: { fontSize: 15, fontWeight: '700', color: '#fff', flex: 1, marginRight: 8 },
  konuIcerik: { color: '#ccc', fontSize: 13, lineHeight: 24, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#2a2a3e' },
});
