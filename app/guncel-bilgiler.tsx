import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GuncelBilgi, guncelBilgilerData } from '../constants/guncelBilgilerData';
import { FAVORI_KEY, getIdSet, OKUNAN_KEY } from '../utils/guncelBilgilerStorage';

const RENK = '#C0392B';
const BG = '#0F1923';
const KART_BG = '#1A2635';

type Filtre = 'tumu' | 'okunmadi' | 'okundu';

export default function GuncelBilgilerScreen() {
  const [okunanIds, setOkunanIds] = useState<Set<string>>(new Set());
  const [favoriIds, setFavoriIds] = useState<Set<string>>(new Set());
  const [filtre, setFiltre] = useState<Filtre>('tumu');
  const [aramaAcik, setAramaAcik] = useState(false);
  const [arama, setArama] = useState('');
  const [sadeceFavoriler, setSadeceFavoriler] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setOkunanIds(await getIdSet(OKUNAN_KEY));
        setFavoriIds(await getIdSet(FAVORI_KEY));
      })();
    }, [])
  );

  const tumVeri = useMemo(() => guncelBilgilerData.filter((b) => b.aktif), []);
  const toplam = guncelBilgilerData.length;
  const okunanSayisi = useMemo(
    () => guncelBilgilerData.filter((b) => okunanIds.has(b.id)).length,
    [okunanIds]
  );
  const yuzde = toplam > 0 ? Math.round((okunanSayisi / toplam) * 100) : 0;

  const filtreliVeri = useMemo(() => {
    let liste = tumVeri;
    if (filtre === 'okunmadi') liste = liste.filter((b) => !okunanIds.has(b.id));
    else if (filtre === 'okundu') liste = liste.filter((b) => okunanIds.has(b.id));
    if (sadeceFavoriler) liste = liste.filter((b) => favoriIds.has(b.id));
    const q = arama.trim().toLocaleLowerCase('tr');
    if (q) {
      liste = liste.filter(
        (b) =>
          b.on_yuz.toLocaleLowerCase('tr').includes(q) ||
          b.arka_yuz.toLocaleLowerCase('tr').includes(q)
      );
    }
    return liste;
  }, [tumVeri, filtre, okunanIds, favoriIds, sadeceFavoriler, arama]);

  const kartaGit = (id: string) => {
    router.push({ pathname: '/guncel-bilgi-detay', params: { id } });
  };

  const renderItem = ({ item }: { item: GuncelBilgi }) => (
    <TouchableOpacity style={styles.kart} activeOpacity={0.8} onPress={() => kartaGit(item.id)}>
      <Text style={styles.kartMetin} numberOfLines={2}>
        {item.on_yuz}
      </Text>
      <Text style={styles.simsek}>⚡</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerUst}>
          <View style={styles.headerBtnSpacer} />
          <Text style={styles.headerBaslik}>KPSS Güncel Bilgiler</Text>
          <View style={styles.headerSag}>
            <TouchableOpacity onPress={() => setAramaAcik((v) => !v)} style={styles.headerBtn} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
              <Ionicons name="search-outline" size={22} color={aramaAcik ? RENK : '#fff'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSadeceFavoriler((v) => !v)} style={styles.headerBtn} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
              <Ionicons
                name={sadeceFavoriler ? 'heart' : 'heart-outline'}
                size={22}
                color={sadeceFavoriler ? RENK : '#fff'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.back()} style={styles.geriAlt} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {aramaAcik && (
        <View style={styles.aramaKutu}>
          <Ionicons name="search-outline" size={16} color="#8899AA" />
          <TextInput
            style={styles.aramaInput}
            placeholder="Ara..."
            placeholderTextColor="#8899AA"
            value={arama}
            onChangeText={setArama}
            autoFocus
          />
          {arama.length > 0 && (
            <TouchableOpacity onPress={() => setArama('')}>
              <Ionicons name="close-circle" size={16} color="#8899AA" />
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.ilerlemeKart}>
        <View style={styles.ilerlemeUst}>
          <Text style={styles.ilerlemeEtiket}>Güncel Bilgiler</Text>
          <Text style={styles.ilerlemeYuzde}>
            %{yuzde} · {okunanSayisi}/{toplam} Okunan
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressDolu, { width: `${yuzde}%` }]} />
        </View>
      </View>

      <View style={styles.sekmeler}>
        {(
          [
            { key: 'tumu', etiket: 'Tümü' },
            { key: 'okunmadi', etiket: 'Okunmadı' },
            { key: 'okundu', etiket: 'Okundu' },
          ] as { key: Filtre; etiket: string }[]
        ).map((s) => (
          <TouchableOpacity
            key={s.key}
            style={[styles.sekme, filtre === s.key && styles.sekmeAktif]}
            onPress={() => setFiltre(s.key)}
          >
            <Text style={[styles.sekmeMetin, filtre === s.key && styles.sekmeMetinAktif]}>
              {s.etiket}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtreliVeri}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.liste}
        ListEmptyComponent={
          <Text style={styles.bosMetin}>Bu filtreye uyan bir madde bulunamadı.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  header: {
    paddingTop: 56,
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  headerUst: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBtn: { padding: 8 },
  headerBtnSpacer: { width: 38 },
  headerBaslik: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#fff' },
  headerSag: { flexDirection: 'row' },
  geriAlt: { alignSelf: 'flex-start', marginTop: 6, marginLeft: -8, padding: 8 },
  aramaKutu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: KART_BG,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  aramaInput: { flex: 1, color: '#fff', fontSize: 14 },
  ilerlemeKart: {
    backgroundColor: KART_BG,
    borderRadius: 14,
    marginHorizontal: 16,
    padding: 14,
    marginBottom: 12,
  },
  ilerlemeUst: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  ilerlemeEtiket: { color: '#fff', fontSize: 14, fontWeight: '700' },
  ilerlemeYuzde: { color: RENK, fontSize: 13, fontWeight: '700' },
  progressTrack: { height: 8, borderRadius: 4, backgroundColor: '#2A3645', overflow: 'hidden' },
  progressDolu: { height: 8, borderRadius: 4, backgroundColor: RENK },
  sekmeler: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 12 },
  sekme: { flex: 1, paddingVertical: 8, borderRadius: 20, backgroundColor: KART_BG, alignItems: 'center' },
  sekmeAktif: { backgroundColor: RENK },
  sekmeMetin: { color: '#8899AA', fontSize: 13, fontWeight: '600' },
  sekmeMetinAktif: { color: '#fff' },
  liste: { paddingHorizontal: 16, paddingBottom: 40 },
  kart: {
    backgroundColor: KART_BG,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  kartMetin: { flex: 1, color: '#fff', fontSize: 15, fontWeight: '600', lineHeight: 21 },
  simsek: { fontSize: 18 },
  bosMetin: { color: '#8899AA', fontSize: 14, textAlign: 'center', marginTop: 40 },
});
