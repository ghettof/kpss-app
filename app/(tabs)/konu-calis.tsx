import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DERSLER = [
  { id: 'tarih-notlar', label: 'Tarih', emoji: '📜', renk: '#e67e22', aciklama: 'Osmanlı, Kurtuluş Savaşı, Cumhuriyet' },
  { id: 'cografya-notlar', label: 'Coğrafya', emoji: '🌍', renk: '#27ae60', aciklama: 'Türkiye ve Dünya Coğrafyası' },
  { id: 'vatandaslik-notlar', label: 'Vatandaşlık', emoji: '⚖️', renk: '#9b59b6', aciklama: 'Anayasa, Hukuk, İdare' },
  { id: 'turkce-notlar', label: 'Türkçe', emoji: '📝', renk: '#e74c3c', aciklama: 'Dil bilgisi, Anlam bilgisi' },
];

export default function KonuCalis() {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.geriDon} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.geriDonText}>← Geri</Text>
      </TouchableOpacity>

      <Text style={styles.baslik}>📚 Konu Çalış</Text>
      <Text style={styles.altBaslik}>Çalışmak istediğin dersi seç</Text>

      <View style={styles.grid}>
        {DERSLER.map(ders => (
          <TouchableOpacity
            key={ders.id}
            style={[styles.kart, { borderColor: ders.renk }]}
            onPress={() => router.push(`/${ders.id}` as any)}
            activeOpacity={0.8}
          >
            <Text style={styles.emoji}>{ders.emoji}</Text>
            <Text style={[styles.dersAdi, { color: ders.renk }]}>{ders.label}</Text>
            <Text style={styles.aciklama}>{ders.aciklama}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a', padding: 16 },
  geriDon: { marginTop: 40, marginBottom: -2, marginLeft: -8, paddingVertical: 10, paddingHorizontal: 8 },
  geriDonText: { color: '#6c63ff', fontSize: 16 },
  baslik: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
  altBaslik: { fontSize: 14, color: '#888', marginBottom: 24 },
  grid: { gap: 14 },
  kart: {
    backgroundColor: '#1a1a2e',
    borderRadius: 18,
    padding: 24,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  emoji: { fontSize: 48, marginBottom: 10 },
  dersAdi: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  aciklama: { fontSize: 13, color: '#888', textAlign: 'center' },
});
