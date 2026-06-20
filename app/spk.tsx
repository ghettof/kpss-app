import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DENEME1, DENEME1_BASLIK, DENEME1_KONU, Soru } from '../constants/sorular/spk/deneme1';
import { DENEME2, DENEME2_BASLIK, DENEME2_KONU } from '../constants/sorular/spk/deneme2';
import { DENEME3, DENEME3_BASLIK, DENEME3_KONU } from '../constants/sorular/spk/deneme3';
import { DENEME4, DENEME4_BASLIK, DENEME4_KONU } from '../constants/sorular/spk/deneme4';
import { DENEME5, DENEME5_BASLIK, DENEME5_KONU } from '../constants/sorular/spk/deneme5';

const DENEMELER = [
  { id: 1, baslik: DENEME1_BASLIK, konu: DENEME1_KONU, sorular: DENEME1, renk: '#4A90D9' },
  { id: 2, baslik: DENEME2_BASLIK, konu: DENEME2_KONU, sorular: DENEME2, renk: '#4A90D9' },
  { id: 3, baslik: DENEME3_BASLIK, konu: DENEME3_KONU, sorular: DENEME3, renk: '#E67E22' },
  { id: 4, baslik: DENEME4_BASLIK, konu: DENEME4_KONU, sorular: DENEME4, renk: '#E67E22' },
  { id: 5, baslik: DENEME5_BASLIK, konu: DENEME5_KONU, sorular: DENEME5, renk: '#27AE60' },
];

type Ekran = 'denemeListe' | 'sinav' | 'sonuc';

