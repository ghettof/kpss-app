import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { useProgress } from './useProgress';

export interface Rozet {
  id: string;
  emoji: string;
  baslik: string;
  aciklama: string;
  kazanildi: boolean;
  tarih?: string;
}

const TUM_ROZETLER: Omit<Rozet, 'kazanildi' | 'tarih'>[] = [
  { id: 'baslangic', emoji: '🌱', baslik: 'Başlangıç', aciklama: 'İlk soruyu çöz' },
  { id: 'atesli', emoji: '🔥', baslik: 'Ateşli', aciklama: '10 doğru cevap ver' },
  { id: 'azimli', emoji: '💪', baslik: 'Azimli', aciklama: '50 soru çöz' },
  { id: 'keskin', emoji: '🎯', baslik: 'Keskin Nişancı', aciklama: '10 soruyu üst üste doğru yap' },
  { id: 'cok_caliskan', emoji: '📚', baslik: 'Çok Çalışkan', aciklama: 'Her dersten en az 5 soru çöz' },
  { id: 'sampiyion', emoji: '🏆', baslik: 'Şampiyon', aciklama: '100 doğru cevap ver' },
  { id: 'hizli', emoji: '⚡', baslik: 'Hızlı', aciklama: 'Zamanlı modda 10 soru çöz' },
  { id: 'flashcard_usta', emoji: '🃏', baslik: 'Flashcard Ustası', aciklama: 'Flashcard modda 20 soru çöz' },
];

const ROZET_KEY = 'kpss_rozetler';
const ZAMANLI_KEY = 'kpss_zamanli_sayi';
const FLASHCARD_KEY = 'kpss_flashcard_sayi';

export function useRozetler() {
  const { progress } = useProgress();
  const [rozetler, setRozetler] = useState<Rozet[]>(
    TUM_ROZETLER.map(r => ({ ...r, kazanildi: false }))
  );
  const [yeniRozet, setYeniRozet] = useState<Rozet | null>(null);

  useEffect(() => {
    loadRozetler();
  }, []);

  const loadRozetler = async () => {
    try {
      const data = await AsyncStorage.getItem(ROZET_KEY);
      if (data) setRozetler(JSON.parse(data));
    } catch (e) {}
  };

  const saveRozetler = async (yeni: Rozet[]) => {
    await AsyncStorage.setItem(ROZET_KEY, JSON.stringify(yeni));
  };

  const rozetKazan = useCallback(async (id: string) => {
    setRozetler(prev => {
      const mevcut = prev.find(r => r.id === id);
      if (mevcut?.kazanildi) return prev;
      const guncellenmis = prev.map(r =>
        r.id === id ? { ...r, kazanildi: true, tarih: new Date().toISOString() } : r
      );
      saveRozetler(guncellenmis);
      const kazanilan = guncellenmis.find(r => r.id === id)!;
      setYeniRozet(kazanilan);
      setTimeout(() => setYeniRozet(null), 3000);
      return guncellenmis;
    });
  }, []);

  const rozetleriKontrolEt = useCallback(async () => {
    const sonuclar = progress.sonuclar;
    const toplamSoru = sonuclar.length;
    const toplamDogru = sonuclar.filter(s => s.dogru).length;

    if (toplamSoru >= 1) rozetKazan('baslangic');
    if (toplamDogru >= 10) rozetKazan('atesli');
    if (toplamSoru >= 50) rozetKazan('azimli');
    if (toplamDogru >= 100) rozetKazan('sampiyion');

    // Üst üste 10 doğru kontrolü
    const sonSorular = sonuclar.slice(-10);
    if (sonSorular.length === 10 && sonSorular.every(s => s.dogru)) {
      rozetKazan('keskin');
    }

    // Her dersten 5 soru kontrolü
    const dersler = ['Türkçe', 'Matematik', 'Tarih', 'Coğrafya', 'Vatandaşlık', 'Güncel Bilgiler'];
    const herDerste5 = dersler.every(ders =>
      sonuclar.filter(s => s.ders === ders).length >= 5
    );
    if (herDerste5) rozetKazan('cok_caliskan');

    // Zamanlı mod sayısı
    try {
      const zamanliData = await AsyncStorage.getItem(ZAMANLI_KEY);
      const zamanliSayi = zamanliData ? parseInt(zamanliData) : 0;
      if (zamanliSayi >= 10) rozetKazan('hizli');

      const flashcardData = await AsyncStorage.getItem(FLASHCARD_KEY);
      const flashcardSayi = flashcardData ? parseInt(flashcardData) : 0;
      if (flashcardSayi >= 20) rozetKazan('flashcard_usta');
    } catch (e) {}
  }, [progress, rozetKazan]);

  return { rozetler, yeniRozet, rozetleriKontrolEt };
}

export async function zamanliSayiArttir() {
  const data = await AsyncStorage.getItem('kpss_zamanli_sayi');
  const sayi = data ? parseInt(data) : 0;
  await AsyncStorage.setItem('kpss_zamanli_sayi', String(sayi + 1));
}

export async function flashcardSayiArttir() {
  const data = await AsyncStorage.getItem('kpss_flashcard_sayi');
  const sayi = data ? parseInt(data) : 0;
  await AsyncStorage.setItem('kpss_flashcard_sayi', String(sayi + 1));
}