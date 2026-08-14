import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getNotlar, notEkleVeyaGuncelle, notSil, type Not } from '@/utils/notlarimStorage';

function formatliTarih(zaman: number) {
  return new Date(zaman).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Notlarim() {
  const [notlar, setNotlar] = useState<Not[]>([]);
  const [duzenlenenId, setDuzenlenenId] = useState<string | null>(null);
  const [formAcik, setFormAcik] = useState(false);
  const [baslik, setBaslik] = useState('');
  const [icerik, setIcerik] = useState('');

  useEffect(() => {
    getNotlar().then(setNotlar);
  }, []);

  const yeniNotBaslat = () => {
    setDuzenlenenId(null);
    setBaslik('');
    setIcerik('');
    setFormAcik(true);
  };

  const notuDuzenle = (not: Not) => {
    setDuzenlenenId(not.id);
    setBaslik(not.baslik);
    setIcerik(not.icerik);
    setFormAcik(true);
  };

  const formuKapat = () => {
    setFormAcik(false);
    setDuzenlenenId(null);
    setBaslik('');
    setIcerik('');
  };

  const kaydet = async () => {
    const temizBaslik = baslik.trim();
    const temizIcerik = icerik.trim();
    if (!temizBaslik && !temizIcerik) {
      formuKapat();
      return;
    }
    const not: Not = {
      id: duzenlenenId ?? `${Date.now()}`,
      baslik: temizBaslik || 'Başlıksız Not',
      icerik: temizIcerik,
      guncellemeTarihi: Date.now(),
    };
    const guncelListe = await notEkleVeyaGuncelle(not);
    setNotlar([...guncelListe]);
    formuKapat();
  };

  const sil = (id: string) => {
    const notluSil = async () => {
      const guncelListe = await notSil(id);
      setNotlar([...guncelListe]);
      if (duzenlenenId === id) formuKapat();
    };
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.confirm('Bu notu silmek istediğine emin misin?')) {
        notluSil();
      }
      return;
    }
    Alert.alert('Notu Sil', 'Bu notu silmek istediğine emin misin?', [
      { text: 'Vazgeç', style: 'cancel' },
      { text: 'Sil', style: 'destructive', onPress: notluSil },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.baslik}>📒 Notlarım</Text>
      <TouchableOpacity onPress={() => router.back()} style={styles.geriDon} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.geriDonText}>← Geri</Text>
      </TouchableOpacity>
      <Text style={styles.altBaslik}>Kendi notlarını yaz ve sakla</Text>

      {!formAcik && (
        <TouchableOpacity style={styles.yeniBtn} onPress={yeniNotBaslat}>
          <Text style={styles.yeniBtnText}>+ Yeni Not</Text>
        </TouchableOpacity>
      )}

      {formAcik && (
        <View style={styles.formKutu}>
          <Text style={styles.formLabel}>Başlık</Text>
          <TextInput
            style={styles.inputBaslik}
            value={baslik}
            onChangeText={setBaslik}
            placeholder="Not başlığı"
            placeholderTextColor="#556677"
          />
          <Text style={styles.formLabel}>İçerik</Text>
          <TextInput
            style={styles.inputIcerik}
            value={icerik}
            onChangeText={setIcerik}
            placeholder="Notunu buraya yaz..."
            placeholderTextColor="#556677"
            multiline
            textAlignVertical="top"
          />
          <View style={styles.formBtnRow}>
            <TouchableOpacity style={[styles.kucukBtn, { backgroundColor: '#3498DB' }]} onPress={kaydet}>
              <Text style={styles.kucukBtnText}>Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.kucukBtn, { backgroundColor: '#2A3F55' }]} onPress={formuKapat}>
              <Text style={styles.kucukBtnText}>Vazgeç</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {notlar.length === 0 && !formAcik && (
        <Text style={styles.bosMetin}>Henüz not eklemedin. "Yeni Not" ile başla.</Text>
      )}

      <View style={styles.liste}>
        {notlar.map((not) => (
          <TouchableOpacity key={not.id} style={styles.notKart} onPress={() => notuDuzenle(not)} activeOpacity={0.8}>
            <View style={styles.notKartUst}>
              <Text style={styles.notBaslik} numberOfLines={1}>{not.baslik}</Text>
              <TouchableOpacity onPress={() => sil(not.id)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Text style={styles.silBtn}>🗑️</Text>
              </TouchableOpacity>
            </View>
            {!!not.icerik && (
              <Text style={styles.notIcerik} numberOfLines={3}>{not.icerik}</Text>
            )}
            <Text style={styles.notTarih}>{formatliTarih(not.guncellemeTarihi)}</Text>
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
  altBaslik: { fontSize: 14, color: '#8899AA', marginBottom: 20, textAlign: 'center' },
  yeniBtn: { backgroundColor: '#3498DB', borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginBottom: 18 },
  yeniBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  formKutu: { backgroundColor: '#1A2635', borderRadius: 16, padding: 16, marginBottom: 20 },
  formLabel: { color: '#8899AA', fontSize: 13, marginBottom: 6, marginTop: 4 },
  inputBaslik: { backgroundColor: '#0F1923', borderRadius: 10, borderWidth: 1, borderColor: '#2A3F55', color: '#fff', padding: 12, fontSize: 15, marginBottom: 4 },
  inputIcerik: { backgroundColor: '#0F1923', borderRadius: 10, borderWidth: 1, borderColor: '#2A3F55', color: '#fff', padding: 12, fontSize: 14, minHeight: 140, marginBottom: 4 },
  formBtnRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  kucukBtn: { flex: 1, borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  kucukBtnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  bosMetin: { color: '#556677', fontSize: 14, textAlign: 'center', marginTop: 30 },
  liste: { gap: 12 },
  notKart: { backgroundColor: '#1A2635', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#2A3F55' },
  notKartUst: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  notBaslik: { color: '#fff', fontSize: 16, fontWeight: '700', flex: 1, marginRight: 10 },
  silBtn: { fontSize: 16 },
  notIcerik: { color: '#ccc', fontSize: 13, lineHeight: 19, marginBottom: 8 },
  notTarih: { color: '#556677', fontSize: 11 },
});
