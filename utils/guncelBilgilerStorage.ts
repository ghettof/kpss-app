import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const OKUNAN_KEY = 'okunan_guncel_bilgiler';
export const FAVORI_KEY = 'favori_guncel_bilgiler';

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

export async function getIdSet(key: string): Promise<Set<string>> {
  try {
    const saved = await storage.getItem(key);
    if (saved) return new Set(JSON.parse(saved));
  } catch (e) {}
  return new Set();
}

export async function toggleId(key: string, id: string, currentSet: Set<string>): Promise<Set<string>> {
  const newSet = new Set(currentSet);
  if (newSet.has(id)) newSet.delete(id);
  else newSet.add(id);
  try {
    await storage.setItem(key, JSON.stringify([...newSet]));
  } catch (e) {}
  return newSet;
}
