import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TUM_SORULAR as SORULAR } from '../constants/sorular';
import { useProgress } from '../hooks/useProgress';

const DERSLER = ['Tümü', 'Türkçe', 'Matematik', 'Tarih', 'Coğrafya', 'Vatandaşlık', 'Güncel Bilgiler'];

export default function CikmisSorular() {
  const { cevapKaydet } = useProgress();
  const YILLAR = Array.from(new Set(SORULAR.map(s => s.yil))).sort((a, b) => b - a);

  const [secilenYil, setSecilenYil] = useState<number | null>(null);
  const [secilenDers, setSecilenDers] = useState('Tümü');
  const [secilen, setSecilen] = useState<number | null>(null);
  const [soruIndex, setSoruIndex] = useState(0);
  const [dogru, setDogru] = useState(0);
  const [yanlis, setYanlis] = useState(0);
  const [bitti, setBitti] = useState(false);
  const [cevaplar, setCevaplar] = useState<(number | null)[]>([]);

  const filtreliSorular = SORULAR.filter(s => {
    if (secilenYil && s.yil !== secilenYil) return false;
    if (secilenDers !== 'Tümü' && s.ders !== secilenDers) return false;
    return true;
  });

  const soru = filtreliSorular[soruIndex];

  const basla = (yil: number) => {
    setSecilenYil(yil);
    setSecilenDers('Tümü');
    setSoruIndex(0);
    setSecilen(null);
    setDogru(0);
    setYanlis(0);
    setBitti(false);
    setCevaplar(new Array(SORULAR.filter(s => s.yil === yil).length).fill(null));
  };

  const sonrakiSoru = () => {
    if (secilen === null) return;
    const dogruMu = secilen === soru.cevap;
    const yeniCevaplar = [...cevaplar];
    yeniCevaplar[soruIndex] = secilen;
    setCevaplar(yeniCevaplar);
    cevapKaydet(soru.id, dogruMu, soru.ders, soru.yil);
    if (dogruMu) setDogru(d => d + 1);
    else setYanlis(y => y + 1);

    if (soruIndex + 1 >= filtreliSorular.length) {
      setBitti(true);
    } else {
      setSoruIndex(i => i + 1);
      setSecilen(null);
    }
  };

  const resetle = () => {
    setSoruIndex(0);
    setSecilen(null);
    setDogru(0);
    setYanlis(0);
    setBitti(false);
    setCevaplar(new Array(filtreliSorular.length).fill(null));
  };

  // Yıl seçim ekranı
  if (!secilenYil) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.geri}>← Geri</Text>
          </TouchableOpacity>
          <Text style={styles.baslik}>Çıkmış Sorular</Text>
          <View style={{ width: 60 }} />
        </View>
        <ScrollView contentContainerStyle={styles.yilListesi}>
          <Text style={styles.altBaslik}>📅 Yıl Seç</Text>
          <View style={styles.yilGrid}>
            {YILLAR.map(yil => {
              const soruSayisi = SORULAR.filter(s => s.yil === yil).length;
              return (
                <TouchableOpacity
                  key={yil}
                  style={styles.yilKart}
                  onPress={() => basla(yil)}
                >
                  <Text style={styles.yilText}>{yil}</Text>
                  <Text style={styles.yilAlt}>{soruSayisi} soru</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Sonuç ekranı
  if (bitti) {
    const bos = filtreliSorular.length - dogru - yanlis;
    const net = (dogru - yanlis * 0.25).toFixed(2);
    const basari = Math.round((dogru / filtreliSorular.length) * 100);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.sonucContainer}>
          <Text style={styles.sonucEmoji}>
            {basari >= 70 ? '🏆' : basari >= 50 ? '👍' : '📚'}
          </Text>
          <Text style={styles.sonucBaslik}>Sınav Bitti!</Text>
          <Text style={styles.sonucYil}>{secilenYil} • {secilenDers === 'Tümü' ? 'Tüm Dersler' : secilenDers}</Text>

          <View style={styles.sonucKart}>
            <Text style={styles.netPuan}>{net}</Text>
            <Text style={styles.netLabel}>Net Puan</Text>
          </View>

          <View style={styles.sonucDetay}>
            <View style={styles.sonucItem}>
              <Text style={styles.sonucDogru}>{dogru}</Text>
              <Text style={styles.sonucLabel}>Doğru</Text>
            </View>
            <View style={styles.sonucAyirac} />
            <View style={styles.sonucItem}>
              <Text style={styles.sonucYanlis}>{yanlis}</Text>
              <Text style={styles.sonucLabel}>Yanlış</Text>
            </View>
            <View style={styles.sonucAyirac} />
            <View style={styles.sonucItem}>
              <Text style={styles.sonucBos}>{bos}</Text>
              <Text style={styles.sonucLabel}>Boş</Text>
            </View>
          </View>

          <Text style={styles.sonucBasari}>%{basari} Başarı</Text>

          <TouchableOpacity style={styles.tekrarBtn} onPress={resetle}>
            <Text style={styles.tekrarBtnText}>🔄 Tekrar Çöz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.yilBtn} onPress={() => setSecilenYil(null)}>
            <Text style={styles.yilBtnText}>← Yıl Seçimine Dön</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Soru ekranı
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={styles.stickyHeader}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => setSecilenYil(null)}>
              <Text style={styles.geri}>← {secilenYil}</Text>
            </TouchableOpacity>
            <Text style={styles.baslik}>Çıkmış Sorular</Text>
            <View style={styles.skor}>
              <Text style={styles.dogruText}>✓{dogru}</Text>
              <Text style={styles.yanlisText}>✗{yanlis}</Text>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtreSatir}>
            {DERSLER.map(d => (
              <TouchableOpacity
                key={d}
                style={[styles.filtre, secilenDers === d && styles.filtreDersAktif]}
                onPress={() => { setSecilenDers(d); resetle(); }}
              >
                <Text style={[styles.filtreText, secilenDers === d && styles.filtreTextAktif]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {filtreliSorular.length === 0 ? (
          <View style={styles.bosSonuc}>
            <Text style={styles.bosSonucText}>Bu filtreye uygun soru bulunamadı.</Text>
          </View>
        ) : (
          <>
            <View style={styles.soruKart}>
              <View style={styles.soruBilgi}>
                <Text style={styles.soruBilgiText}>{soru.yil} • {soru.ders}</Text>
                <Text style={styles.soruBilgiText}>{soruIndex + 1}/{filtreliSorular.length}</Text>
              </View>

              <Text style={styles.soruMetin}>{soru.soru}</Text>

              {soru.secenekler.map((s: string, i: number) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.secenek, secilen === i && styles.secenekSecili]}
                  onPress={() => setSecilen(i)}
                >
                  <Text style={styles.secenekText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.butonlar}>
              <TouchableOpacity
                style={[styles.onaylaBtn, secilen === null && styles.btnDisabled]}
                onPress={sonrakiSoru}
                disabled={secilen === null}
              >
                <Text style={styles.onaylaText}>
                  {soruIndex + 1 >= filtreliSorular.length ? 'Sonuçları Gör' : 'Sonraki Soru →'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1923' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 10 },
  stickyHeader: { backgroundColor: '#0F1923', paddingBottom: 8 },
  geri: { color: '#4A90D9', fontSize: 16 },
  baslik: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  skor: { flexDirection: 'row', gap: 10 },
  dogruText: { color: '#2ECC71', fontSize: 16, fontWeight: 'bold' },
  yanlisText: { color: '#E74C3C', fontSize: 16, fontWeight: 'bold' },
  altBaslik: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 16, paddingHorizontal: 16 },
  yilListesi: { padding: 16 },
  yilGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  yilKart: { backgroundColor: '#1A2635', borderRadius: 14, padding: 20, width: '47%', alignItems: 'center', borderWidth: 1, borderColor: '#2A3F55' },
  yilText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  yilAlt: { color: '#8899AA', fontSize: 12, marginTop: 4 },
  filtreSatir: { paddingHorizontal: 12, marginBottom: 6 },
  filtre: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#1A2635', marginRight: 6 },
  filtreDersAktif: { backgroundColor: '#4A90D9' },
  filtreText: { color: '#8899AA', fontSize: 13 },
  filtreTextAktif: { color: '#fff', fontWeight: 'bold' },
  soruKart: { margin: 12, backgroundColor: '#1A2635', borderRadius: 16, padding: 18 },
  soruBilgi: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  soruBilgiText: { color: '#8899AA', fontSize: 13 },
  soruMetin: { color: '#fff', fontSize: 16, lineHeight: 26, marginBottom: 18 },
  secenek: { borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#2A3F55', backgroundColor: '#1E2D3D' },
  secenekSecili: { backgroundColor: '#1A3A6B', borderColor: '#4A90D9' },
  secenekText: { color: '#fff', fontSize: 14, lineHeight: 20 },
  butonlar: { marginHorizontal: 12, marginBottom: 24 },
  onaylaBtn: { backgroundColor: '#4A90D9', borderRadius: 12, padding: 16, alignItems: 'center' },
  btnDisabled: { backgroundColor: '#2A3F55' },
  onaylaText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  bosSonuc: { margin: 40, alignItems: 'center' },
  bosSonucText: { color: '#8899AA', fontSize: 16 },
  sonucContainer: { alignItems: 'center', padding: 24, paddingTop: 60 },
  sonucEmoji: { fontSize: 72, marginBottom: 12 },
  sonucBaslik: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  sonucYil: { color: '#8899AA', fontSize: 14, marginBottom: 24 },
  sonucKart: { backgroundColor: '#1A2635', borderRadius: 20, padding: 32, alignItems: 'center', width: '100%', marginBottom: 20 },
  netPuan: { color: '#4A90D9', fontSize: 64, fontWeight: 'bold' },
  netLabel: { color: '#8899AA', fontSize: 16, marginTop: 4 },
  sonucDetay: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A2635', borderRadius: 16, padding: 20, width: '100%', marginBottom: 16 },
  sonucItem: { flex: 1, alignItems: 'center' },
  sonucDogru: { color: '#2ECC71', fontSize: 32, fontWeight: 'bold' },
  sonucYanlis: { color: '#E74C3C', fontSize: 32, fontWeight: 'bold' },
  sonucBos: { color: '#8899AA', fontSize: 32, fontWeight: 'bold' },
  sonucLabel: { color: '#8899AA', fontSize: 13, marginTop: 4 },
  sonucAyirac: { width: 1, height: 50, backgroundColor: '#2A3F55' },
  sonucBasari: { color: '#F39C12', fontSize: 18, fontWeight: 'bold', marginBottom: 30 },
  tekrarBtn: { backgroundColor: '#4A90D9', borderRadius: 14, padding: 18, width: '100%', alignItems: 'center', marginBottom: 12 },
  tekrarBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  yilBtn: { padding: 12 },
  yilBtnText: { color: '#8899AA', fontSize: 15 },
});