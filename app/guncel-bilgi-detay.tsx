import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { guncelBilgilerData } from '../constants/guncelBilgilerData';
import { getIdSet, OKUNAN_KEY, toggleId } from '../utils/guncelBilgilerStorage';

const RENK = '#C0392B';
const BG = '#0F1923';
const KART_BG = '#1A2635';

const AKTIF_VERI = guncelBilgilerData.filter((b) => b.aktif);

export default function GuncelBilgiDetayScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [okunanIds, setOkunanIds] = useState<Set<string>>(new Set());

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setOkunanIds(await getIdSet(OKUNAN_KEY));
      })();
    }, [])
  );

  const index = useMemo(() => AKTIF_VERI.findIndex((b) => b.id === id), [id]);
  const madde = index >= 0 ? AKTIF_VERI[index] : undefined;

  if (!madde) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.bosMetin}>Madde bulunamadı.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.geriBtn}>
          <Text style={styles.geriBtnMetin}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const okundu = okunanIds.has(madde.id);
  const oncekiVar = index > 0;
  const sonrakiVar = index < AKTIF_VERI.length - 1;

  const git = (yeniIndex: number) => {
    router.setParams({ id: AKTIF_VERI[yeniIndex].id });
  };

  const okunduToggle = async () => {
    const yeni = await toggleId(OKUNAN_KEY, madde.id, okunanIds);
    setOkunanIds(yeni);
  };

  const paylas = async () => {
    try {
      await Share.share({ message: `${madde.on_yuz}\n\n${madde.arka_yuz}` });
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerBaslik}>Bilgi Detayı</Text>
        <View style={styles.headerSag}>
          <TouchableOpacity onPress={paylas} style={styles.headerBtn}>
            <Ionicons name="share-social-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/guncel-bilgiler')} style={styles.headerBtn}>
            <Ionicons name="options-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.icerik}>
        <Text style={styles.kategori}>{madde.kategori}</Text>
        <Text style={styles.baslik}>{madde.on_yuz}</Text>
        <View style={styles.kart}>
          <Text style={styles.kartMetin}>{madde.arka_yuz}</Text>
        </View>
      </View>

      <View style={styles.altNav}>
        <TouchableOpacity
          disabled={!oncekiVar}
          onPress={() => git(index - 1)}
          style={styles.altBtn}
        >
          <Ionicons name="chevron-back" size={24} color={oncekiVar ? '#fff' : '#3A4655'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={okunduToggle} style={styles.altBtn} testID="okundu-heart-btn">
          <Ionicons name={okundu ? 'heart' : 'heart-outline'} size={26} color={okundu ? RENK : '#fff'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={paylas} style={styles.altBtn}>
          <Ionicons name="share-social-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!sonrakiVar}
          onPress={() => git(index + 1)}
          style={styles.altBtn}
        >
          <Ionicons name="chevron-forward" size={24} color={sonrakiVar ? '#fff' : '#3A4655'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/guncel-bilgiler')} style={styles.altBtn}>
          <Ionicons name="grid-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  centered: { alignItems: 'center', justifyContent: 'center', gap: 16 },
  header: {
    paddingTop: 56,
    paddingHorizontal: 12,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBtn: { padding: 6 },
  headerBaslik: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#fff' },
  headerSag: { flexDirection: 'row' },
  icerik: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },
  kategori: { color: RENK, fontSize: 13, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  baslik: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, lineHeight: 28 },
  kart: {
    backgroundColor: KART_BG,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2A3645',
    padding: 22,
    minHeight: 160,
    justifyContent: 'center',
  },
  kartMetin: { color: '#e0e6ed', fontSize: 16, lineHeight: 26, textAlign: 'center' },
  altNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 18,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: '#1A2635',
  },
  altBtn: { padding: 10 },
  bosMetin: { color: '#8899AA', fontSize: 14 },
  geriBtn: { backgroundColor: RENK, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10 },
  geriBtnMetin: { color: '#fff', fontWeight: 'bold' },
});
