import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRozetler } from '@/hooks/useRozetler';

export default function Rozetler() {
  const { rozetler } = useRozetler();
  const kazanilanSayi = rozetler.filter(r => r.kazanildi).length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.geri}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.baslik}>🏆 Rozetler</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.ozet}>
        <Text style={styles.ozetSayi}>{kazanilanSayi} / {rozetler.length}</Text>
        <Text style={styles.ozetLabel}>Rozet Kazanıldı</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(kazanilanSayi / rozetler.length) * 100}%` as any }]} />
        </View>
      </View>

      <View style={styles.grid}>
        {rozetler.map(rozet => (
          <View key={rozet.id} style={[styles.rozetKart, !rozet.kazanildi && styles.rozetKilitli]}>
            <Text style={[styles.rozetEmoji, !rozet.kazanildi && styles.rozetEmojiKilitli]}>
              {rozet.kazanildi ? rozet.emoji : '🔒'}
            </Text>
            <Text style={[styles.rozetBaslik, !rozet.kazanildi && styles.rozetMetinKilitli]}>
              {rozet.baslik}
            </Text>
            <Text style={[styles.rozetAciklama, !rozet.kazanildi && styles.rozetMetinKilitli]}>
              {rozet.aciklama}
            </Text>
            {rozet.kazanildi && rozet.tarih && (
              <Text style={styles.rozetTarih}>
                {new Date(rozet.tarih).toLocaleDateString('tr-TR')}
              </Text>
            )}
          </View>
        ))}
      </View>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1923' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 55 },
  geri: { color: '#4A90D9', fontSize: 16 },
  baslik: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  ozet: { margin: 16, backgroundColor: '#1A2635', borderRadius: 20, padding: 24, alignItems: 'center' },
  ozetSayi: { fontSize: 40, fontWeight: 'bold', color: '#F1C40F' },
  ozetLabel: { color: '#aaa', fontSize: 14, marginTop: 4, marginBottom: 16 },
  progressBar: { width: '100%', height: 8, backgroundColor: '#2A3F55', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: 8, backgroundColor: '#F1C40F', borderRadius: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 12, gap: 12 },
  rozetKart: { width: '45%', backgroundColor: '#1A2635', borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#F1C40F' },
  rozetKilitli: { borderColor: '#2A3F55', backgroundColor: '#141e2a' },
  rozetEmoji: { fontSize: 40, marginBottom: 8 },
  rozetEmojiKilitli: { opacity: 0.4 },
  rozetBaslik: { color: '#fff', fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 4 },
  rozetAciklama: { color: '#aaa', fontSize: 11, textAlign: 'center' },
  rozetMetinKilitli: { color: '#555' },
  rozetTarih: { color: '#F1C40F', fontSize: 10, marginTop: 6 },
});