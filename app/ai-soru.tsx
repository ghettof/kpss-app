import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const DERSLER = ['Türkçe', 'Matematik', 'Tarih', 'Coğrafya', 'Vatandaşlık'];
const SEVIYELER = ['Lisans', 'Ön Lisans'];
const ZORLUKLAR = ['Kolay', 'Orta', 'Zor'];

export default function AiSoru() {
  const [secilenDers, setSecilenDers] = useState('Tarih');
  const [secilenSeviye, setSecilenSeviye] = useState('Lisans');
  const [secilenZorluk, setSecilenZorluk] = useState('Orta');
  const [konu, setKonu] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const [sorular, setSorular] = useState<any[]>([]);
  const [secilen, setSecilen] = useState<{[key: number]: number}>({});
  const [gosterCevap, setGosterCevap] = useState<{[key: number]: boolean}>({});
  const [hata, setHata] = useState('');

  const soruUret = async () => {
    setYukleniyor(true);
    setHata('');
    setSorular([]);
    setSecilen({});
    setGosterCevap({});

    try {
      const response = await fetch('https://kpss-api.vercel.app/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ders: secilenDers,
          seviye: secilenSeviye,
          zorluk: secilenZorluk,
          konu: konu,
        }),
      });
      const data = await response.json();
      const parsed = Array.isArray(data) ? data : (data.sorular || []);
setSorular(parsed);
    } catch {
      setHata('Soru üretilirken hata oluştu. Lütfen tekrar dene.');
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.geri}>← Geri</Text>
          </TouchableOpacity>
          <Text style={styles.baslik}>🤖 AI Soru Üret</Text>
          <View style={{ width: 50 }} />
        </View>

        <Text style={styles.etiket}>Ders</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtreSatir}>
          {DERSLER.map(d => (
            <TouchableOpacity key={d} style={[styles.filtre, secilenDers === d && styles.filtreAktif]} onPress={() => setSecilenDers(d)}>
              <Text style={[styles.filtreText, secilenDers === d && styles.filtreTextAktif]}>{d}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.etiket}>Seviye</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtreSatir}>
          {SEVIYELER.map(s => (
            <TouchableOpacity key={s} style={[styles.filtre, secilenSeviye === s && styles.filtreAktif]} onPress={() => setSecilenSeviye(s)}>
              <Text style={[styles.filtreText, secilenSeviye === s && styles.filtreTextAktif]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.etiket}>Zorluk</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtreSatir}>
          {ZORLUKLAR.map(z => (
            <TouchableOpacity key={z} style={[styles.filtre, secilenZorluk === z && styles.filtreZorlukAktif]} onPress={() => setSecilenZorluk(z)}>
              <Text style={[styles.filtreText, secilenZorluk === z && styles.filtreTextAktif]}>{z}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.etiket}>Konu (opsiyonel)</Text>
        <TextInput style={styles.input} placeholder="Örn: Osmanlı tarihi, kesirler..." placeholderTextColor="#8899AA" value={konu} onChangeText={setKonu} />

        <TouchableOpacity style={[styles.uretBtn, yukleniyor && styles.uretBtnDisabled]} onPress={soruUret} disabled={yukleniyor}>
          {yukleniyor ? <ActivityIndicator color="#fff" /> : <Text style={styles.uretBtnText}>✨ 5 Soru Üret</Text>}
        </TouchableOpacity>

        {hata ? <Text style={styles.hata}>{hata}</Text> : null}

        {sorular.map((soru, i) => (
          <View key={i} style={styles.soruKart}>
            <Text style={styles.soruNo}>Soru {i + 1}</Text>
            <Text style={styles.soruMetin}>{soru.soru}</Text>
            {soru.secenekler.map((s: string, j: number) => {
              let renk = '#1E2D3D';
              if (gosterCevap[i]) {
                if (j === soru.cevap) renk = '#1A6B3C';
                else if (j === secilen[i]) renk = '#6B1A1A';
              } else if (secilen[i] === j) renk = '#1A3A6B';
              return (
                <TouchableOpacity key={j} style={[styles.secenek, { backgroundColor: renk }]} onPress={() => !gosterCevap[i] && setSecilen(prev => ({ ...prev, [i]: j }))}>
                  <Text style={styles.secenekText}>{s}</Text>
                </TouchableOpacity>
              );
            })}
            {!gosterCevap[i] ? (
              <TouchableOpacity style={styles.kontrol} onPress={() => setGosterCevap(prev => ({ ...prev, [i]: true }))}>
                <Text style={styles.kontrolText}>Cevabı Kontrol Et</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.aciklamaKutu}>
                <Text style={styles.aciklamaBaslik}>Açıklama:</Text>
                <Text style={styles.aciklamaMetin}>{soru.aciklama}</Text>
              </View>
            )}
          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1923' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50 },
  geri: { color: '#4A90D9', fontSize: 16 },
  baslik: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  etiket: { color: '#8899AA', fontSize: 13, marginLeft: 16, marginBottom: 6, marginTop: 12 },
  filtreSatir: { paddingHorizontal: 16, marginBottom: 4 },
  filtre: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: '#1A2635', marginRight: 8 },
  filtreAktif: { backgroundColor: '#4A90D9' },
  filtreZorlukAktif: { backgroundColor: '#E67E22' },
  filtreText: { color: '#8899AA', fontSize: 13 },
  filtreTextAktif: { color: '#fff', fontWeight: 'bold' },
  input: { margin: 16, backgroundColor: '#1A2635', borderRadius: 12, padding: 14, color: '#fff', fontSize: 15, borderWidth: 1, borderColor: '#2A3F55' },
  uretBtn: { margin: 16, backgroundColor: '#8E44AD', borderRadius: 12, padding: 16, alignItems: 'center' },
  uretBtnDisabled: { opacity: 0.6 },
  uretBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  hata: { color: '#E74C3C', textAlign: 'center', margin: 16 },
  soruKart: { margin: 16, marginTop: 8, backgroundColor: '#1A2635', borderRadius: 16, padding: 20 },
  soruNo: { color: '#8E44AD', fontSize: 13, fontWeight: 'bold', marginBottom: 8 },
  soruMetin: { color: '#fff', fontSize: 15, lineHeight: 22, marginBottom: 16 },
  secenek: { borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: '#2A3F55' },
  secenekText: { color: '#fff', fontSize: 14 },
  kontrol: { backgroundColor: '#4A90D9', borderRadius: 10, padding: 12, alignItems: 'center', marginTop: 8 },
  kontrolText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  aciklamaKutu: { marginTop: 12, backgroundColor: '#0F1923', borderRadius: 10, padding: 12 },
  aciklamaBaslik: { color: '#F39C12', fontWeight: 'bold', marginBottom: 4 },
  aciklamaMetin: { color: '#ccc', fontSize: 13, lineHeight: 20 },
});
