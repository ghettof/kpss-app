import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

export interface SoruSonuc {
  soruId: number;
  dogru: boolean;
  ders: string;
  yil: number;
  tarih: string;
}

export interface Progress {
  sonuclar: SoruSonuc[];
}

const STORAGE_KEY = 'kpss_progress';

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({ sonuclar: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setProgress(JSON.parse(data));
      }
    } catch (e) {
      console.error('Progress yüklenemedi:', e);
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (newProgress: Progress) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (e) {
      console.error('Progress kaydedilemedi:', e);
    }
  };

  const cevapKaydet = useCallback(async (
    soruId: number,
    dogru: boolean,
    ders: string,
    yil: number
  ) => {
    const yeniSonuc: SoruSonuc = {
      soruId,
      dogru,
      ders,
      yil,
      tarih: new Date().toISOString(),
    };

    setProgress(prev => {
      // Aynı soruyu güncelle
      const filtered = prev.sonuclar.filter(s => s.soruId !== soruId);
      const yeni = { sonuclar: [...filtered, yeniSonuc] };
      saveProgress(yeni);
      return yeni;
    });
  }, []);

  const yanlisSorular = useCallback((ders?: string) => {
    return progress.sonuclar.filter(s =>
      !s.dogru && (ders ? s.ders === ders : true)
    );
  }, [progress]);

  const dogruSayisi = useCallback((ders?: string) => {
    return progress.sonuclar.filter(s =>
      s.dogru && (ders ? s.ders === ders : true)
    ).length;
  }, [progress]);

  const yanlisSayisi = useCallback((ders?: string) => {
    return progress.sonuclar.filter(s =>
      !s.dogru && (ders ? s.ders === ders : true)
    ).length;
  }, [progress]);

  const progressSifirla = async () => {
    const bos = { sonuclar: [] };
    setProgress(bos);
    await saveProgress(bos);
  };

  return {
    progress,
    loading,
    cevapKaydet,
    yanlisSorular,
    dogruSayisi,
    yanlisSayisi,
    progressSifirla,
  };
}