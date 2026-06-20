import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RENK = '#27ae60';

const KONULAR = [
  {
    baslik: '📌 Türkiye\'nin Genel Coğrafyası',
    icerik: `• Yüz ölçümü: 783.562 km² (Dünya'da 37. büyük)
• 81 il (son eklenen: Düzce)
• 7 coğrafi bölge
• En batı ili: Edirne
• En doğu ili: Iğdır
• En işlek sınır kapısı: Kapıkule (Bulgaristan)
• En kalabalık şehir: İstanbul (15 milyon+)`,
  },
  {
    baslik: '📌 Dağlar ve Ovalar',
    icerik: `• Türkiye'nin en yüksek dağı: Ağrı Dağı (5.137 m)
• En genç volkanik arazi: Manisa-Kula Tepeleri
• En büyük delta ovası: Çukurova (Seyhan ve Ceyhan)
• Karstik aşınmanın en fazla görüldüğü plato: Teke ve Taşeli
• Buzullara rastlanmayan dağ: Yıldız Dağları`,
  },
  {
    baslik: '📌 Nehirler ve Göller',
    icerik: `• En uzun nehir: Kızılırmak (1.355 km)
• Fırat ve Dicle: Basra Körfezi'ne dökülür
• En büyük göl: Van Gölü (sodalı, karma yapılı)
• En büyük tatlı su gölü: Beyşehir Gölü
• Tuz Gölü: İç Anadolu Bölgesi
• Marmara Denizi: Çanakkale ve İstanbul Boğazı ile bağlantılı`,
  },
  {
    baslik: '📌 İklim ve Bitki Örtüsü',
    icerik: `• Akdeniz iklimi: Yazlar sıcak-kuru, kışlar ılık-yağışlı
• En fazla yağış: Karadeniz (yıllık 2000 mm+)
• En az yağış: Doğu Anadolu
• Don olayı en az görülen bölge: Akdeniz
• Fön rüzgarı en etkili yer: Doğu Karadeniz (Rize)
• Rüzgar aşındırması en fazla: İç Anadolu
• Orman yangını en çok: Ege ve Akdeniz`,
  },
  {
    baslik: '📌 Madenler ve Kaynaklar',
    icerik: `• En fazla altın: Kışladağ Altın Madeni
• En büyük alüminyum (boksit): Konya Seydişehir
• Bakır madeni: Kastamonu(Küre), Artvin(Murgul), Diyarbakır(Ergani)
• Doğalgaz: Hamitabat (Kırklareli), Çamurlu (Mardin)
• Bor rezervlerinin %73'ü Türkiye'de
• Demir-Çelik: Karabük (taş kömürüne yakınlık)
• Tiftik keçisi: Ankara ve çevresi`,
  },
  {
    baslik: '📌 Dünya Coğrafyası',
    icerik: `• En yüksek şelale: Angel Şelalesi (Venezuela, 979 m)
• En uzun sıradağlar: And Dağları (Güney Amerika)
• En büyük ada: Grönland
• En büyük ikinci ada: Yeni Gine
• En kalabalık Müslüman ülke: Endonezya
• En büyük petrol rezervi: Venezuela
• Afrika'da 54 bağımsız ülke var
• Güney Afrika'nın 3 başkenti: Pretoria, Cape Town, Bloemfontein`,
  },
];

export default function CografyaNotlar() {
  const [acikKonu, setAcikKonu] = useState<number | null>(null);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.geriDon}>
        <Text style={styles.geriDonText}>← Geri</Text>
      </TouchableOpacity>
      <Text style={[styles.baslik, { color: RENK }]}>🌍 Coğrafya Notları</Text>
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
