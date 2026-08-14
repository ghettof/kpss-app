import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Sinav = {
  id: string;
  ad: string;
  sekmeAdi: string;
  tarihSaat: string;
  renk: string;
};

const SINAVLAR: Sinav[] = [
  {
    id: 'lisans',
    ad: "KPSS Lisans'a Kalan Süre",
    sekmeAdi: 'KPSS Lisans',
    tarihSaat: '2026-09-06T10:15:00',
    renk: '#F39C12',
  },
  {
    id: 'onlisans',
    ad: "KPSS Ön Lisans'a Kalan Süre",
    sekmeAdi: 'KPSS Ön Lisans',
    tarihSaat: '2026-10-04T10:15:00',
    renk: '#3498DB',
  },
];

function kalanSureHesapla(hedefTarihSaat: string) {
  const hedef = new Date(hedefTarihSaat).getTime();
  const simdi = Date.now();
  const fark = Math.max(0, hedef - simdi);

  const gun = Math.floor(fark / (1000 * 60 * 60 * 24));
  const saat = Math.floor((fark / (1000 * 60 * 60)) % 24);
  const dakika = Math.floor((fark / (1000 * 60)) % 60);
  const saniye = Math.floor((fark / 1000) % 60);

  return { gun, saat, dakika, saniye, gecti: hedef <= simdi };
}

export default function SinavGeriSayim() {
  const [aktifId, setAktifId] = useState(SINAVLAR[0].id);
  const [simdi, setSimdi] = useState(Date.now());

  useEffect(() => {
    const zamanlayici = setInterval(() => setSimdi(Date.now()), 1000);
    return () => clearInterval(zamanlayici);
  }, []);

  const aktifSinav = useMemo(() => SINAVLAR.find((s) => s.id === aktifId)!, [aktifId]);
  const kalan = useMemo(() => kalanSureHesapla(aktifSinav.tarihSaat), [aktifSinav, simdi]);

  const formatliTarih = useMemo(() => {
    const d = new Date(aktifSinav.tarihSaat);
    const tarih = d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });
    const saat = d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    return `${tarih}, saat ${saat}`;
  }, [aktifSinav]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.baslik}>⏳ Sınav Geri Sayım</Text>
      <TouchableOpacity onPress={() => router.back()} style={styles.geriDon} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.geriDonText}>← Geri</Text>
      </TouchableOpacity>

      <View style={styles.sekmeRow}>
        {SINAVLAR.map((sinav) => (
          <TouchableOpacity
            key={sinav.id}
            style={[
              styles.sekme,
              { borderColor: sinav.renk },
              aktifId === sinav.id && { backgroundColor: sinav.renk },
            ]}
            onPress={() => setAktifId(sinav.id)}
            activeOpacity={0.8}
          >
            <Text style={[styles.sekmeText, aktifId === sinav.id && styles.sekmeTextAktif]}>{sinav.sekmeAdi}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.altBaslik, { color: aktifSinav.renk }]}>{aktifSinav.ad}</Text>
      <Text style={styles.tarihMetni}>{formatliTarih}</Text>

      {kalan.gecti ? (
        <View style={styles.gectiKutu}>
          <Text style={styles.gectiMetni}>Bu sınav tarihi geçti.</Text>
        </View>
      ) : (
        <View style={styles.sayacGrid}>
          <View style={[styles.sayacKutu, { borderColor: aktifSinav.renk }]}>
            <Text style={[styles.sayacSayi, { color: aktifSinav.renk }]}>{kalan.gun}</Text>
            <Text style={styles.sayacLabel}>Gün</Text>
          </View>
          <View style={[styles.sayacKutu, { borderColor: aktifSinav.renk }]}>
            <Text style={[styles.sayacSayi, { color: aktifSinav.renk }]}>{kalan.saat}</Text>
            <Text style={styles.sayacLabel}>Saat</Text>
          </View>
          <View style={[styles.sayacKutu, { borderColor: aktifSinav.renk }]}>
            <Text style={[styles.sayacSayi, { color: aktifSinav.renk }]}>{kalan.dakika}</Text>
            <Text style={styles.sayacLabel}>Dakika</Text>
          </View>
          <View style={[styles.sayacKutu, { borderColor: aktifSinav.renk }]}>
            <Text style={[styles.sayacSayi, { color: aktifSinav.renk }]}>{kalan.saniye}</Text>
            <Text style={styles.sayacLabel}>Saniye</Text>
          </View>
        </View>
      )}

      <Text style={styles.notMetni}>
        Not: Tarihler ÖSYM'nin yayımladığı sınav takvimine göredir. Resmi takvimde değişiklik olması halinde
        buradaki tarihler güncellenecektir.
      </Text>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1923', padding: 16 },
  geriDon: { marginTop: 6, marginBottom: 10, marginLeft: -8, paddingVertical: 10, paddingHorizontal: 8 },
  geriDonText: { color: '#4A90D9', fontSize: 16 },
  baslik: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginTop: 40, marginBottom: 6, textAlign: 'center' },
  sekmeRow: { flexDirection: 'row', gap: 10, marginTop: 10, marginBottom: 20 },
  sekme: { flex: 1, borderRadius: 12, borderWidth: 1.5, paddingVertical: 12, alignItems: 'center' },
  sekmeText: { color: '#8899AA', fontSize: 14, fontWeight: '600' },
  sekmeTextAktif: { color: '#0F1923', fontWeight: 'bold' },
  altBaslik: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 6 },
  tarihMetni: { fontSize: 15, color: '#8899AA', textAlign: 'center', marginBottom: 24 },
  gectiKutu: { backgroundColor: '#1A2635', borderRadius: 16, padding: 24, alignItems: 'center', marginBottom: 20 },
  gectiMetni: { color: '#fff', fontSize: 15, textAlign: 'center' },
  sayacGrid: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  sayacKutu: { flex: 1, backgroundColor: '#1A2635', borderRadius: 16, paddingVertical: 20, alignItems: 'center', borderWidth: 1 },
  sayacSayi: { fontSize: 30, fontWeight: 'bold' },
  sayacLabel: { fontSize: 12, color: '#8899AA', marginTop: 4 },
  notMetni: { color: '#556677', fontSize: 12, textAlign: 'center', marginTop: 20, lineHeight: 18 },
});
