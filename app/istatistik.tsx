import { useProgress } from '@/hooks/useProgress';
import { useRozetler } from '@/hooks/useRozetler';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DERSLER = ['Türkçe', 'Matematik', 'Tarih', 'Coğrafya', 'Vatandaşlık', 'Güncel Bilgiler'];

const DERS_RENKLERI: Record<string, string> = {
  'Türkçe': '#E74C3C',
  'Matematik': '#3498DB',
  'Tarih': '#E67E22',
  'Coğrafya': '#27AE60',
  'Vatandaşlık': '#8E44AD',
  'Güncel Bilgiler': '#16A085',
};

function yuzdeHesapla(dogru: number, toplam: number) {
  if (toplam === 0) return 0;
  return Math.round((dogru / toplam) * 100);
}

export default function Istatistik() {
  const { progress, dogruSayisi, yanlisSayisi } = useProgress();
  const { rozetler } = useRozetler();

  const toplam = progress.sonuclar.length;
  const dogru = dogruSayisi();
  const yanlis = yanlisSayisi();
  const basari = yuzdeHesapla(dogru, toplam);
  const kazanilanRozet = rozetler.filter((rozet) => rozet.kazanildi).length;

  const dersIstatistikleri = DERSLER.map((ders) => {
    const dersToplam = progress.sonuclar.filter((sonuc) => sonuc.ders === ders).length;
    const dersDogru = dogruSayisi(ders);
    const dersYanlis = yanlisSayisi(ders);

    return {
      ders,
      toplam: dersToplam,
      dogru: dersDogru,
      yanlis: dersYanlis,
      basari: yuzdeHesapla(dersDogru, dersToplam),
      renk: DERS_RENKLERI[ders],
    };
  });

  const aktifDersler = dersIstatistikleri.filter((item) => item.toplam > 0);
  const enIyiDers = [...aktifDersler].sort((a, b) => b.basari - a.basari || b.dogru - a.dogru)[0];
  const enZorDers = [...aktifDersler].sort((a, b) => a.basari - b.basari || b.yanlis - a.yanlis)[0];

  const son7Gun = progress.sonuclar.filter((sonuc) => {
    const fark = Date.now() - new Date(sonuc.tarih).getTime();
    return fark <= 7 * 24 * 60 * 60 * 1000;
  }).length;

  const sonAktivite = [...progress.sonuclar]
    .sort((a, b) => new Date(b.tarih).getTime() - new Date(a.tarih).getTime())
    .slice(0, 6);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.geri}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.baslik}>İstatistikler</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.heroKart}>
        <Text style={styles.heroEtiket}>Genel başarı</Text>
        <Text style={styles.heroYuzde}>%{basari}</Text>
        <Text style={styles.heroAciklama}>
          {toplam > 0 ? `${toplam} çözüm üzerinden güncel performansın` : 'Henüz çözülmüş soru bulunmuyor'}
        </Text>
      </View>

      <View style={styles.ozetGrid}>
        <View style={[styles.ozetKart, { backgroundColor: '#1B3347' }]}>
          <Text style={styles.ozetSayi}>{toplam}</Text>
          <Text style={styles.ozetLabel}>Toplam Soru</Text>
        </View>
        <View style={[styles.ozetKart, { backgroundColor: '#18392B' }]}>
          <Text style={styles.ozetSayi}>{dogru}</Text>
          <Text style={styles.ozetLabel}>Doğru</Text>
        </View>
        <View style={[styles.ozetKart, { backgroundColor: '#452127' }]}>
          <Text style={styles.ozetSayi}>{yanlis}</Text>
          <Text style={styles.ozetLabel}>Yanlış</Text>
        </View>
        <View style={[styles.ozetKart, { backgroundColor: '#3E2E15' }]}>
          <Text style={styles.ozetSayi}>{kazanilanRozet}</Text>
          <Text style={styles.ozetLabel}>Rozet</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelBaslik}>Öne Çıkanlar</Text>
        <View style={styles.ongoruSatir}>
          <Text style={styles.ongoruEtiket}>Son 7 gün</Text>
          <Text style={styles.ongoruDeger}>{son7Gun} soru</Text>
        </View>
        <View style={styles.ongoruSatir}>
          <Text style={styles.ongoruEtiket}>En iyi ders</Text>
          <Text style={styles.ongoruDeger}>
            {enIyiDers ? `${enIyiDers.ders} · %${enIyiDers.basari}` : 'Veri yok'}
          </Text>
        </View>
        <View style={styles.ongoruSatir}>
          <Text style={styles.ongoruEtiket}>En çok zorlayan</Text>
          <Text style={styles.ongoruDeger}>
            {enZorDers ? `${enZorDers.ders} · %${enZorDers.basari}` : 'Veri yok'}
          </Text>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelBaslik}>Ders Dağılımı</Text>
        {dersIstatistikleri.map((item) => (
          <View key={item.ders} style={styles.dersKart}>
            <View style={styles.dersUst}>
              <View style={styles.dersBaslikSatir}>
                <View style={[styles.renkNokta, { backgroundColor: item.renk }]} />
                <Text style={styles.dersAdi}>{item.ders}</Text>
              </View>
              <Text style={styles.dersYuzde}>%{item.basari}</Text>
            </View>
            <View style={styles.barArka}>
              <View
                style={[
                  styles.barDolgu,
                  { width: `${item.basari}%` as const, backgroundColor: item.renk },
                ]}
              />
            </View>
            <Text style={styles.dersDetay}>
              {item.toplam > 0
                ? `${item.dogru} doğru · ${item.yanlis} yanlış · ${item.toplam} soru`
                : 'Henüz çalışma yok'}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelBaslik}>Son Aktiviteler</Text>
        {sonAktivite.length > 0 ? (
          sonAktivite.map((item, index) => (
            <View key={`${item.soruId}-${item.tarih}-${index}`} style={styles.aktiviteKart}>
              <View>
                <Text style={styles.aktiviteDers}>{item.ders}</Text>
                <Text style={styles.aktiviteTarih}>
                  {new Date(item.tarih).toLocaleDateString('tr-TR')} · {item.yil}
                </Text>
              </View>
              <Text style={[styles.aktiviteDurum, item.dogru ? styles.dogru : styles.yanlis]}>
                {item.dogru ? 'Doğru' : 'Yanlış'}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.bosDurum}>İlk çözümünü yaptığında burada bir akış göreceksin.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1923' },
  content: { padding: 16, paddingTop: 52, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  geri: { color: '#4A90D9', fontSize: 16 },
  baslik: { color: '#FFFFFF', fontSize: 22, fontWeight: '700' },
  headerSpacer: { width: 48 },
  heroKart: { backgroundColor: '#1A2635', borderRadius: 24, padding: 24, marginBottom: 16 },
  heroEtiket: { color: '#8DA3B9', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 },
  heroYuzde: { color: '#FFFFFF', fontSize: 46, fontWeight: '800', marginTop: 10 },
  heroAciklama: { color: '#B5C2CF', fontSize: 14, marginTop: 8, lineHeight: 20 },
  ozetGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  ozetKart: { width: '48%', borderRadius: 18, padding: 18 },
  ozetSayi: { color: '#FFFFFF', fontSize: 28, fontWeight: '800' },
  ozetLabel: { color: 'rgba(255,255,255,0.78)', fontSize: 13, marginTop: 6 },
  panel: { backgroundColor: '#1A2635', borderRadius: 20, padding: 18, marginBottom: 16 },
  panelBaslik: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', marginBottom: 14 },
  ongoruSatir: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#243446' },
  ongoruEtiket: { color: '#9DB0C1', fontSize: 14 },
  ongoruDeger: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  dersKart: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#243446' },
  dersUst: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  dersBaslikSatir: { flexDirection: 'row', alignItems: 'center' },
  renkNokta: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  dersAdi: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  dersYuzde: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  barArka: { height: 10, backgroundColor: '#243446', borderRadius: 999, overflow: 'hidden' },
  barDolgu: { height: '100%', borderRadius: 999 },
  dersDetay: { color: '#8DA3B9', fontSize: 12, marginTop: 8 },
  aktiviteKart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#243446' },
  aktiviteDers: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  aktiviteTarih: { color: '#8DA3B9', fontSize: 12, marginTop: 4 },
  aktiviteDurum: { fontSize: 13, fontWeight: '700' },
  dogru: { color: '#4CD97B' },
  yanlis: { color: '#FF6B6B' },
  bosDurum: { color: '#8DA3B9', fontSize: 14, lineHeight: 20 },
});
