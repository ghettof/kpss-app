import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const NOTLAR_KEY = 'kpss_notlarim';

export type Not = {
  id: string;
  baslik: string;
  icerik: string;
  guncellemeTarihi: number;
};

const storage = {
  getItem: async (key: string) => {
    if (Platform.OS === 'web') {
      return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
    }
    return AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === 'web') {
      if (typeof localStorage !== 'undefined') localStorage.setItem(key, value);
      return;
    }
    return AsyncStorage.setItem(key, value);
  },
};

export async function getNotlar(): Promise<Not[]> {
  try {
    const saved = await storage.getItem(NOTLAR_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [];
}

async function kaydetNotlar(notlar: Not[]): Promise<void> {
  try {
    await storage.setItem(NOTLAR_KEY, JSON.stringify(notlar));
  } catch (e) {}
}

export async function notEkleVeyaGuncelle(not: Not): Promise<Not[]> {
  const notlar = await getNotlar();
  const index = notlar.findIndex((n) => n.id === not.id);
  if (index >= 0) {
    notlar[index] = not;
  } else {
    notlar.unshift(not);
  }
  await kaydetNotlar(notlar);
  return notlar;
}

export async function notSil(id: string): Promise<Not[]> {
  const notlar = (await getNotlar()).filter((n) => n.id !== id);
  await kaydetNotlar(notlar);
  return notlar;
}
