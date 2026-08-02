import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { konuTurkceData } from '../../constants/konuTurkceData';

const RENK = '#e74c3c';

export default function TurkceNotlar() {
  const [acikKategori, setAcikKategori] = useState<string | null>(null);

  const kategoriler = useMemo(() => {
    const gruplar: Record<string, typeof konuTurkceData> = {};
    konuTurkceData
      .filter((n) => n.aktif)
      .forEach((n) => {
        if (!gruplar[n.kategori]) gruplar[n.kategori] = [];
        gruplar[n.kategori].push(n);
      });
    return Object.entries(gruplar).map(([kategori, notlar], i) => ({
      kategori,
      notlar,
      baslik: `📌 ${i + 1}. ${kategori} (${notlar.length} konu)`,
    }));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.geriDon} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.geriDonText}>← Geri</Text>
      </TouchableOpacity>
      <Text style={[styles.baslik, { color: RENK }]}>📝 Türkçe Notları</Text>
      {kategoriler.length === 0 && (
        <Text style={styles.bosMetin}>Henüz içerik eklenmedi.</Text>
      )}
      {kategoriler.map((k) => (
        <TouchableOpacity
          key={k.kategori}
          style={[styles.konuKart, { borderColor: acikKategori === k.kategori ? RENK : '#2a2a3e' }]}
          onPress={() => setAcikKategori(acikKategori === k.kategori ? null : k.kategori)}
          activeOpacity={0.8}
        >
          <View style={styles.konuBaslikRow}>
            <Text style={[styles.konuBaslik, acikKategori === k.kategori && { color: RENK }]}>
              {k.baslik}
            </Text>
            <Text style={{ color: acikKategori === k.kategori ? RENK : '#666', fontSize: 16 }}>
              {acikKategori === k.kategori ? '▲' : '▼'}
            </Text>
          </View>
          {acikKategori === k.kategori && (
            <View style={styles.konuIcerikWrap}>
              {k.notlar.map((n) => (
                <Text key={n.id} style={styles.konuIcerik}>
                  • {n.on_yuz}{n.arka_yuz ? `: ${n.arka_yuz}` : ''}
                </Text>
              ))}
            </View>
          )}
        </TouchableOpacity>
      ))}
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a', padding: 16 },
  geriDon: { marginTop: 40, marginBottom: -2, marginLeft: -8, paddingVertical: 10, paddingHorizontal: 8 },
  geriDonText: { color: '#6c63ff', fontSize: 16 },
  baslik: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  bosMetin: { color: '#888', fontSize: 14, textAlign: 'center', marginTop: 40 },
  konuKart: { backgroundColor: '#1a1a2e', borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: 1 },
  konuBaslikRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  konuBaslik: { fontSize: 15, fontWeight: '700', color: '#fff', flex: 1, marginRight: 8 },
  konuIcerikWrap: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#2a2a3e', gap: 8 },
  konuIcerik: { color: '#ccc', fontSize: 13, lineHeight: 20 },
});
