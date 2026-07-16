import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DENEME_LISTESI } from '../constants/denemeSinavlari';
import { sinavSonucuKaydet } from '../constants/denemeSinavlari/sinavSonucStore';

const RENK = '#E67E22';
const HARFLER = ['A', 'B', 'C', 'D', 'E'];

export default function DenemeSinaviCozScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const deneme = DENEME_LISTESI.find((d) => d.id === Number(id));

  const [soruIndex, setSoruIndex] = useState(0);
  const [cevaplar, setCevaplar] = useState<(number | null)[]>(
    () => new Array(deneme?.sorular.length ?? 0).fill(null)
  );

  if (!deneme) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.bosContainer}>
          <Text style={styles.bosMetin}>Deneme bulunamadı.</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.geriBtn}>
            <Text style={styles.geriBtnMetin}>Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const sorular = deneme.sorular;
  const soru = sorular[soruIndex];
  const secilen = cevaplar[soruIndex];
  const sonSoru = soruIndex === sorular.length - 1;

  const secYap = (secenekIndex: number) => {
    const yeni = [...cevaplar];
    yeni[soruIndex] = secenekIndex;
    setCevaplar(yeni);
  };

  const sonraki = () => {
    if (soruIndex < sorular.length - 1) setSoruIndex((i) => i + 1);
  };

  const onceki = () => {
    if (soruIndex > 0) setSoruIndex((i) => i - 1);
  };

  const bitir = () => {
    sinavSonucuKaydet({
      denemeId: deneme.id,
      denemeBaslik: deneme.baslik,
      sorular,
      cevaplar,
    });
    router.replace('/deneme-sinavi-sonuc');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.geri}>← Çık</Text>
        </TouchableOpacity>
        <View style={styles.headerOrta}>
          <Text style={styles.soruNo}>{soruIndex + 1} / {sorular.length}</Text>
          <Text style={styles.denemeAdi} numberOfLines={1}>{deneme.baslik}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((soruIndex + 1) / sorular.length) * 100}%` as any }]} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 12 }}>
        <Text style={styles.soruMetin}>{soru.soru}</Text>
        {soru.secenekler.map((secenek, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.secenek, secilen === i && styles.secenekSecili]}
            onPress={() => secYap(i)}
            activeOpacity={0.7}
          >
            <Text style={[styles.secenekHarf, secilen === i && styles.secenekHarfSecili]}>{HARFLER[i]})</Text>
            <Text style={[styles.secenekText, secilen === i && styles.secenekTextSecili]}>
              {secenek.replace(/^[A-E]\)\s*/, '')}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navBtn, soruIndex === 0 && styles.navBtnDisabled]}
          onPress={onceki}
          disabled={soruIndex === 0}
        >
          <Text style={styles.navBtnText}>← Geri</Text>
        </TouchableOpacity>

        {sonSoru ? (
          <TouchableOpacity style={styles.bitirBtn} onPress={bitir}>
            <Text style={styles.navBtnText}>Bitir</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.sonrakiBtn} onPress={sonraki}>
            <Text style={styles.navBtnText}>Sonraki →</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1923' },
  bosContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  bosMetin: { color: '#8899AA', fontSize: 15, marginBottom: 16 },
  geriBtn: { backgroundColor: '#1A2635', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 12 },
  geriBtnMetin: { color: '#4A90D9', fontSize: 15, fontWeight: 'bold' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 20 },
  geri: { color: '#4A90D9', fontSize: 16 },
  headerOrta: { alignItems: 'center' },
  soruNo: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  denemeAdi: { color: '#8899AA', fontSize: 11, marginTop: 2, maxWidth: 200 },
  progressBar: { height: 5, backgroundColor: '#1A2635', marginHorizontal: 16, borderRadius: 3 },
  progressFill: { height: 5, borderRadius: 3, backgroundColor: RENK },
  scroll: { flex: 1, padding: 16 },
  soruMetin: { color: '#fff', fontSize: 16, lineHeight: 24, marginBottom: 20 },
  secenek: { flexDirection: 'row', borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#2A3F55', backgroundColor: '#1A2635', alignItems: 'flex-start' },
  secenekSecili: { backgroundColor: RENK + '22', borderColor: RENK },
  secenekHarf: { color: '#8899AA', fontSize: 14, fontWeight: 'bold', marginRight: 10, width: 20 },
  secenekHarfSecili: { color: RENK },
  secenekText: { color: '#ccc', fontSize: 14, flex: 1, lineHeight: 20 },
  secenekTextSecili: { color: '#fff' },
  navBar: { flexDirection: 'row', gap: 10, padding: 16, paddingBottom: 24 },
  navBtn: { flex: 1, backgroundColor: '#1A2635', borderRadius: 10, padding: 14, alignItems: 'center' },
  navBtnDisabled: { opacity: 0.4 },
  sonrakiBtn: { flex: 1, backgroundColor: RENK, borderRadius: 10, padding: 14, alignItems: 'center' },
  bitirBtn: { flex: 1, backgroundColor: '#27AE60', borderRadius: 10, padding: 14, alignItems: 'center' },
  navBtnText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});
