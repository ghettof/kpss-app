import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>KPSS Hazırlık</Text>
        <Text style={styles.subtitle}>Başarıya giden yol</Text>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={[styles.card, { backgroundColor: '#4A90D9' }]} onPress={() => router.push('/cikmis-sorular')}>
          <Text style={styles.cardEmoji}>📚</Text>
          <Text style={styles.cardTitle}>Çıkmış Sorular</Text>
          <Text style={styles.cardDesc}>Yıllara göre sorular</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#27AE60' }]} onPress={() => router.push('/konu-calis')}>
          <Text style={styles.cardEmoji}>🎯</Text>
          <Text style={styles.cardTitle}>Konu Çalış</Text>
          <Text style={styles.cardDesc}>Konuya göre sorular</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#E67E22' }]} onPress={() => router.push('/deneme-sinavi')}>
          <Text style={styles.cardEmoji}>📝</Text>
          <Text style={styles.cardTitle}>Deneme Sınavı</Text>
          <Text style={styles.cardDesc}>120 soruluk deneme</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#C0392B' }]} onPress={() => router.push('/guncel-bilgiler')}>
          <Text style={styles.cardEmoji}>📰</Text>
          <Text style={styles.cardTitle}>Güncel Bilgiler 2026</Text>
          <Text style={styles.cardDesc}>2026 gündem bilgileri</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cardWide, { backgroundColor: '#6C63FF' }]} onPress={() => router.push('/flashcard')}>
          <Text style={styles.cardEmoji}>🃏</Text>
          <Text style={styles.cardTitle}>Bilgi Kartları</Text>
          <Text style={styles.cardDesc}>Swipe ile hızlı tekrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#8E44AD' }]} onPress={() => router.push('/ai-soru')}>
          <Text style={styles.cardEmoji}>🤖</Text>
          <Text style={styles.cardTitle}>AI Soru Üret</Text>
          <Text style={styles.cardDesc}>Yapay zeka soruları</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#16A085' }]} onPress={() => router.push('/istatistik')}>
          <Text style={styles.cardEmoji}>📊</Text>
          <Text style={styles.cardTitle}>İstatistikler</Text>
          <Text style={styles.cardDesc}>Performans analizi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#D63384' }]} onPress={() => router.push('/rozetler')}>
          <Text style={styles.cardEmoji}>🏆</Text>
          <Text style={styles.cardTitle}>Rozetler</Text>
          <Text style={styles.cardDesc}>Başarılarını gör</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1923' },
  header: { padding: 30, paddingTop: 60, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF' },
  subtitle: { fontSize: 16, color: '#8899AA', marginTop: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 16 },
  card: { width: '45%', borderRadius: 16, padding: 20, alignItems: 'center' },
  cardWide: { width: '45%', borderRadius: 16, padding: 20, alignItems: 'center' },
  cardEmoji: { fontSize: 36, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  cardDesc: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4, textAlign: 'center' },
});