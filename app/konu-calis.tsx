import { TUM_SORULAR } from '@/constants/sorular';
import { useProgress } from '@/hooks/useProgress';
import { router } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const DERSLER = ['Türkçe', 'Matematik', 'Tarih', 'Coğrafya', 'Vatandaşlık', 'Güncel Bilgiler'];

const DERS_RENKLERI: Record<string, string> = {
  'Türkçe': '#e74c3c',
  'Matematik': '#3498db',
  'Tarih': '#e67e22',
  'Coğrafya': '#27ae60',
  'Vatandaşlık': '#9b59b6',
  'Güncel Bilgiler': '#1abc9c',
};

const MODLAR = [
  { id: 'yanlis', label: '❌ Yanlışlarım', renk: '#e74c3c', aciklama: 'Daha önce yanlış yaptığın sorular' },
  { id: 'flashcard', label: '🃏 Flashcard', renk: '#9b59b6', aciklama: 'Soru-cevap kartları ile çalış' },
  { id: 'zamanli', label: '⏱ Zamanlı', renk: '#e67e22', aciklama: '30 saniyede soruyu yanıtla' },
];

export default function KonuCalis() {
  const { progress, cevapKaydet, yanlisSorular, dogruSayisi, yanlisSayisi, progressSifirla } = useProgress();
  const [secilenDers, setSecilenDers] = useState<string | null>(null);
  const [secilenMod, setSecilenMod] = useState<string | null>(null);
  const [quizAktif, setQuizAktif] = useState(false);
  const [sorular, setSorular] = useState<any[]>([]);
  const [siradakiIndex, setSiradakiIndex] = useState(0);
  const [cevapGosteriliyor, setCevapGosteriliyor] = useState(false);
  const [sure, setSure] = useState(30);
  const [quizBitti, setQuizBitti] = useState(false);
  const [dogruSayac, setDogruSayac] = useState(0);
  const timerRef = useRef<any>(null);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [kartCevrildi, setKartCevrildi] = useState(false);

  const quizBaslat = () => {
    if (!secilenDers || !secilenMod) return;
    let filtrelenmis: any[] = [];
    if (secilenMod === 'yanlis') {
      const yanlisList = yanlisSorular(secilenDers);
      const yanliIdler = yanlisList.map((y: any) => y.soruId);
      filtrelenmis = TUM_SORULAR.filter((s: any) => s.ders === secilenDers && yanliIdler.includes(s.id));
      if (filtrelenmis.length === 0) {
        Alert.alert('Tebrikler! 🎉', 'Bu derste yanlış sorunuz yok!');
        return;
      }
    } else {
      filtrelenmis = TUM_SORULAR.filter((s: any) => s.ders === secilenDers).sort(() => Math.random() - 0.5).slice(0, 20);
    }
    setSorular(filtrelenmis.sort(() => Math.random() - 0.5));
    setSiradakiIndex(0);
    setCevapGosteriliyor(false);
    setQuizBitti(false);
    setDogruSayac(0);
    setKartCevrildi(false);
    flipAnim.setValue(0);
    setQuizAktif(true);
    if (secilenMod === 'zamanli') setSure(30);
  };

  const sonrakiSoru = useCallback((dogru: boolean) => {
    clearInterval(timerRef.current);
    const mevcutSoru = sorular[siradakiIndex];
    if (mevcutSoru) {
      cevapKaydet(mevcutSoru.id, dogru, mevcutSoru.ders, mevcutSoru.yil);
      if (dogru) setDogruSayac(prev => prev + 1);
    }
    if (siradakiIndex + 1 >= sorular.length) {
      setQuizBitti(true);
    } else {
      setSiradakiIndex(prev => prev + 1);
      setCevapGosteriliyor(false);
      setKartCevrildi(false);
      flipAnim.setValue(0);
      if (secilenMod === 'zamanli') setSure(30);
    }
  }, [cevapKaydet, flipAnim, secilenMod, siradakiIndex, sorular]);

  useEffect(() => {
    if (quizAktif && secilenMod === 'zamanli' && !cevapGosteriliyor && !quizBitti) {
      timerRef.current = setInterval(() => {
        setSure(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            sonrakiSoru(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [quizAktif, secilenMod, cevapGosteriliyor, quizBitti, sonrakiSoru]);

  const kartCevir = () => {
    if (kartCevrildi) return;
    Animated.spring(flipAnim, { toValue: 1, friction: 8, tension: 10, useNativeDriver: true }).start();
    setKartCevrildi(true);
  };

  const frontInterpolate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backInterpolate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });
  const mevcutSoru = sorular[siradakiIndex];
  const renk = DERS_RENKLERI[secilenDers || ''] || '#4A90D9';

  // Quiz ekranı
  if (quizAktif && !quizBitti && mevcutSoru) {
    return (
      <View style={styles.quizContainer}>
        <View style={styles.quizHeader}>
          <TouchableOpacity onPress={() => { clearInterval(timerRef.current); setQuizAktif(false); }}>
            <Text style={styles.geriBtn}>← Geri</Text>
          </TouchableOpacity>
          <View style={styles.quizHeaderMid}>
            <Text style={[styles.dersBadge, { backgroundColor: renk }]}>{secilenDers}</Text>
            <Text style={styles.ilerleme}>{siradakiIndex + 1} / {sorular.length}</Text>
          </View>
          {secilenMod === 'zamanli' && (
            <Text style={[styles.sure, sure <= 10 && styles.sureCritical]}>{sure}s</Text>
          )}
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((siradakiIndex) / sorular.length) * 100}%` as any, backgroundColor: renk }]} />
        </View>

        {secilenMod === 'flashcard' ? (
          <View style={styles.flashcardContainer}>
            <TouchableOpacity onPress={kartCevir} activeOpacity={0.9} style={styles.kartWrapper}>
              <Animated.View style={[styles.kart, styles.kartOn, { transform: [{ rotateY: frontInterpolate }] }]}>
                <Text style={styles.kartEtiket}>SORU</Text>
                <Text style={styles.kartSoru}>{mevcutSoru.soru}</Text>
                <Text style={styles.kartIpucu}>Cevabı görmek için dokun 👆</Text>
              </Animated.View>
              <Animated.View style={[styles.kart, styles.kartArka, { transform: [{ rotateY: backInterpolate }] }]}>
                <Text style={styles.kartEtiket}>CEVAP</Text>
                <Text style={styles.kartCevap}>{mevcutSoru.secenekler[mevcutSoru.cevap]}</Text>
                <Text style={styles.kartAciklama}>{mevcutSoru.aciklama}</Text>
              </Animated.View>
            </TouchableOpacity>
            {kartCevrildi && (
              <View style={styles.flashcardButonlar}>
                <TouchableOpacity style={[styles.fcBtn, styles.fcYanlis]} onPress={() => sonrakiSoru(false)}>
                  <Text style={styles.fcBtnText}>❌ Bilmedim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.fcBtn, styles.fcDogru]} onPress={() => sonrakiSoru(true)}>
                  <Text style={styles.fcBtnText}>✅ Bildim</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <ScrollView style={styles.quizScroll}>
            <Text style={styles.quizSoru}>{mevcutSoru.soru}</Text>
            {mevcutSoru.secenekler.map((secenek: string, index: number) => {
              const isDogru = cevapGosteriliyor && index === mevcutSoru.cevap;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.secenekBtn, isDogru && styles.dogru]}
                  disabled={cevapGosteriliyor}
                  onPress={() => {
                    clearInterval(timerRef.current);
                    setCevapGosteriliyor(true);
                    const dogru = index === mevcutSoru.cevap;
                    setTimeout(() => sonrakiSoru(dogru), 1200);
                  }}
                >
                  <Text style={styles.secenekText}>{secenek}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }

  // Bitiş ekranı
  if (quizBitti) {
    const yanlisSayac = sorular.length - dogruSayac;
    const basari = Math.round((dogruSayac / sorular.length) * 100);
    return (
      <View style={[styles.bitisContainer, { height: SCREEN_HEIGHT }]}>
        <Text style={styles.bitisEmoji}>{basari >= 70 ? '🏆' : basari >= 50 ? '👍' : '📚'}</Text>
        <Text style={styles.bitisBaslik}>Quiz Tamamlandı!</Text>
        <Text style={[styles.bitisSkor, { color: renk }]}>{basari}%</Text>
        <View style={styles.bitisDetay}>
          <View style={styles.bitisItem}>
            <Text style={styles.bitisDogru}>{dogruSayac}</Text>
            <Text style={styles.bitisLabel}>Doğru</Text>
          </View>
          <View style={styles.bitisItem}>
            <Text style={styles.bitisYanlis}>{yanlisSayac}</Text>
            <Text style={styles.bitisLabel}>Yanlış</Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.tekrarBtn, { backgroundColor: renk }]} onPress={quizBaslat}>
          <Text style={styles.tekrarBtnText}>🔄 Tekrar Çöz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.anaSayfaBtn} onPress={() => { setQuizAktif(false); setQuizBitti(false); }}>
          <Text style={styles.anaSayfaBtnText}>← Geri</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Ana ekran
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.geriDon}>
        <Text style={styles.geriDonText}>← Geri</Text>
      </TouchableOpacity>

      <Text style={styles.baslik}>📚 Konu Çalış</Text>

      <View style={styles.istatistikRow}>
        <View style={[styles.istatistikKart, { backgroundColor: '#27ae60' }]}>
          <Text style={styles.istatistikSayi}>{dogruSayisi()}</Text>
          <Text style={styles.istatistikLabel}>Doğru</Text>
        </View>
        <View style={[styles.istatistikKart, { backgroundColor: '#e74c3c' }]}>
          <Text style={styles.istatistikSayi}>{yanlisSayisi()}</Text>
          <Text style={styles.istatistikLabel}>Yanlış</Text>
        </View>
        <View style={[styles.istatistikKart, { backgroundColor: '#3498db' }]}>
          <Text style={styles.istatistikSayi}>{progress.sonuclar.length}</Text>
          <Text style={styles.istatistikLabel}>Toplam</Text>
        </View>
      </View>

      <Text style={styles.altBaslik}>📖 Ders Seç</Text>
      <View style={styles.dersGrid}>
        {DERSLER.map(ders => {
          const dRenk = DERS_RENKLERI[ders];
          const yanlis = yanlisSayisi(ders);
          const dogru = dogruSayisi(ders);
          const secili = secilenDers === ders;
          return (
            <TouchableOpacity
              key={ders}
              style={[styles.dersKart, { borderColor: dRenk, borderWidth: secili ? 2 : 1 }, secili && { backgroundColor: dRenk + '22' }]}
              onPress={() => setSecilenDers(ders)}
            >
              <View style={[styles.dersRenkBar, { backgroundColor: dRenk }]} />
              <View style={styles.dersIcerik}>
                <Text style={[styles.dersAdi, { color: secili ? dRenk : '#ccc' }]}>{ders}</Text>
                {(yanlis > 0 || dogru > 0) && (
                  <Text style={styles.dersStat}>✅{dogru} ❌{yanlis}</Text>
                )}
              </View>
              {secili && <Text style={{ color: dRenk, fontSize: 20 }}>✓</Text>}
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.altBaslik}>🎮 Mod Seç</Text>
      {MODLAR.map(mod => (
        <TouchableOpacity
          key={mod.id}
          style={[styles.modKart, secilenMod === mod.id && { borderColor: mod.renk, borderWidth: 2 }]}
          onPress={() => setSecilenMod(mod.id)}
        >
          <View style={[styles.modRenk, { backgroundColor: mod.renk }]} />
          <View style={styles.modIcerik}>
            <Text style={styles.modLabel}>{mod.label}</Text>
            <Text style={styles.modAciklama}>{mod.aciklama}</Text>
          </View>
          {secilenMod === mod.id && <Text style={{ color: mod.renk, fontSize: 20 }}>✓</Text>}
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.baslatBtn, (!secilenDers || !secilenMod) && styles.baslatBtnDisabled]}
        onPress={quizBaslat}
        disabled={!secilenDers || !secilenMod}
      >
        <Text style={styles.baslatBtnText}>🚀 Başlat</Text>
      </TouchableOpacity>

      {progress.sonuclar.length > 0 && (
        <TouchableOpacity
          style={styles.sifirlaBtn}
          onPress={() => Alert.alert('Sıfırla', 'Tüm ilerlemeniz silinecek. Emin misiniz?', [
            { text: 'İptal' },
            { text: 'Sıfırla', style: 'destructive', onPress: progressSifirla }
          ])}
        >
          <Text style={styles.sifirlaText}>🗑 İlerlemeyi Sıfırla</Text>
        </TouchableOpacity>
      )}
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a', padding: 16 },
  geriDon: { marginTop: 50, marginBottom: 8 },
  geriDonText: { color: '#6c63ff', fontSize: 16 },
  baslik: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  altBaslik: { fontSize: 16, fontWeight: '600', color: '#aaa', marginTop: 20, marginBottom: 12 },
  istatistikRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  istatistikKart: { flex: 1, borderRadius: 12, padding: 14, alignItems: 'center' },
  istatistikSayi: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  istatistikLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  dersGrid: { gap: 10 },
  dersKart: { backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center' },
  dersRenkBar: { width: 4, height: 44, borderRadius: 2, marginRight: 14 },
  dersIcerik: { flex: 1 },
  dersAdi: { fontSize: 16, fontWeight: '700' },
  dersStat: { fontSize: 11, color: '#888', marginTop: 4 },
  modKart: { backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  modRenk: { width: 4, height: 40, borderRadius: 2, marginRight: 12 },
  modIcerik: { flex: 1 },
  modLabel: { color: '#fff', fontSize: 15, fontWeight: '700' },
  modAciklama: { color: '#888', fontSize: 12, marginTop: 2 },
  baslatBtn: { backgroundColor: '#6c63ff', borderRadius: 14, padding: 18, alignItems: 'center', marginTop: 20 },
  baslatBtnDisabled: { backgroundColor: '#333' },
  baslatBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  sifirlaBtn: { alignItems: 'center', padding: 16, marginTop: 12 },
  sifirlaText: { color: '#e74c3c', fontSize: 14 },
  quizContainer: { flex: 1, backgroundColor: '#0a0a1a' },
  quizHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 55 },
  quizHeaderMid: { alignItems: 'center', gap: 4 },
  geriBtn: { color: '#6c63ff', fontSize: 16 },
  dersBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, color: '#fff', fontSize: 12, fontWeight: 'bold' },
  ilerleme: { color: '#aaa', fontSize: 13, marginTop: 4 },
  sure: { color: '#fff', fontSize: 20, fontWeight: 'bold', backgroundColor: '#333', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10 },
  sureCritical: { backgroundColor: '#e74c3c' },
  progressBar: { height: 4, backgroundColor: '#333', marginHorizontal: 16, borderRadius: 2 },
  progressFill: { height: 4, borderRadius: 2 },
  quizScroll: { flex: 1, padding: 16 },
  quizSoru: { color: '#fff', fontSize: 16, lineHeight: 26, marginBottom: 20, marginTop: 10 },
  secenekBtn: { backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#333' },
  dogru: { backgroundColor: '#1a3a1a', borderColor: '#27ae60' },
  secenekText: { color: '#fff', fontSize: 14, lineHeight: 20 },
  flashcardContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, paddingTop: 20, minHeight: SCREEN_HEIGHT - 200 },
  kartWrapper: { width: SCREEN_WIDTH - 32, height: 380, position: 'relative' },
  kart: { position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', borderRadius: 20, padding: 24, justifyContent: 'center', alignItems: 'center' },
  kartOn: { backgroundColor: '#1a1a2e', borderWidth: 1, borderColor: '#333' },
  kartArka: { backgroundColor: '#1a3a1a', borderWidth: 1, borderColor: '#27ae60' },
  kartEtiket: { fontSize: 12, letterSpacing: 2, color: '#888', marginBottom: 16 },
  kartSoru: { color: '#fff', fontSize: 16, textAlign: 'center', lineHeight: 24 },
  kartIpucu: { color: '#555', fontSize: 12, marginTop: 20 },
  kartCevap: { color: '#27ae60', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  kartAciklama: { color: '#aaa', fontSize: 13, textAlign: 'center', marginTop: 12 },
  flashcardButonlar: { flexDirection: 'row', gap: 16, marginTop: 30, width: SCREEN_WIDTH - 32 },
  fcBtn: { flex: 1, padding: 16, borderRadius: 14, alignItems: 'center' },
  fcYanlis: { backgroundColor: '#3a1a1a' },
  fcDogru: { backgroundColor: '#1a3a1a' },
  fcBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  bitisContainer: { backgroundColor: '#0a0a1a', alignItems: 'center', justifyContent: 'center', padding: 24 },
  bitisEmoji: { fontSize: 64, marginBottom: 12 },
  bitisBaslik: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  bitisSkor: { fontSize: 64, fontWeight: 'bold', marginBottom: 20 },
  bitisDetay: { flexDirection: 'row', gap: 40, marginBottom: 30 },
  bitisItem: { alignItems: 'center' },
  bitisDogru: { color: '#27ae60', fontSize: 36, fontWeight: 'bold' },
  bitisYanlis: { color: '#e74c3c', fontSize: 36, fontWeight: 'bold' },
  bitisLabel: { color: '#888', fontSize: 13, marginTop: 4 },
  tekrarBtn: { borderRadius: 14, padding: 18, width: '100%', alignItems: 'center', marginBottom: 12 },
  tekrarBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  anaSayfaBtn: { padding: 12 },
  anaSayfaBtnText: { color: '#888', fontSize: 15 },
});
