import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DENEME_LISTESI } from '../constants/denemeSinavlari';

const RENK = '#E67E22';

export default function DenemeSinavlariListeScreen() {
  const { ders } = useLocalSearchParams<{ ders: string }>();
  const denemeler = DENEME_LISTESI.filter((d) => d.ders === ders);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.baslik}>{ders}</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.geriDokunma} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.geri}>← Geri</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.altBaslik}>Bir deneme seçin</Text>

        {denemeler.length === 0 ? (
          <View style={styles.bosContainer}>
            <Text style={styles.bosMetin}>Bu derste henüz deneme sınavı eklenmedi</Text>
          </View>
        ) : (
          denemeler.map((d, index) => (
            <TouchableOpacity
              key={d.id}
              style={styles.kart}
              onPress={() => router.push(`/deneme-sinavi-coz?id=${d.id}`)}
            >
              <View style={styles.numBadge}>
                <Text style={styles.numText}>{index + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.kartUst}>Deneme {index + 1}</Text>
                <Text style={styles.kartBaslik} numberOfLines={2}>{d.baslik}</Text>
                <Text style={styles.kartEtiket}>{d.soruSayisi} Soru</Text>
              </View>
              <Text style={styles.okIcon}>›</Text>
            </TouchableOpacity>
          ))
        )}
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
  bosContainer: { alignItems: 'center', justifyContent: 'center', padding: 32 },
  bosMetin: { color: '#8899AA', fontSize: 14, textAlign: 'center' },
  kart: { marginHorizontal: 16, marginBottom: 12, backgroundColor: '#1A2635', borderRadius: 14, padding: 16, borderLeftWidth: 4, borderLeftColor: RENK, flexDirection: 'row', alignItems: 'center', gap: 14 },
  numBadge: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: RENK },
  numText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  kartUst: { color: RENK, fontSize: 13, fontWeight: 'bold' },
  kartBaslik: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginTop: 2 },
  kartEtiket: { color: '#8899AA', fontSize: 12, marginTop: 4 },
  okIcon: { color: RENK, fontSize: 28, fontWeight: 'bold' },
});
