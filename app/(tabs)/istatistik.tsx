import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useProgress } from '@/hooks/useProgress';

const DERSLER = ['Türkçe', 'Matematik', 'Tarih', 'Coğrafya', 'Vatandaşlık', 'Güncel Bilgiler'];
const RENKLER: Record<string, string> = {
  'Türkçe': '#4A90D9',
  'Matematik': '#E67E22',
  'Tarih': '#E74C3C',
  'Coğrafya': '#27AE60',
  'Vatandaşlık': '#9B59B6',
  'Güncel Bilgiler': '#1ABC9C',
};

export default function Istatistik() {
  const { progress, dogruSayisi, yanlisSayisi } = useProgress();

  const toplamSoru = progress.sonuclar.length;
  const toplamDogru = dogruSayisi();
  const toplamYanlis = yanlisSayisi();
  const basariYuzdesi = toplamSoru > 0 ? Math.round((toplamDogru / toplamSoru) * 100) : 0;

  const enCokCalisilan = DERSLER.reduce((max, ders) => {
    const toplam = dogruSayisi(ders) + yanlisSayisi(ders);
    const maxToplam = dogruSayisi(max) + yanlisSayisi(max);
    return toplam > maxToplam ? ders : max;
  }, DERSLER[0]);

  const enZayif = DERSLER.reduce((min, ders) => {
    const dogru = dogruSayisi(ders);
    const toplam = dogru + yanlisSayisi(ders);
    if (toplam === 0) return min;
    const oran = dogru / toplam;
    const minToplam = dogruSayisi(min) + yanlisSayisi(min);
    const minOran = minToplam === 0 ? 1 : dogruSayisi(min) / minToplam;
    return oran < minOran ? ders : min;
  }, DERSLER[0]);

  // Yıllara göre dağılım
  const yillar = [2016, 2017, 2018, 2019, 2020, 2021];
  const yilVerisi = yillar.map(yil => ({
    yil,
    dogru: progress.sonuclar.filter(s => s.yil === yil && s.dogru).length,
    yanlis: progress.sonuclar.filter(s => s.yil === yil && !s.dogru).length,
  }));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.geri}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.baslik}>📊 İstatistikler</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* Genel Özet */}
      <View style={styles.ozet}>
        <View style={styles.ozetDaire}>
          <Text style={styles.ozetYuzde}>{basariYuzdesi}%</Text>
          <Text style={styles.ozetLabel}>Başarı</Text>
        </View>
        <View style={styles.ozetDetay}>
          <View style={styles.ozetSatir}>
            <Text style={styles.ozetIkon}>📝</Text>
            <Text style={styles.ozetText}>Toplam: {toplamSoru} soru</Text>
          </View>
          <View style={styles.ozetSatir}>
            <Text style={styles.ozetIkon}>✅</Text>
            <Text style={styles.ozetText}>Doğru: {toplamDogru}</Text>
          </View>
          <View style={styles.ozetSatir}>
            <Text style={styles.ozetIkon}>❌</Text>
            <Text style={styles.ozetText}>Yanlış: {toplamYanlis}</Text>
          </View>
        </View>
      </View>

      {toplamSoru > 0 && (
        <>
          <View style={styles.bilgiRow}>
            <View style={[styles.bilgiKart, { backgroundColor: '#1a3a1a' }]}>
              <Text style={styles.bilgiBaslik}>🏆 En Çok Çalışılan</Text>
              <Text style={styles.bilgiDers}>{enCokCalisilan}</Text>
            </View>
            <View style={[styles.bilgiKart, { backgroundColor: '#3a1a1a' }]}>
              <Text style={styles.bilgiBaslik}>⚠️ En Zayıf Ders</Text>
              <Text style={styles.bilgiDers}>{enZayif}</Text>
            </View>
          </View>
        </>
      )}

      {/* Ders Bazlı Grafik */}
      <Text style={styles.bolumBaslik}>📚 Ders Bazlı Performans</Text>
      {DERSLER.map(ders => {
        const dogru = dogruSayisi(ders);
        const yanlis = yanlisSayisi(ders);
        const toplam = dogru + yanlis;
        if (toplam === 0) return (
          <View key={ders} style={styles.dersRow}>
            <Text style={styles.dersAdi}>{ders}</Text>
            <Text style={styles.dersYok}>Henüz çalışılmadı</Text>
          </View>
        );
        const oran = dogru / toplam;
        return (
          <View key={ders} style={styles.dersKart}>
            <View style={styles.dersUst}>
              <Text style={styles.dersAdi}>{ders}</Text>
              <Text style={styles.dersOran}>{Math.round(oran * 100)}%</Text>
            </View>
            <View style={styles.barArka}>
              <View style={[styles.barOn, { width: `${oran * 100}%` as any, backgroundColor: RENKLER[ders] }]} />
            </View>
            <View style={styles.dersAlt}>
              <Text style={styles.dersDogruText}>✅ {dogru} doğru</Text>
              <Text style={styles.dersYanlisText}>❌ {yanlis} yanlış</Text>
              <Text style={styles.dersToplam}>{toplam} toplam</Text>
            </View>
          </View>
        );
      })}

      {/* Yıl Bazlı */}
      <Text style={styles.bolumBaslik}>📅 Yıllara Göre</Text>
      {yilVerisi.map(({ yil, dogru, yanlis }) => {
        const toplam = dogru + yanlis;
        if (toplam === 0) return null;
        return (
          <View key={yil} style={styles.yilKart}>
            <Text style={styles.yilText}>{yil}</Text>
            <View style={styles.barArka2}>
              <View style={[styles.barOn2, { width: `${toplam > 0 ? (dogru / toplam) * 100 : 0}%` as any }]} />
            </View>
            <Text style={styles.yilSkor}>{dogru}/{toplam}</Text>
          </View>
        );
      })}

      {toplamSoru === 0 && (
        <View style={styles.bosKart}>
          <Text style={styles.bosEmoji}>📭</Text>
          <Text style={styles.bosText}>Henüz veri yok</Text>
          <Text style={styles.bosAlt}>Sorular çözdükçe istatistiklerin burada görünecek</Text>
        </View>
      )}

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1923' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 55 },
  geri: { color: '#4A90D9', fontSize: 16 },
  baslik: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  ozet: { margin: 16, backgroundColor: '#1A2635', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center' },
  ozetDaire: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#4A90D9', alignItems: 'center', justifyContent: 'center', marginRight: 20 },
  ozetYuzde: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  ozetLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  ozetDetay: { flex: 1 },
  ozetSatir: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  ozetIkon: { fontSize: 16, marginRight: 8 },
  ozetText: { color: '#ccc', fontSize: 14 },
  bilgiRow: { flexDirection: 'row', marginHorizontal: 16, gap: 12, marginBottom: 8 },
  bilgiKart: { flex: 1, borderRadius: 14, padding: 14 },
  bilgiBaslik: { color: '#aaa', fontSize: 12, marginBottom: 6 },
  bilgiDers: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  bolumBaslik: { color: '#8899AA', fontSize: 14, fontWeight: '600', marginLeft: 16, marginTop: 20, marginBottom: 10 },
  dersKart: { marginHorizontal: 16, marginBottom: 12, backgroundColor: '#1A2635', borderRadius: 14, padding: 14 },
  dersRow: { marginHorizontal: 16, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1A2635', borderRadius: 10, padding: 12 },
  dersUst: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  dersAdi: { color: '#fff', fontSize: 14, fontWeight: '600' },
  dersOran: { color: '#4A90D9', fontSize: 14, fontWeight: 'bold' },
  dersYok: { color: '#555', fontSize: 13 },
  barArka: { height: 8, backgroundColor: '#2A3F55', borderRadius: 4, overflow: 'hidden' },
  barOn: { height: 8, borderRadius: 4 },
  dersAlt: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  dersDogruText: { color: '#27AE60', fontSize: 12 },
  dersYanlisText: { color: '#E74C3C', fontSize: 12 },
  dersToplam: { color: '#8899AA', fontSize: 12 },
  yilKart: { marginHorizontal: 16, marginBottom: 8, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A2635', borderRadius: 10, padding: 12, gap: 10 },
  yilText: { color: '#fff', fontSize: 14, fontWeight: '600', width: 40 },
  barArka2: { flex: 1, height: 8, backgroundColor: '#2A3F55', borderRadius: 4, overflow: 'hidden' },
  barOn2: { height: 8, backgroundColor: '#9B59B6', borderRadius: 4 },
  yilSkor: { color: '#aaa', fontSize: 13, width: 45, textAlign: 'right' },
  bosKart: { alignItems: 'center', padding: 40 },
  bosEmoji: { fontSize: 50, marginBottom: 12 },
  bosText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  bosAlt: { color: '#8899AA', fontSize: 13, textAlign: 'center', marginTop: 8 },
});