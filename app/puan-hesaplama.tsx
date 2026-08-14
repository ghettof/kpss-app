import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

function sayiyaCevir(deger: string): number {
  const n = parseFloat(deger.replace(',', '.'));
  return isNaN(n) ? 0 : n;
}

export default function PuanHesaplama() {
  const [gyDogru, setGyDogru] = useState('');
  const [gyYanlis, setGyYanlis] = useState('');
  const [gkDogru, setGkDogru] = useState('');
  const [gkYanlis, setGkYanlis] = useState('');

  const sonuc = useMemo(() => {
    const gyD = sayiyaCevir(gyDogru);
    const gyY = sayiyaCevir(gyYanlis);
    const gkD = sayiyaCevir(gkDogru);
    const gkY = sayiyaCevir(gkYanlis);

    const gyNet = Math.max(0, gyD) - Math.max(0, gyY) / 4;
    const gkNet = Math.max(0, gkD) - Math.max(0, gkY) / 4;
    const toplamNet = gyNet + gkNet;

    // Yaklaşık puan: 120 soruluk (60 GY + 60 GK) taban üzerinden doğrusal bir tahmindir.
    // Gerçek KPSS puanı ÖSYM tarafından tüm adayların ortalama ve standart sapmasına göre hesaplanır.
    const tahminiPuan = Math.min(100, Math.max(0, 50 + (toplamNet / 120) * 50));

    return { gyNet, gkNet, toplamNet, tahminiPuan };
  }, [gyDogru, gyYanlis, gkDogru, gkYanlis]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.baslik}>🧮 Puan Hesaplama</Text>
      <TouchableOpacity onPress={() => router.back()} style={styles.geriDon} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.geriDonText}>← Geri</Text>
      </TouchableOpacity>
      <Text style={styles.altBaslik}>Doğru/yanlış sayılarını gir, netini ve tahmini puanını gör</Text>

      <View style={styles.bolum}>
        <Text style={styles.bolumBaslik}>Genel Yetenek (60 soru)</Text>
        <View style={styles.girisRow}>
          <View style={styles.girisAlan}>
            <Text style={styles.girisLabel}>Doğru</Text>
            <TextInput
              style={styles.input}
              value={gyDogru}
              onChangeText={setGyDogru}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#556677"
            />
          </View>
          <View style={styles.girisAlan}>
            <Text style={styles.girisLabel}>Yanlış</Text>
            <TextInput
              style={styles.input}
              value={gyYanlis}
              onChangeText={setGyYanlis}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#556677"
            />
          </View>
        </View>
      </View>

      <View style={styles.bolum}>
        <Text style={styles.bolumBaslik}>Genel Kültür (60 soru)</Text>
        <View style={styles.girisRow}>
          <View style={styles.girisAlan}>
            <Text style={styles.girisLabel}>Doğru</Text>
            <TextInput
              style={styles.input}
              value={gkDogru}
              onChangeText={setGkDogru}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#556677"
            />
          </View>
          <View style={styles.girisAlan}>
            <Text style={styles.girisLabel}>Yanlış</Text>
            <TextInput
              style={styles.input}
              value={gkYanlis}
              onChangeText={setGkYanlis}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#556677"
            />
          </View>
        </View>
      </View>

      <View style={styles.sonucKutu}>
        <View style={styles.sonucRow}>
          <Text style={styles.sonucLabel}>GY Net</Text>
          <Text style={styles.sonucDeger}>{sonuc.gyNet.toFixed(2)}</Text>
        </View>
        <View style={styles.sonucRow}>
          <Text style={styles.sonucLabel}>GK Net</Text>
          <Text style={styles.sonucDeger}>{sonuc.gkNet.toFixed(2)}</Text>
        </View>
        <View style={[styles.sonucRow, styles.sonucRowVurgu]}>
          <Text style={styles.sonucLabelVurgu}>Toplam Net</Text>
          <Text style={styles.sonucDegerVurgu}>{sonuc.toplamNet.toFixed(2)}</Text>
        </View>
        <View style={styles.ayirici} />
        <View style={styles.sonucRow}>
          <Text style={styles.sonucLabelVurgu}>Tahmini Puan</Text>
          <Text style={styles.tahminiPuanDeger}>{sonuc.tahminiPuan.toFixed(1)}</Text>
        </View>
      </View>

      <Text style={styles.notMetni}>
        Not: Gerçek KPSS puanı, ÖSYM tarafından o sınava giren tüm adayların ortalama ve standart
        sapmasına göre hesaplanan standart puan sistemine dayanır. Buradaki puan yalnızca fikir vermesi
        için yapılan basit bir tahmindir, resmi sonucun yerine geçmez.
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
  altBaslik: { fontSize: 14, color: '#8899AA', marginBottom: 20, textAlign: 'center' },
  bolum: { backgroundColor: '#1A2635', borderRadius: 16, padding: 16, marginBottom: 14 },
  bolumBaslik: { color: '#2ECC71', fontSize: 15, fontWeight: 'bold', marginBottom: 12 },
  girisRow: { flexDirection: 'row', gap: 12 },
  girisAlan: { flex: 1 },
  girisLabel: { color: '#8899AA', fontSize: 12, marginBottom: 6 },
  input: { backgroundColor: '#0F1923', borderRadius: 10, borderWidth: 1, borderColor: '#2A3F55', color: '#fff', padding: 12, fontSize: 15 },
  sonucKutu: { backgroundColor: '#1A2635', borderRadius: 16, padding: 20, marginTop: 6 },
  sonucRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  sonucRowVurgu: { marginTop: 4 },
  sonucLabel: { color: '#8899AA', fontSize: 14 },
  sonucDeger: { color: '#fff', fontSize: 14, fontWeight: '600' },
  sonucLabelVurgu: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  sonucDegerVurgu: { color: '#2ECC71', fontSize: 18, fontWeight: 'bold' },
  ayirici: { height: 1, backgroundColor: '#2A3F55', marginVertical: 8 },
  tahminiPuanDeger: { color: '#F39C12', fontSize: 26, fontWeight: 'bold' },
  notMetni: { color: '#556677', fontSize: 12, textAlign: 'center', marginTop: 20, lineHeight: 18 },
});
