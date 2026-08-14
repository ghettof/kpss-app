import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ARACLAR = [
  {
    id: 'sinav-geri-sayim',
    label: 'Sınav Geri Sayım',
    emoji: '⏳',
    renk: '#F39C12',
    aciklama: 'KPSS sınavına kalan süreyi gör',
  },
  {
    id: 'puan-hesaplama',
    label: 'Puan Hesaplama',
    emoji: '🧮',
    renk: '#2ECC71',
    aciklama: 'Doğru/yanlışına göre net ve tahmini puan',
  },
  {
    id: 'notlarim',
    label: 'Notlarım',
    emoji: '📒',
    renk: '#3498DB',
    aciklama: 'Kendi notlarını yaz ve sakla',
  },
];

export default function KpssAraclari() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.baslik}>🧰 KPSS Araçları</Text>
      <TouchableOpacity onPress={() => router.back()} style={styles.geriDon} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.geriDonText}>← Geri</Text>
      </TouchableOpacity>
      <Text style={styles.altBaslik}>Sınava hazırlığını kolaylaştıracak araçlar</Text>

      <View style={styles.grid}>
        {ARACLAR.map((arac) => (
          <TouchableOpacity
            key={arac.id}
            style={[styles.kart, { borderColor: arac.renk }]}
            onPress={() => router.push(`/${arac.id}` as any)}
            activeOpacity={0.8}
          >
            <Text style={styles.emoji}>{arac.emoji}</Text>
            <Text style={[styles.aracAdi, { color: arac.renk }]}>{arac.label}</Text>
            <Text style={styles.aciklama}>{arac.aciklama}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1923', padding: 16 },
  geriDon: { marginTop: 6, marginBottom: 10, marginLeft: -8, paddingVertical: 10, paddingHorizontal: 8 },
  geriDonText: { color: '#4A90D9', fontSize: 16 },
  baslik: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginTop: 40, marginBottom: 6, textAlign: 'center' },
  altBaslik: { fontSize: 14, color: '#8899AA', marginBottom: 24 },
  grid: { gap: 14 },
  kart: {
    backgroundColor: '#1A2635',
    borderRadius: 18,
    padding: 24,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  emoji: { fontSize: 48, marginBottom: 10 },
  aracAdi: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  aciklama: { fontSize: 13, color: '#8899AA', textAlign: 'center' },
});
