import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RENK = '#e67e22';

const KONULAR = [
  {
    baslik: '📌 İslamiyet Öncesi Türk Tarihi',
    icerik: `• İlk Türk devleti: Asya Hun Devleti (MÖ 3. yy, Teoman)
• Kendi adına para bastıran ilk Türk: Baga Tarkan (Türgişler)
• Türk adıyla kurulan ilk devlet: Kök Türk Devleti
• Yerleşik hayata geçen ilk Türk devleti: Uygurlar
• İslamiyet öncesi meclise verilen ad: Kurultay (Toy/Kengeş)
• İlk burslu öğrencilik sistemi: Karahanlılar`,
  },
  {
    baslik: '📌 Türk-İslam Devletleri',
    icerik: `• Mısır'da kurulan ilk Türk-İslam devleti: Tolunoğulları
• Malazgirt Savaşı (1071): Anadolu'nun kapıları Türklere açıldı
• Miryokefalon Savaşı (1176): Yurt tutan savaş
• Büyük Selçuklular İran, Irak ve Anadolu'ya yayıldı
• Gazneliler: Hindistan'a seferler düzenledi`,
  },
  {
    baslik: '📌 Osmanlı Devleti Kuruluş ve Yükseliş',
    icerik: `• Osmanlı Devleti 1299 yılında Osman Bey tarafından kuruldu
• İlk bakır para: Osman Bey dönemi
• İlk altın para: Fatih Sultan Mehmet dönemi
• İstanbul'un fethi: 1453, Fatih Sultan Mehmet
• Kanuni Sultan Süleyman: "Muhibbi" mahlasıyla şiir yazdı
• Yıldırım Bayezid: Vivaldi operasına konu olan padişah`,
  },
  {
    baslik: '📌 Osmanlı Gerileme ve Çöküş',
    icerik: `• Karlofca Antlaşması (1699): Osmanlı'nın toprak kaybettiği ilk antlaşma
• Tanzimat Fermanı (1839): Sultan Abdülmecid döneminde ilan edildi
• İlk resmi gazete: Takvim-i Vekayi (1831)
• İlk matbaa: İbrahim Müteferrika (1727)
• Süveyş Kanalı: Sultan Abdülaziz döneminde açıldı
• Vaka-i Hayriye (1826): Yeniçeri Ocağı kaldırıldı`,
  },
  {
    baslik: '📌 Kurtuluş Savaşı',
    icerik: `• 19 Mayıs 1919: Mustafa Kemal Samsun'a çıktı
• Misak-ı Milli (1920): Son Osmanlı Mebuslar Meclisi'nde kabul edildi
• TBMM'yi tanıyan ilk Müslüman devlet: Afganistan
• Sakarya Savaşı (1921): Gazi unvanı verildi
• Büyük Taarruz: 26 Ağustos 1922
• Lozan Antlaşması: İsmet İnönü başkanlığında imzalandı`,
  },
  {
    baslik: '📌 Cumhuriyet ve İnkılaplar',
    icerik: `• Türkiye Cumhuriyeti: 29 Ekim 1923
• Ankara başkent: 13 Ekim 1923
• Halifelik kaldırıldı: 1924
• Medeni Kanun: 1926 (İsviçre'den uyarlandı)
• Harf Devrimi: 1928
• Kadınlara seçme-seçilme hakkı: 1934
• Atatürk vefatı: 10 Kasım 1938`,
  },
];

export default function TarihNotlar() {
  const [acikKonu, setAcikKonu] = useState<number | null>(null);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.geriDon}>
        <Text style={styles.geriDonText}>← Geri</Text>
      </TouchableOpacity>
      <Text style={[styles.baslik, { color: RENK }]}>📜 Tarih Notları</Text>
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
