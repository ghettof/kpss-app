import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { sinavSonucuGetir } from '../constants/denemeSinavlari/sinavSonucStore';

const RENK = '#E67E22';
const YESIL = '#27AE60';
const KIRMIZI = '#E74C3C';
const GRI = '#8899AA';
const HARFLER = ['A', 'B', 'C', 'D', 'E'];

const GAUGE_BOYUT = 180;
const CIZGI_KALINLIK = 14;
const YARICAP = (GAUGE_BOYUT - CIZGI_KALINLIK) / 2;
const CEVRE = 2 * Math.PI * YARICAP;

function gaugeRengi(oran: number) {
  if (oran >= 0.7) return YESIL;
  if (oran >= 0.4) return RENK;
  return KIRMIZI;
}

function motivasyonMesaji(oran: number) {
  if (oran >= 0.85) return '🏆 Harika! Tam bir profesyonelsin, bu hızda devam et!';
  if (oran >= 0.5) return '💪 Gayet iyi gidiyorsun, eksiklerini tekrar ederek daha da güçlen!';
  return '📚 Bu bir başlangıç! Yanlışlarını inceleyip tekrar dene, gelişim garanti.';
}

export default function DenemeSinaviSonucScreen() {
  const sonuc = sinavSonucuGetir();

  if (!sonuc) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.bosContainer}>
          <Text style={styles.bosMetin}>Gösterilecek bir sınav sonucu bulunamadı.</Text>
          <TouchableOpacity onPress={() => router.replace('/deneme-sinavlari')} style={styles.geriBtn}>
            <Text style={styles.geriBtnMetin}>Deneme Listesine Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const { sorular, cevaplar, denemeId, denemeBaslik } = sonuc;
  let dogru = 0, yanlis = 0, bos = 0;
  sorular.forEach((s, i) => {
    if (cevaplar[i] === null || cevaplar[i] === undefined) bos++;
    else if (cevaplar[i] === s.cevap) dogru++;
    else yanlis++;
  });

  const toplam = sorular.length;
  const oran = toplam > 0 ? dogru / toplam : 0;
  const renk = gaugeRengi(oran);
  const dashOffset = CEVRE * (1 - oran);

  const yanlisSorular = sorular
    .map((s, i) => ({ soru: s, cevapIndex: cevaplar[i], index: i }))
    .filter((s) => s.cevapIndex !== null && s.cevapIndex !== undefined && s.cevapIndex !== s.soru.cevap);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.baslik}>Sınav Bitti!</Text>
        <Text style={styles.denemeAdi}>Deneme {denemeId} • {denemeBaslik}</Text>

        <View style={styles.gaugeWrap}>
          <Svg width={GAUGE_BOYUT} height={GAUGE_BOYUT}>
            <Circle
              cx={GAUGE_BOYUT / 2}
              cy={GAUGE_BOYUT / 2}
              r={YARICAP}
              stroke="#1A2635"
              strokeWidth={CIZGI_KALINLIK}
              fill="none"
            />
            <Circle
              cx={GAUGE_BOYUT / 2}
              cy={GAUGE_BOYUT / 2}
              r={YARICAP}
              stroke={renk}
              strokeWidth={CIZGI_KALINLIK}
              strokeDasharray={`${CEVRE} ${CEVRE}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              fill="none"
              rotation={-90}
              originX={GAUGE_BOYUT / 2}
              originY={GAUGE_BOYUT / 2}
            />
          </Svg>
          <View style={styles.gaugeOrta} pointerEvents="none">
            <Text style={[styles.gaugeSkor, { color: renk }]}>{dogru}/{toplam}</Text>
            <Text style={styles.gaugeLabel}>Doğru</Text>
          </View>
        </View>

        <Text style={styles.detaySatir}>
          <Text style={{ color: KIRMIZI }}>{yanlis} yanlış</Text>
          <Text style={{ color: GRI }}> • </Text>
          <Text style={{ color: GRI }}>{bos} boş</Text>
        </Text>

        <Text style={styles.motivasyon}>{motivasyonMesaji(oran)}</Text>

        {yanlisSorular.length > 0 && (
          <>
            <Text style={styles.yanlisBaslik}>Yanlış Yapılan Sorular</Text>
            {yanlisSorular.map(({ soru, cevapIndex, index }) => (
              <View key={index} style={styles.yanlisKart}>
                <Text style={styles.yanlisSoruNo}>Soru {index + 1}</Text>
                <Text style={styles.yanlisSoruMetin}>{soru.soru}</Text>
                <Text style={styles.senCevap}>
                  ✗ Senin cevabın: {HARFLER[cevapIndex as number]}) {soru.secenekler[cevapIndex as number].replace(/^[A-E]\)\s*/, '')}
                </Text>
                <Text style={styles.dogruCevap}>
                  ✓ Doğru cevap: {HARFLER[soru.cevap]}) {soru.secenekler[soru.cevap].replace(/^[A-E]\)\s*/, '')}
                </Text>
                <Text style={styles.aciklama}>💡 {soru.aciklama}</Text>
              </View>
            ))}
          </>
        )}

        <TouchableOpacity style={[styles.tekrarBtn, { backgroundColor: RENK }]} onPress={() => router.replace(`/deneme-sinavi-coz?id=${denemeId}`)}>
          <Text style={styles.tekrarBtnText}>🔄 Tekrar Çöz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listeBtn} onPress={() => router.replace('/deneme-sinavlari')}>
          <Text style={styles.listeBtnText}>← Deneme Listesine Dön</Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1923' },
  bosContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  bosMetin: { color: '#8899AA', fontSize: 15, marginBottom: 16, textAlign: 'center' },
  geriBtn: { backgroundColor: '#1A2635', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 12 },
  geriBtnMetin: { color: '#4A90D9', fontSize: 15, fontWeight: 'bold' },
  scrollContent: { alignItems: 'center', padding: 20, paddingTop: 40 },
  baslik: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginBottom: 6 },
  denemeAdi: { color: '#8899AA', fontSize: 13, marginBottom: 20, textAlign: 'center' },
  gaugeWrap: { width: GAUGE_BOYUT, height: GAUGE_BOYUT, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  gaugeOrta: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  gaugeSkor: { fontSize: 30, fontWeight: 'bold' },
  gaugeLabel: { color: '#8899AA', fontSize: 13, marginTop: 2 },
  detaySatir: { fontSize: 15, fontWeight: 'bold', marginBottom: 16 },
  motivasyon: { color: '#fff', fontSize: 15, textAlign: 'center', lineHeight: 22, backgroundColor: '#1A2635', borderRadius: 12, padding: 16, marginBottom: 24, width: '100%' },
  yanlisBaslik: { color: '#fff', fontSize: 18, fontWeight: 'bold', alignSelf: 'flex-start', marginBottom: 12 },
  yanlisKart: { backgroundColor: '#1A2635', borderRadius: 12, padding: 14, width: '100%', marginBottom: 10 },
  yanlisSoruNo: { color: '#8899AA', fontSize: 12, marginBottom: 4, fontWeight: 'bold' },
  yanlisSoruMetin: { color: '#fff', fontSize: 14, lineHeight: 20, marginBottom: 10 },
  senCevap: { color: KIRMIZI, fontSize: 13, marginBottom: 4, lineHeight: 18 },
  dogruCevap: { color: YESIL, fontSize: 13, marginBottom: 8, lineHeight: 18 },
  aciklama: { color: '#ccc', fontSize: 13, lineHeight: 19, borderTopWidth: 1, borderTopColor: '#2A3F55', paddingTop: 8 },
  tekrarBtn: { borderRadius: 12, padding: 16, width: '100%', alignItems: 'center', marginTop: 8, marginBottom: 8 },
  tekrarBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  listeBtn: { padding: 12 },
  listeBtnText: { color: '#8899AA', fontSize: 14 },
});
