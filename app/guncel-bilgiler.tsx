import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { guncelBilgilerData, GuncelBilgi } from '../constants/guncelBilgilerData';

const STORAGE_KEY = 'ogrenilen_guncel_kartlar';

const storage = {
  getItem: async (key: string) => {
    if (Platform.OS === 'web') return localStorage.getItem(key);
    return AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === 'web') { localStorage.setItem(key, value); return; }
    return AsyncStorage.setItem(key, value);
  },
};

const KATEGORILER = ['Tümü', ...Array.from(new Set(guncelBilgilerData.map(c => c.kategori))), '⭐ Öğrendiklerim'];

export default function GuncelBilgilerScreen() {
  const [index, setIndex] = useState(0);
  const [kategori, setKategori] = useState('Tümü');
  const [ogrenilenIds, setOgrenilenIds] = useState<Set<string>>(new Set());
  const [yuklendi, setYuklendi] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await storage.getItem(STORAGE_KEY);
        if (saved) setOgrenilenIds(new Set(JSON.parse(saved)));
      } catch (e) {}
      setYuklendi(true);
    };
    load();
  }, []);

  const filteredCards: GuncelBilgi[] = (() => {
    if (kategori === '⭐ Öğrendiklerim') return guncelBilgilerData.filter(c => c.aktif && ogrenilenIds.has(c.id));
    if (kategori === 'Tümü') return guncelBilgilerData.filter(c => c.aktif);
    return guncelBilgilerData.filter(c => c.aktif && c.kategori === kategori);
  })();

  const safeIndex = Math.min(index, Math.max(filteredCards.length - 1, 0));
  const card = filteredCards[safeIndex] ?? null;

  const handleKategori = (k: string) => {
    setKategori(k);
    setIndex(0);
  };

  const goPrev = () => setIndex(i => Math.max(0, i - 1));
  const goNext = () => setIndex(i => Math.min(filteredCards.length - 1, i + 1));

  const markOgrenildi = async () => {
    if (!card) return;
    const newSet = new Set(ogrenilenIds);
    newSet.add(card.id);
    setOgrenilenIds(newSet);
    try { await storage.setItem(STORAGE_KEY, JSON.stringify([...newSet])); } catch (e) {}
    if (safeIndex < filteredCards.length - 1) setIndex(safeIndex + 1);
  };

  const unmarkOgrenildi = async () => {
    if (!card) return;
    const newSet = new Set(ogrenilenIds);
    newSet.delete(card.id);
    setOgrenilenIds(newSet);
    try { await storage.setItem(STORAGE_KEY, JSON.stringify([...newSet])); } catch (e) {}
  };

  const isOgrenildi = card ? ogrenilenIds.has(card.id) : false;

  if (!yuklendi) return (
    <View style={s.centered}>
      <Text style={{ color: '#fff' }}>Yükleniyor...</Text>
    </View>
  );

  return (
    <View style={s.container}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.geri}>← Geri</Text>
        </TouchableOpacity>
        <Text style={s.title}>📰 Güncel Bilgiler</Text>
        <Text style={s.progress}>
          {filteredCards.length > 0 ? `${safeIndex + 1} / ${filteredCards.length}` : '0 / 0'}
        </Text>
      </View>

      {/* Öğrenilen banner */}
      <View style={s.bannerRow}>
        <View style={s.banner}>
          <Text style={s.bannerTxt}>⭐ {ogrenilenIds.size} / {guncelBilgilerData.length} öğrenildi</Text>
        </View>
        {/* Progress bar */}
        <View style={s.progBarBg}>
          <View style={[s.progBarFill, { width: `${guncelBilgilerData.length > 0 ? (ogrenilenIds.size / guncelBilgilerData.length) * 100 : 0}%` as any }]} />
        </View>
      </View>

      {/* Kategori filtreleri */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.tagScroll} contentContainerStyle={s.tagRow}>
        {KATEGORILER.map(k => (
          <TouchableOpacity key={k} style={[s.tag, kategori === k && s.tagActive]} onPress={() => handleKategori(k)}>
            <Text style={[s.tagTxt, kategori === k && s.tagTxtActive]}>{k}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Kart alanı */}
      {filteredCards.length === 0 ? (
        <View style={s.centered}>
          <Text style={{ fontSize: 48, marginBottom: 16 }}>
            {kategori === '⭐ Öğrendiklerim' ? '📚' : '😕'}
          </Text>
          <Text style={s.emptyTxt}>
            {kategori === '⭐ Öğrendiklerim'
              ? 'Henüz öğrendiğin kart yok.\nKartları çalışmaya başla!'
              : 'Bu kategoride kart bulunamadı.'}
          </Text>
        </View>
      ) : (
        <View style={s.cardArea}>
          <View style={[s.card, isOgrenildi && s.cardOgrenildi]}>
            {/* Üst kısım: kategori + öğrenildi rozeti */}
            <View style={s.cardTop}>
              <View style={s.badge}>
                <Text style={s.badgeTxt}>{card!.kategori}</Text>
              </View>
              <View style={[s.zorlukBadge, { backgroundColor: card!.zorluk === 'kolay' ? '#1E5E3B' : card!.zorluk === 'orta' ? '#5E4B1E' : '#5E1E1E' }]}>
                <Text style={s.zorlukTxt}>{card!.zorluk}</Text>
              </View>
              {isOgrenildi && (
                <View style={s.ogrenildiChip}>
                  <Text style={s.ogrenildiChipTxt}>✓ Öğrenildi</Text>
                </View>
              )}
            </View>

            {/* Başlık (on_yuz) */}
            <View style={s.onYuzBox}>
              <Text style={s.onYuz}>{card!.on_yuz}</Text>
            </View>

            {/* Ayraç */}
            <View style={s.divider} />

            {/* Açıklama (arka_yuz) */}
            <ScrollView style={s.arkaYuzScroll} showsVerticalScrollIndicator={false}>
              <Text style={s.arkaYuz}>{card!.arka_yuz}</Text>
            </ScrollView>
          </View>
        </View>
      )}

      {/* Navigasyon butonları */}
      {filteredCards.length > 0 && (
        <View style={s.navRow}>
          <TouchableOpacity
            style={[s.navBtn, safeIndex === 0 && s.navBtnDisabled]}
            onPress={goPrev}
            disabled={safeIndex === 0}
          >
            <Text style={[s.navBtnTxt, safeIndex === 0 && s.navBtnTxtDisabled]}>‹</Text>
          </TouchableOpacity>

          {isOgrenildi ? (
            <TouchableOpacity style={s.unmarkBtn} onPress={unmarkOgrenildi}>
              <Text style={s.unmarkBtnTxt}>✓ Öğrenildi</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={s.ogrendinBtn} onPress={markOgrenildi}>
              <Text style={s.ogrendinBtnTxt}>✓ Öğrendim</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[s.navBtn, safeIndex === filteredCards.length - 1 && s.navBtnDisabled]}
            onPress={goNext}
            disabled={safeIndex === filteredCards.length - 1}
          >
            <Text style={[s.navBtnTxt, safeIndex === filteredCards.length - 1 && s.navBtnTxtDisabled]}>›</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1923' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  emptyTxt: { color: '#8899AA', fontSize: 15, textAlign: 'center', lineHeight: 24 },

  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  geri: { color: '#E74C3C', fontSize: 16, fontWeight: 'bold', minWidth: 60 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  progress: { color: '#C0392B', fontSize: 15, fontWeight: 'bold', minWidth: 60, textAlign: 'right' },

  bannerRow: { paddingHorizontal: 16, marginBottom: 6, gap: 6 },
  banner: { backgroundColor: '#1A2635', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 14, alignSelf: 'flex-start' },
  bannerTxt: { color: '#FFD700', fontSize: 12, fontWeight: 'bold' },
  progBarBg: { height: 4, backgroundColor: '#1A2635', borderRadius: 4, marginHorizontal: 0 },
  progBarFill: { height: 4, backgroundColor: '#27AE60', borderRadius: 4 },

  tagScroll: { maxHeight: 48, flexGrow: 0 },
  tagRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, alignItems: 'center', paddingVertical: 6 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#1A2635' },
  tagActive: { backgroundColor: '#C0392B' },
  tagTxt: { color: '#8899AA', fontSize: 12 },
  tagTxtActive: { color: '#fff', fontWeight: 'bold' },

  cardArea: { flex: 1, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  card: {
    flex: 1,
    backgroundColor: '#1A2635',
    borderRadius: 24,
    padding: 22,
    borderWidth: 2,
    borderColor: '#2A3645',
  },
  cardOgrenildi: {
    borderColor: '#27AE60',
    backgroundColor: '#152820',
  },

  cardTop: { flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' },
  badge: { backgroundColor: '#C0392B', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 3 },
  badgeTxt: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  zorlukBadge: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 3 },
  zorlukTxt: { color: '#fff', fontSize: 11 },
  ogrenildiChip: { backgroundColor: '#27AE60', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 3 },
  ogrenildiChipTxt: { color: '#fff', fontSize: 11, fontWeight: 'bold' },

  onYuzBox: { marginBottom: 14 },
  onYuz: { fontSize: 18, fontWeight: 'bold', color: '#fff', lineHeight: 26 },

  divider: { height: 1, backgroundColor: '#2A3645', marginBottom: 14 },

  arkaYuzScroll: { flex: 1 },
  arkaYuz: { fontSize: 15, color: '#C8D8E8', lineHeight: 24 },

  navRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingBottom: 24, paddingTop: 8 },
  navBtn: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#1A2635', alignItems: 'center', justifyContent: 'center' },
  navBtnDisabled: { opacity: 0.3 },
  navBtnTxt: { color: '#fff', fontSize: 28, fontWeight: 'bold', lineHeight: 32 },
  navBtnTxtDisabled: { color: '#8899AA' },

  ogrendinBtn: { flex: 1, backgroundColor: '#27AE60', borderRadius: 16, paddingVertical: 14, alignItems: 'center' },
  ogrendinBtnTxt: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  unmarkBtn: { flex: 1, backgroundColor: '#1E5E3B', borderRadius: 16, paddingVertical: 14, alignItems: 'center', borderWidth: 2, borderColor: '#27AE60' },
  unmarkBtnTxt: { color: '#27AE60', fontSize: 16, fontWeight: 'bold' },
});
