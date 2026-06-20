import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RENK = '#e74c3c';

const KONULAR = [
  {
    baslik: '📌 Ses Bilgisi',
    icerik: `• Büyük ünlü uyumu: Kelimedeki ünlüler ya hep kalın ya da hep ince olmalı
• Küçük ünlü uyumu: Düz ünlülerden sonra düz, yuvarlaktan sonra dar-yuvarlak veya düz gelir
• Ünsüz benzeşmesi: f,s,t,k,ç,ş,h,p sonrası c,d,g → ç,t,k olur
• Türkçe eklemeli bir dildir
• 8 ünlü harf: a, e, ı, i, o, ö, u, ü`,
  },
  {
    baslik: '📌 Cümle Ögeleri',
    icerik: `• Özne: Yüklemin bildirdiği işi yapan (kim? ne?)
• Yüklem: Öznenin yaptığını bildiren unsur — cümlenin sonunda
• Nesne: Eylemin etkisini taşıyan öge (kimi? neyi?)
• Zarf: Eylemi niteleyen kelime (nasıl? nerede? ne zaman?)
• Vurgu: Yüklemden hemen önceki ögededir`,
  },
  {
    baslik: '📌 Sözcük Türleri',
    icerik: `• İsim: Varlıkları ve kavramları karşılar
• Sıfat: İsimleri niteler (güzel ev)
• Zamir: İsmin yerine kullanılır (ben, sen, o...)
• Fiil/Eylem: İş, oluş, durum bildirir
• Zarf: Fiili, sıfatı veya zarfı niteler
• Edat: Tek başına anlamı olmaz, cümlede anlam kazanır
• Bağlaç: Kelime/cümleleri bağlar (ve, ama, fakat)
• Ünlem: Duygu ve heyecanları ifade eder`,
  },
  {
    baslik: '📌 Fiilimsi (Eylemsi)',
    icerik: `• Fiil kökünden türeyip isim, sıfat veya zarf görevinde kullanılır
• İsim-fiil (mastar): -mak, -me, -iş (gitmek, gitme, gidiş)
• Sıfat-fiil (ortaç): -en, -ar, -mez, -dik, -ecek
• Zarf-fiil (ulaç): -arak, -ince, -ip, -ken
• Fiilimsiler yüklem olamaz`,
  },
  {
    baslik: '📌 Anlam Bilgisi',
    icerik: `• Gerçek anlam: Kelimenin temel anlamı
• Mecaz anlam: Kelimenin gerçek dışı kullanımı
• Terim anlam: Bir bilim dalında özel kullanım
• Deyim: En az iki kelimeden oluşan kalıplaşmış ifade
• Atasözü: Toplumun deneyimlerinden doğan kalıplaşmış söz
• Kişileştirme (Teşhis): İnsan dışı varlıklara insani özellikler verilmesi
• Kaligram: Yazının görsel forma dönüştüğü şiir türü`,
  },
  {
    baslik: '📌 Yazım Kuralları',
    icerik: `• "Her şey" ayrı yazılır
• Bağlaç "de/da" ayrı yazılır
• Soru eki "mı/mi" ayrı yazılır
• Özel isimler büyük harfle başlar
• Birleşik fiiller bitişik yazılır
• Anlam kayması: Fiilin bir kipi ifade edip başka kipi kastetmesi (Yarın geliyorum → gelecek zaman)`,
  },
];

export default function TurkceNotlar() {
  const [acikKonu, setAcikKonu] = useState<number | null>(null);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.geriDon}>
        <Text style={styles.geriDonText}>← Geri</Text>
      </TouchableOpacity>
      <Text style={[styles.baslik, { color: RENK }]}>📝 Türkçe Notları</Text>
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