export default function SPKSinav() {
  const [ekran, setEkran] = useState<Ekran>('denemeListe');
  const [secilenDeneme, setSecilenDeneme] = useState<typeof DENEMELER[0] | null>(null);
  const [soruIndex, setSoruIndex] = useState(0);
  const [secilen, setSecilen] = useState<string | null>(null);
  const [cevapVerildi, setCevapVerildi] = useState(false);
  const [dogru, setDogru] = useState(0);
  const [yanlis, setYanlis] = useState(0);

  const aktifSorular: Soru[] = secilenDeneme?.sorular ?? [];
  const soru = aktifSorular[soruIndex];
  const renk = secilenDeneme?.renk ?? '#4A90D9';

  const basla = (deneme: typeof DENEMELER[0]) => {
    setSecilenDeneme(deneme); setSoruIndex(0); setSecilen(null);
    setCevapVerildi(false); setDogru(0); setYanlis(0); setEkran('sinav');
  };
  const cevapla = (cevap: string) => {
    if (cevapVerildi) return;
    setSecilen(cevap); setCevapVerildi(true);
    if (cevap === soru.dogruCevap) setDogru(d => d + 1); else setYanlis(y => y + 1);
  };
  const sonraki = () => {
    if (soruIndex + 1 >= aktifSorular.length) setEkran('sonuc');
    else { setSoruIndex(i => i + 1); setSecilen(null); setCevapVerildi(false); }
  };
  const tekrar = () => {
    setSoruIndex(0); setSecilen(null); setCevapVerildi(false);
    setDogru(0); setYanlis(0); setEkran('sinav');
  };

  if (ekran === 'denemeListe') return (
    <SafeAreaView style={s.container}>
      <ScrollView>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()}><Text style={s.geri}>← Geri</Text></TouchableOpacity>
          <Text style={s.baslik}>SPK Deneme Sınavları</Text>
          <View style={{ width: 50 }} />
        </View>
        <Text style={s.altBaslikHeader}>Bir deneme seçin</Text>
        {DENEMELER.map(d => (
          <TouchableOpacity key={d.id} style={[s.sinavKart, { borderLeftColor: d.renk }]} onPress={() => basla(d)}>
            <View style={s.kartSol}>
              <View style={[s.numBadge, { backgroundColor: d.renk }]}><Text style={s.numText}>{d.id}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={[s.sinavNo, { color: d.renk }]}>{d.baslik}</Text>
                <Text style={s.sinavKonu} numberOfLines={2}>{d.konu}</Text>
                <Text style={s.sinavSoru}>25 soru</Text>
              </View>
            </View>
            <Text style={[s.okIcon, { color: d.renk }]}>›</Text>
          </TouchableOpacity>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );

  if (ekran === 'sonuc') {
    const bos = aktifSorular.length - dogru - yanlis;
    const net = (dogru - yanlis * 0.25).toFixed(2);
    return (
      <SafeAreaView style={s.container}>
        <ScrollView contentContainerStyle={s.sonucContainer}>
          <Text style={s.sonucEmoji}>{Number(net) >= 17 ? '🏆' : Number(net) >= 12 ? '👍' : '📚'}</Text>
          <Text style={s.sonucBaslik}>Sınav Bitti!</Text>
          <Text style={s.sonucDenemeAdi}>{secilenDeneme?.baslik} • {secilenDeneme?.konu}</Text>
          <View style={s.sonucKart}>
            <Text style={[s.netPuan, { color: renk }]}>{net}</Text>
            <Text style={s.netLabel}>Net Puan</Text>
          </View>
          <View style={s.sonucDetay}>
            <View style={s.sonucItem}><Text style={s.sonucDogru}>{dogru}</Text><Text style={s.sonucLabel}>Doğru</Text></View>
            <View style={s.ayirac} />
            <View style={s.sonucItem}><Text style={s.sonucYanlis}>{yanlis}</Text><Text style={s.sonucLabel}>Yanlış</Text></View>
            <View style={s.ayirac} />
            <View style={s.sonucItem}><Text style={s.sonucBos}>{bos}</Text><Text style={s.sonucLabel}>Boş</Text></View>
          </View>
          <TouchableOpacity style={[s.tekrarBtn, { backgroundColor: renk }]} onPress={tekrar}>
            <Text style={s.tekrarBtnText}>🔄 Tekrar Çöz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.geriBtn2} onPress={() => setEkran('denemeListe')}>
            <Text style={s.geriBtnText}>← Sınav Listesine Dön</Text>
          </TouchableOpacity>
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container}>
      <View style={s.soruHeader}>
        <TouchableOpacity onPress={() => setEkran('denemeListe')}><Text style={s.geri}>← Çık</Text></TouchableOpacity>
        <View style={s.soruHeaderOrta}>
          <Text style={s.soruNo}>{soruIndex + 1} / {aktifSorular.length}</Text>
          <Text style={s.soruDenemeAdi}>{secilenDeneme?.baslik}</Text>
        </View>
        <View style={s.skorBox}>
          <Text style={[s.skorText, { color: '#27AE60' }]}>✓{dogru}</Text>
          <Text style={[s.skorText, { color: '#E74C3C' }]}> ✗{yanlis}</Text>
        </View>
      </View>
      <View style={s.progressBar}>
        <View style={[s.progressFill, { width: `${((soruIndex + 1) / aktifSorular.length) * 100}%` as any, backgroundColor: renk }]} />
      </View>
      <ScrollView style={s.soruScroll}>
        <Text style={s.soruMetin}>{soru.metin}</Text>
        {soru.secenekler.map((opt, i) => {
          let bg = '#1A2635', border = '#2A3F55', harf = '#8899AA', metin = '#ccc';
          if (cevapVerildi) {
            if (opt === soru.dogruCevap) { bg = '#1a3d2b'; border = '#27AE60'; harf = '#27AE60'; metin = '#fff'; }
            else if (opt === secilen) { bg = '#3d1a1a'; border = '#E74C3C'; harf = '#E74C3C'; metin = '#fff'; }
          } else if (secilen === opt) { bg = renk + '33'; border = renk; harf = renk; metin = '#fff'; }
          return (
            <TouchableOpacity key={i} style={[s.secenek, { backgroundColor: bg, borderColor: border }]}
              onPress={() => cevapla(opt)} activeOpacity={cevapVerildi ? 1 : 0.7} disabled={cevapVerildi}>
              <Text style={[s.secenekHarf, { color: harf }]}>{['A','B','C','D','E'][i]})</Text>
              <Text style={[s.secenekText, { color: metin }]}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
        {cevapVerildi && (
          <View style={[s.aciklamaBox, { borderColor: secilen === soru.dogruCevap ? '#27AE60' : '#E74C3C', backgroundColor: secilen === soru.dogruCevap ? '#1a3d2b' : '#3d1a1a' }]}>
            <Text style={[s.aciklamaSonuc, { color: secilen === soru.dogruCevap ? '#27AE60' : '#E74C3C' }]}>
              {secilen === soru.dogruCevap ? '✓ Doğru!' : `✗ Yanlış! Doğru: ${soru.dogruCevap}`}
            </Text>
            <Text style={s.aciklamaText}>💡 {soru.aciklama}</Text>
          </View>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
      <View style={s.altBtn}>
        {!cevapVerildi ? (
          <TouchableOpacity style={[s.sonrakiBtn, { backgroundColor: secilen === null ? '#2A3F55' : renk }]}
            onPress={() => secilen && setCevapVerildi(true)} disabled={secilen === null}>
            <Text style={s.sonrakiBtnText}>Cevapla</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[s.sonrakiBtn, { backgroundColor: renk }]} onPress={sonraki}>
            <Text style={s.sonrakiBtnText}>{soruIndex + 1 >= aktifSorular.length ? 'Sonuçları Gör 🏁' : 'Sonraki →'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1923' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 20 },
  geri: { color: '#4A90D9', fontSize: 16 },
  baslik: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  altBaslikHeader: { color: '#8899AA', fontSize: 13, textAlign: 'center', marginBottom: 16, marginTop: 4 },
  sinavKart: { marginHorizontal: 12, marginBottom: 10, backgroundColor: '#1A2635', borderRadius: 14, padding: 16, borderLeftWidth: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  kartSol: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  numBadge: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  numText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  sinavNo: { fontSize: 15, fontWeight: 'bold' },
  sinavKonu: { color: '#8899AA', fontSize: 12, marginTop: 2 },
  sinavSoru: { color: '#555', fontSize: 11, marginTop: 2 },
  okIcon: { fontSize: 28, fontWeight: 'bold' },
  soruHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 20 },
  soruHeaderOrta: { alignItems: 'center' },
  soruNo: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  soruDenemeAdi: { color: '#8899AA', fontSize: 11, marginTop: 2 },
  skorBox: { flexDirection: 'row' },
  skorText: { fontSize: 13, fontWeight: 'bold' },
  progressBar: { height: 4, backgroundColor: '#1A2635', marginHorizontal: 16, borderRadius: 2 },
  progressFill: { height: 4, borderRadius: 2 },
  soruScroll: { flex: 1, padding: 16 },
  soruMetin: { color: '#fff', fontSize: 15, lineHeight: 24, marginBottom: 20 },
  secenek: { flexDirection: 'row', borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, alignItems: 'flex-start' },
  secenekHarf: { fontSize: 14, fontWeight: 'bold', marginRight: 10, width: 20 },
  secenekText: { fontSize: 14, flex: 1, lineHeight: 20 },
  aciklamaBox: { borderWidth: 1.5, borderRadius: 12, padding: 14, marginTop: 8, marginBottom: 4 },
  aciklamaSonuc: { fontSize: 14, fontWeight: 'bold', lineHeight: 20, marginBottom: 8 },
  aciklamaText: { color: '#ddd', fontSize: 13, lineHeight: 20 },
  altBtn: { padding: 16, paddingBottom: 24 },
  sonrakiBtn: { borderRadius: 12, padding: 16, alignItems: 'center' },
  sonrakiBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  sonucContainer: { alignItems: 'center', padding: 20, paddingTop: 40 },
  sonucEmoji: { fontSize: 64, marginBottom: 12 },
  sonucBaslik: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginBottom: 6 },
  sonucDenemeAdi: { color: '#8899AA', fontSize: 13, marginBottom: 20, textAlign: 'center' },
  sonucKart: { backgroundColor: '#1A2635', borderRadius: 16, padding: 24, alignItems: 'center', width: '100%', marginBottom: 16 },
  netPuan: { fontSize: 56, fontWeight: 'bold' },
  netLabel: { color: '#8899AA', fontSize: 14, marginTop: 4 },
  sonucDetay: { flexDirection: 'row', backgroundColor: '#1A2635', borderRadius: 12, padding: 16, width: '100%', marginBottom: 16 },
  sonucItem: { flex: 1, alignItems: 'center' },
  sonucDogru: { color: '#27AE60', fontSize: 28, fontWeight: 'bold' },
  sonucYanlis: { color: '#E74C3C', fontSize: 28, fontWeight: 'bold' },
  sonucBos: { color: '#8899AA', fontSize: 28, fontWeight: 'bold' },
  sonucLabel: { color: '#8899AA', fontSize: 12, marginTop: 4 },
  ayirac: { width: 1, backgroundColor: '#2A3F55' },
  tekrarBtn: { borderRadius: 12, padding: 16, width: '100%', alignItems: 'center', marginTop: 8, marginBottom: 8 },
  tekrarBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  geriBtn2: { padding: 12 },
  geriBtnText: { color: '#8899AA', fontSize: 14 },
});