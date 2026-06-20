import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { flashcardsData, LocalFlashcard } from '../constants/flashcardsData';

const SW = Dimensions.get('window').width;
const ST = 80;
const STORAGE_KEY = 'ogrenilen_kartlar';

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

export default function FlashcardScreen() {
  const [cards, setCards] = useState<LocalFlashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [ogrendim, setOgrendim] = useState(0);
  const [tekrar, setTekrar] = useState(0);
  const [bitti, setBitti] = useState(false);
  const [kategori, setKategori] = useState('Tumu');
  const [isFlipped, setIsFlipped] = useState(false);
  const [ogrenilenIds, setOgrenilenIds] = useState<Set<string>>(new Set());
  const [yuklendi, setYuklendi] = useState(false);
  const position = useRef(new Animated.ValueXY()).current;
  const flipAnim = useRef(new Animated.Value(0)).current;

  const kategoriler = ['Tumu', 'Tarih', 'Coğrafya', 'Güncel', 'Anayasa', 'Matematik', 'Türkçe', '⭐ Öğrendiklerim'];

  useEffect(() => {
    const loadOgrenilen = async () => {
      try {
        const saved = await storage.getItem(STORAGE_KEY);
        if (saved) setOgrenilenIds(new Set(JSON.parse(saved)));
      } catch (e) {}
      setYuklendi(true);
    };
    loadOgrenilen();
  }, []);

  useEffect(() => {
    if (yuklendi) loadCards();
  }, [kategori, yuklendi]);

  const loadCards = () => {
    setBitti(false);
    setIndex(0);
    setOgrendim(0);
    setTekrar(0);
    flipAnim.setValue(0);
    setIsFlipped(false);
    let filtered = flashcardsData.filter(c => c.aktif);
    if (kategori === '⭐ Öğrendiklerim') {
      filtered = filtered.filter(c => ogrenilenIds.has(c.id));
    } else if (kategori !== 'Tumu') {
      filtered = filtered.filter(c => c.kategori === kategori);
    }
    setCards([...filtered].sort(() => Math.random() - 0.5));
  };

  const markOgrenildi = async (cardId: string) => {
    try {
      const newSet = new Set(ogrenilenIds);
      newSet.add(cardId);
      setOgrenilenIds(newSet);
      await storage.setItem(STORAGE_KEY, JSON.stringify([...newSet]));
    } catch (e) {}
  };

  const flipCard = () => {
    Animated.spring(flipAnim, { toValue: isFlipped ? 0 : 180, friction: 8, tension: 10, useNativeDriver: true }).start();
    setIsFlipped(!isFlipped);
  };

  const front = flipAnim.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '180deg'] });
  const back = flipAnim.interpolate({ inputRange: [0, 180], outputRange: ['180deg', '360deg'] });

  const pan = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, g) => position.setValue({ x: g.dx, y: g.dy }),
    onPanResponderRelease: (_, g) => {
      if (g.dx > ST) swipe('right');
      else if (g.dx < -ST) swipe('left');
      else Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
    },
  })).current;

  const swipe = (dir: 'left' | 'right') => {
    const currentCard = cards[index];
    Animated.timing(position, {
      toValue: { x: dir === 'right' ? SW * 1.5 : -SW * 1.5, y: 0 },
      duration: 300,
      useNativeDriver: true,
    }).start(async () => {
      position.setValue({ x: 0, y: 0 });
      flipAnim.setValue(0);
      setIsFlipped(false);
      if (dir === 'right') {
        setOgrendim(p => p + 1);
        await markOgrenildi(currentCard.id);
      } else {
        setTekrar(p => p + 1);
      }
      setIndex(p => {
        if (p + 1 >= cards.length) { setBitti(true); return p; }
        return p + 1;
      });
    });
  };

  const rotate = position.x.interpolate({ inputRange: [-SW / 2, 0, SW / 2], outputRange: ['-10deg', '0deg', '10deg'], extrapolate: 'clamp' });
  const likeOp = position.x.interpolate({ inputRange: [0, ST], outputRange: [0, 1], extrapolate: 'clamp' });
  const nopeOp = position.x.interpolate({ inputRange: [-ST, 0], outputRange: [1, 0], extrapolate: 'clamp' });

  if (!yuklendi) return <View style={s.centered}><Text style={{ color: '#fff' }}>Yükleniyor...</Text></View>;

  if (cards.length === 0) return (
    <View style={s.centered}>
      <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', top: 60, left: 20 }}>
        <Text style={{ color: '#6C63FF', fontSize: 16, fontWeight: 'bold' }}>← Geri</Text>
      </TouchableOpacity>
      <Text style={s.emoji}>{kategori === '⭐ Öğrendiklerim' ? '📚' : '😕'}</Text>
      <Text style={s.sub}>{kategori === '⭐ Öğrendiklerim' ? 'Henüz öğrendiğin kart yok.\nKartları çalışmaya başla!' : 'Kart bulunamadı.'}</Text>
      <TouchableOpacity style={s.btn} onPress={loadCards}><Text style={s.btnTxt}>Yenile</Text></TouchableOpacity>
    </View>
  );

  if (bitti) return (
    <View style={s.centered}>
      <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', top: 60, left: 20 }}>
        <Text style={{ color: '#6C63FF', fontSize: 16, fontWeight: 'bold' }}>← Geri</Text>
      </TouchableOpacity>
      <Text style={s.emoji}>🎉</Text>
      <Text style={s.title}>Tebrikler!</Text>
      <View style={{ flexDirection: 'row', gap: 20, marginBottom: 24 }}>
        <View style={s.sonuc}><Text style={s.sayi}>{ogrendim}</Text><Text style={{ color: '#27AE60' }}>Öğrendim</Text></View>
        <View style={s.sonuc}><Text style={s.sayi}>{tekrar}</Text><Text style={{ color: '#E74C3C' }}>Tekrar</Text></View>
      </View>
      <View style={s.sonucBanner}>
        <Text style={{ color: '#FFD700', fontSize: 13 }}>⭐ Toplam öğrenilen: {ogrenilenIds.size} kart</Text>
      </View>
      <TouchableOpacity style={s.btn} onPress={loadCards}><Text style={s.btnTxt}>Tekrar Başla</Text></TouchableOpacity>
    </View>
  );

  const card = cards[index];

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: '#6C63FF', fontSize: 16, fontWeight: 'bold' }}>← Geri</Text>
        </TouchableOpacity>
        <Text style={s.title}>Bilgi Kartları</Text>
        <Text style={s.sub}>{index + 1} / {cards.length}</Text>
      </View>

      <View style={s.banner}>
        <Text style={s.bannerTxt}>⭐ {ogrenilenIds.size} kart öğrenildi</Text>
      </View>

      <View style={s.row}>
        {kategoriler.map(k => (
          <TouchableOpacity key={k} style={[s.tag, kategori === k && s.tagActive]} onPress={() => setKategori(k)}>
            <Text style={[s.tagTxt, kategori === k && s.tagTxtActive]}>{k}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 8 }}>
        <Text style={{ color: '#27AE60', fontWeight: 'bold' }}>✓ {ogrendim} Öğrendim</Text>
        <Text style={{ color: '#E74C3C', fontWeight: 'bold' }}>↩ {tekrar} Tekrar</Text>
      </View>

      <View style={s.cardArea}>
        <Animated.View style={[s.cardWrap, { transform: [{ translateX: position.x }, { translateY: position.y }, { rotate }] }]} {...pan.panHandlers}>
          <Animated.View style={[s.likeLabel, { opacity: likeOp }]}><Text style={{ color: '#27AE60', fontWeight: 'bold' }}>✓ BİLİYORUM</Text></Animated.View>
          <Animated.View style={[s.nopeLabel, { opacity: nopeOp }]}><Text style={{ color: '#E74C3C', fontWeight: 'bold' }}>↩ TEKRAR</Text></Animated.View>
          <TouchableOpacity onPress={flipCard} activeOpacity={1} style={{ width: '100%', height: '100%' }}>
            <Animated.View style={[s.card, s.cardF, { backfaceVisibility: 'hidden', transform: [{ rotateY: front }] }]}>
              <View style={s.badge}><Text style={s.badgeTxt}>{card.kategori}</Text></View>
              {ogrenilenIds.has(card.id) && <Text style={s.ogrenilmisBadge}>⭐ Öğrenildi</Text>}
              <Text style={s.q}>{card.on_yuz}</Text>
              <Text style={s.hint}>Cevabı görmek için dokun</Text>
            </Animated.View>
            <Animated.View style={[s.card, s.cardB, { backfaceVisibility: 'hidden', transform: [{ rotateY: back }] }]}>
              <View style={[s.badge, { backgroundColor: '#27AE60' }]}><Text style={s.badgeTxt}>Cevap</Text></View>
              <Text style={s.a}>{card.arka_yuz}</Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={{ flexDirection: 'row', gap: 16, padding: 16 }}>
        <TouchableOpacity style={[s.btn, { flex: 1, backgroundColor: '#C0392B' }]} onPress={() => swipe('left')}><Text style={s.btnTxt}>↩ Tekrar</Text></TouchableOpacity>
        <TouchableOpacity style={[s.btn, { flex: 1, backgroundColor: '#27AE60' }]} onPress={() => swipe('right')}><Text style={s.btnTxt}>✓ Öğrendim</Text></TouchableOpacity>
      </View>
      <Text style={{ textAlign: 'center', color: '#8899AA', fontSize: 12, paddingBottom: 16 }}>Sola kaydır: Tekrar  |  Sağa kaydır: Öğrendim</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1923' },
  centered: { flex: 1, backgroundColor: '#0F1923', alignItems: 'center', justifyContent: 'center', padding: 20 },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  sub: { color: '#8899AA', fontSize: 14, textAlign: 'center' },
  emoji: { fontSize: 60, marginBottom: 16 },
  sonuc: { alignItems: 'center', backgroundColor: '#1A2635', borderRadius: 16, padding: 20, minWidth: 120 },
  sonucBanner: { backgroundColor: '#1A2635', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10, marginBottom: 20 },
  sayi: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  btn: { backgroundColor: '#6C63FF', borderRadius: 16, paddingVertical: 14, paddingHorizontal: 32, alignItems: 'center' },
  btnTxt: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  banner: { marginHorizontal: 16, marginBottom: 6, backgroundColor: '#1A2635', borderRadius: 10, paddingVertical: 6, paddingHorizontal: 14, alignSelf: 'flex-start' },
  bannerTxt: { color: '#FFD700', fontSize: 12, fontWeight: 'bold' },
  row: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 8, marginBottom: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#1A2635' },
  tagActive: { backgroundColor: '#6C63FF' },
  tagTxt: { color: '#8899AA', fontSize: 12 },
  tagTxtActive: { color: '#fff', fontWeight: 'bold' },
  cardArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  cardWrap: { width: '85%', height: 320 },
  card: { position: 'absolute', width: '100%', height: '100%', borderRadius: 24, padding: 28, alignItems: 'center', justifyContent: 'center' },
  cardF: { backgroundColor: '#1A2635', borderWidth: 1, borderColor: '#2A3645' },
  cardB: { backgroundColor: '#1E3A2F', borderWidth: 1, borderColor: '#27AE60' },
  badge: { backgroundColor: '#6C63FF', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 4, marginBottom: 12 },
  badgeTxt: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  ogrenilmisBadge: { color: '#FFD700', fontSize: 11, marginBottom: 8 },
  q: { fontSize: 20, fontWeight: 'bold', color: '#fff', textAlign: 'center', lineHeight: 30 },
  a: { fontSize: 18, color: '#fff', textAlign: 'center', lineHeight: 28 },
  hint: { position: 'absolute', bottom: 20, color: '#8899AA', fontSize: 12 },
  likeLabel: { position: 'absolute', top: 20, left: 20, zIndex: 10, borderWidth: 3, borderColor: '#27AE60', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  nopeLabel: { position: 'absolute', top: 20, right: 20, zIndex: 10, borderWidth: 3, borderColor: '#E74C3C', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
});
