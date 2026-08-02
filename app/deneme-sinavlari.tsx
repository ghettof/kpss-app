import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DENEME_LISTESI, DERSLER } from '../constants/denemeSinavlari';

const RENK = '#E67E22';

export default function DenemeSinavlariScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.baslik}>Deneme Sınavları</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.geriDokunma} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.geri}>← Geri</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.altBaslik}>Bir ders seçin</Text>

        {DERSLER.map((ders) => {
          const denemeSayisi = DENEME_LISTESI.filter((d) => d.ders === ders).length;
          return (
            <TouchableOpacity
              key={ders}
              style={styles.kart}
              onPress={() => router.push(`/deneme-sinavlari-liste?ders=${encodeURIComponent(ders)}`)}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.kartBaslik}>{ders}</Text>
                <Text style={styles.kartEtiket}>{denemeSayisi} deneme</Text>
              </View>
              <Text style={styles.okIcon}>›</Text>
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1923' },
  header: { padding: 16, paddingTop: 20 },
  geri: { color: '#4A90D9', fontSize: 16 },
  geriDokunma: { alignSelf: 'flex-start', marginTop: 6, marginLeft: -8, paddingVertical: 10, paddingHorizontal: 8 },
  baslik: { fontSize: 20, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  altBaslik: { color: '#8899AA', fontSize: 13, textAlign: 'center', marginBottom: 16, marginTop: 4 },
  kart: { marginHorizontal: 16, marginBottom: 12, backgroundColor: '#1A2635', borderRadius: 14, padding: 16, borderLeftWidth: 4, borderLeftColor: RENK, flexDirection: 'row', alignItems: 'center', gap: 14 },
  kartBaslik: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  kartEtiket: { color: '#8899AA', fontSize: 12, marginTop: 4 },
  okIcon: { color: RENK, fontSize: 28, fontWeight: 'bold' },
});
