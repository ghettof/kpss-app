import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { konuCografyaData } from '../../constants/konuCografyaData';

const RENK = '#27ae60';

export default function CografyaNotlar() {
  const [acikKategori, setAcikKategori] = useState<string | null>(null);

  const kategoriler = useMemo(() => {
    const gruplar: Record<string, typeof konuCografyaData> = {};
    konuCografyaData
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
      <Text style={[styles.baslik, { color: RENK }]}>🌍 Coğrafya Notları</Text>
      <TouchableOpacity onPress={() => router.back()} style={styles.geriDon} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.geriDonText}>← Geri</Text>
      </TouchableOpacity>
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
  geriDon: { marginTop: 6, marginBottom: 10, marginLeft: -8, paddingVertical: 10, paddingHorizontal: 8 },
  geriDonText: { color: '#6c63ff', fontSize: 16 },
  baslik: { fontSize: 24, fontWeight: 'bold', marginTop: 40, marginBottom: 6, textAlign: 'center' },
  bosMetin: { color: '#888', fontSize: 14, textAlign: 'center', marginTop: 40 },
  konuKart: { backgroundColor: '#1a1a2e', borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: 1 },
  konuBaslikRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  konuBaslik: { fontSize: 15, fontWeight: '700', color: '#fff', flex: 1, marginRight: 8 },
  konuIcerikWrap: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#2a2a3e', gap: 8 },
  konuIcerik: { color: '#ccc', fontSize: 13, lineHeight: 20 },
});
