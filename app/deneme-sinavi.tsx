import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TUM_SORULAR } from '../constants/sorular';

const SURE = 130 * 60;

function karistir<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function DenemeSinavi() {
  const [basladi, setBasladi] = useState(false);
  const [bitti, setBitti] = useState(false);
  const [soruIndex, setSoruIndex] = useState(0);
  const [cevaplar, setCevaplar] = useState<(number | null)[]>([]);
  const [secilen, setSecilen] = useState<number | null>(null);
  const [kalan, setKalan] = useState(SURE);
  const [sorular, setSorular] = useState<typeof TUM_SORULAR>([]);
  const intervalRef = useRef<any>(null);

  const baslat = () => {
    const karisik = karistir(TUM_SORULAR).slice(0, 120);
    setSorular(karisik);
    setCevaplar(new Array(karisik.length).fill(null));
    setBasladi(true);
    setKalan(SURE);
    setSoruIndex(0);
    setSecilen(null);
  };

  useEffect(() => {
    if (basladi && !bitti) {
      intervalRef.current = setInterval(() => {
        setKalan(k => {
          if (k <= 1) {
            clearInterval(intervalRef.current);
            setBitti(true);
            return 0;
          }
          return k - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [basladi, bitti]);

  const formatSure = (s: number) => {
    const dk = Math.floor(s / 60);
    const sn = s % 60;
    return `${dk}:${sn.toString().padStart(2, '0')}`;
  };

  const sonrakiSoru = () => {
    const yeniCevaplar = [...cevaplar];
    yeniCevaplar[soruIndex] = secilen;
    setCevaplar(yeniCevaplar);
    setSecilen(cevaplar[soruIndex + 1] ?? null);
    if (soruIndex < sorular.length - 1) {
      setSoruIndex(i => i + 1);
    }
  };

  const oncekiSoru = () => {
    const yeniCevaplar = [...cevaplar];
    yeniCevaplar[soruIndex] = secilen;
    setCevaplar(yeniCevaplar);
    setSecilen(cevaplar[soruIndex - 1] ?? null);
    if (soruIndex > 0) {
      setSoruIndex(i => i - 1);
    }
  };

  const sinavaBitir = () => {
    clearInterval(intervalRef.current);
    const yeniCevaplar = [...cevaplar];
    yeniCevaplar[soruIndex] = secilen;
    setCevaplar(yeniCevaplar);
    setBitti(true);
  };

  const sonucHesapla = () => {
    let dogru = 0, yanlis = 0, bos = 0;
    sorular.forEach((s, i) => {
      if (cevaplar[i] === null) bos++;
      else if (cevaplar[i] === s.cevap) dogru++;
      else yanlis++;
    });
    return { dogru, yanlis, bos };
  };

  if (!basladi) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.baslangic}>
          <TouchableOpacity onPress={() => router.back()} style={styles.geriBtn}>
            <Text style={styles.geri}>← Geri</Text>
          </TouchableOpacity>
          <Text style={styles.baslikBuyuk}>📝 Deneme Sınavı</Text>
          <View style={styles.bilgiKart}>
            <Text style={styles.bilgiBaslik}>Sınav Bilgileri</Text>
            <Text style={styles.bilgiSatir}>⏱ Süre: 130 dakika</Text>
            <Text style={styles.bilgiSatir}>📊 Soru sayısı: 120 soru</Text>
            <Text style={styles.bilgiSatir}>📚 Dersler: Türkçe, Matematik, Tarih, Coğrafya, Vatandaşlık</Text>
            <Text style={styles.bilgiSatir}>🎯 Sorular rastgele seçilir</Text>
            <Text style={styles.bilgiSatir}>⚠️ Sınav başladıktan sonra geri çıkamazsın</Text>
          </View>
          <TouchableOpacity style={styles.baslatBtn} onPress={baslat}>
            <Text style={styles.baslatText}>Sınava Başla</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (bitti) {
    const { dogru, yanlis, bos } = sonucHesapla();
    const net = dogru - yanlis * 0.25;
    const puan = net > 0 ? net.toFixed(1) : '0.0';
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.baslangic}>
          <Text style={styles.baslikBuyuk}>🏆 Sınav Bitti!</Text>
          <View style={styles.sonucKart}>
            <Text style={styles.sonucPuan}>{puan}</Text>
            <Text style={styles.sonucPuanLabel}>Net Puan</Text>
          </View>
          <View style={styles.bilgiKart}>
            <Text style={[styles.bilgiSatir, { color: '#2ECC71' }]}>✓ Doğru: {dogru}</Text>
            <Text style={[styles.bilgiSatir, { color: '#E74C3C' }]}>✗ Yanlış: {yanlis}</Text>
            <Text style={[styles.bilgiSatir, { color: '#8899AA' }]}>○ Boş: {bos}</Text>
          </View>

          <Text style={styles.yanlisSoruBaslik}>Yanlış / Boş Sorular</Text>
          {sorular.map((s, i) => {
            if (cevaplar[i] === s.cevap) return null;
            return (
              <View key={i} style={styles.yanlisSoruKart}>
                <Text style={styles.yanlisSoruNo}>{i + 1}. {s.ders} • {s.yil}</Text>
                <Text style={styles.yanlisSoruMetin} numberOfLines={2}>{s.soru}</Text>
                <Text style={styles.dogruCevap}>Doğru: {s.secenekler[s.cevap]}</Text>
                {cevaplar[i] !== null && (
                  <Text style={styles.yanlisCevap}>Senin cevabın: {s.secenekler[cevaplar[i]!]}</Text>
                )}
              </View>
            );
          })}

          <TouchableOpacity style={[styles.baslatBtn, { marginTop: 20 }]} onPress={() => {
            setBasladi(false);
            setBitti(false);
            setSoruIndex(0);
            setCevaplar([]);
            setSecilen(null);
          }}>
            <Text style={styles.baslatText}>Tekrar Dene</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.baslatBtn, { backgroundColor: '#555', marginTop: 10 }]} onPress={() => router.back()}>
            <Text style={styles.baslatText}>Ana Sayfaya Dön</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const soru = sorular[soruIndex];
  const sureDusuk = kalan < 300;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ustBar}>
        <Text style={styles.soruSayac}>{soruIndex + 1} / {sorular.length}</Text>
        <Text style={[styles.sure, sureDusuk && styles.sureDusuk]}>
          ⏱ {formatSure(kalan)}
        </Text>
        <TouchableOpacity onPress={sinavaBitir} style={styles.bitirBtn}>
          <Text style={styles.bitirText}>Bitir</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.soruKart}>
          <Text style={styles.soruBilgi}>{soru.yil} • {soru.ders}</Text>
          <Text style={styles.soruMetin}>{soru.soru}</Text>
          {soru.secenekler.map((s, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.secenek, secilen === i && styles.secenekSecili]}
              onPress={() => setSecilen(i)}
            >
              <Text style={styles.secenekText}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.navBar}>
          <TouchableOpacity
            style={[styles.navBtn, soruIndex === 0 && styles.navBtnDisabled]}
            onPress={oncekiSoru}
            disabled={soruIndex === 0}
          >
            <Text style={styles.navBtnText}>← Önceki</Text>
          </TouchableOpacity>

          {soruIndex === sorular.length - 1 ? (
            <TouchableOpacity style={styles.bitirBtnBuyuk} onPress={sinavaBitir}>
              <Text style={styles.baslatText}>Sınavı Bitir</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.navBtnSonraki} onPress={sonrakiSoru}>
              <Text style={styles.navBtnText}>Sonraki →</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.palet}>
          <Text style={styles.paletBaslik}>Sorular</Text>
          <View style={styles.paletGrid}>
            {sorular.map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.paletBtn,
                  i === soruIndex && styles.paletBtnAktif,
                  cevaplar[i] !== null && styles.paletBtnCevaplandi,
                ]}
                onPress={() => {
                  const yeniCevaplar = [...cevaplar];
                  yeniCevaplar[soruIndex] = secilen;
                  setCevaplar(yeniCevaplar);
                  setSecilen(cevaplar[i] ?? null);
                  setSoruIndex(i);
                }}
              >
                <Text style={styles.paletBtnText}>{i + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1923' },
  baslangic: { padding: 24, alignItems: 'center' },
  geriBtn: { alignSelf: 'flex-start', marginBottom: 20 },
  geri: { color: '#4A90D9', fontSize: 16 },
  baslikBuyuk: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 24, textAlign: 'center' },
  bilgiKart: { backgroundColor: '#1A2635', borderRadius: 16, padding: 20, width: '100%', marginBottom: 24 },
  bilgiBaslik: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  bilgiSatir: { color: '#ccc', fontSize: 15, marginBottom: 8, lineHeight: 22 },
  baslatBtn: { backgroundColor: '#4A90D9', borderRadius: 12, padding: 18, width: '100%', alignItems: 'center' },
  baslatText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  sonucKart: { backgroundColor: '#1A2635', borderRadius: 16, padding: 30, alignItems: 'center', marginBottom: 20, width: '100%' },
  sonucPuan: { fontSize: 64, fontWeight: 'bold', color: '#4A90D9' },
  sonucPuanLabel: { color: '#8899AA', fontSize: 16, marginTop: 4 },
  yanlisSoruBaslik: { color: '#fff', fontSize: 18, fontWeight: 'bold', alignSelf: 'flex-start', marginBottom: 12 },
  yanlisSoruKart: { backgroundColor: '#1A2635', borderRadius: 12, padding: 14, width: '100%', marginBottom: 10 },
  yanlisSoruNo: { color: '#8899AA', fontSize: 12, marginBottom: 4 },
  yanlisSoruMetin: { color: '#fff', fontSize: 14, marginBottom: 6 },
  dogruCevap: { color: '#2ECC71', fontSize: 13 },
  yanlisCevap: { color: '#E74C3C', fontSize: 13, marginTop: 2 },
  ustBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 50, backgroundColor: '#1A2635' },
  soruSayac: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  sure: { color: '#2ECC71', fontSize: 18, fontWeight: 'bold' },
  sureDusuk: { color: '#E74C3C' },
  bitirBtn: { backgroundColor: '#E74C3C', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  bitirText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  soruKart: { margin: 16, backgroundColor: '#1A2635', borderRadius: 16, padding: 20 },
  soruBilgi: { color: '#8899AA', fontSize: 12, marginBottom: 12 },
  soruMetin: { color: '#fff', fontSize: 16, lineHeight: 24, marginBottom: 20 },
  secenek: { borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#2A3F55', backgroundColor: '#1E2D3D' },
  secenekSecili: { backgroundColor: '#1A3A6B', borderColor: '#4A90D9' },
  secenekText: { color: '#fff', fontSize: 14 },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, marginBottom: 16 },
  navBtn: { backgroundColor: '#1A2635', borderRadius: 10, padding: 14, flex: 1, alignItems: 'center', marginRight: 8 },
  navBtnSonraki: { backgroundColor: '#4A90D9', borderRadius: 10, padding: 14, flex: 1, alignItems: 'center' },
  navBtnDisabled: { opacity: 0.4 },
  navBtnText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  bitirBtnBuyuk: { backgroundColor: '#27AE60', borderRadius: 10, padding: 14, flex: 1, alignItems: 'center' },
  palet: { margin: 16, backgroundColor: '#1A2635', borderRadius: 16, padding: 16, marginBottom: 32 },
  paletBaslik: { color: '#8899AA', fontSize: 13, marginBottom: 12 },
  paletGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  paletBtn: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#0F1923', alignItems: 'center', justifyContent: 'center' },
  paletBtnAktif: { backgroundColor: '#4A90D9' },
  paletBtnCevaplandi: { backgroundColor: '#27AE60' },
  paletBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});