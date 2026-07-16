import { deneme1, deneme1Baslik, DenemeSorusu } from './deneme1';
import { deneme2, deneme2Baslik } from './deneme2';

export type { DenemeSorusu };

export const DERSLER = ['Tarih', 'Coğrafya', 'Vatandaşlık', 'Türkçe', 'Güncel Bilgiler'] as const;

export type Ders = (typeof DERSLER)[number];

export interface DenemeSinavi {
  id: number;
  ders: Ders;
  baslik: string;
  soruSayisi: number;
  sorular: DenemeSorusu[];
}

export const DENEME_LISTESI: DenemeSinavi[] = [
  { id: 1, ders: 'Tarih', baslik: deneme1Baslik, soruSayisi: deneme1.length, sorular: deneme1 },
  { id: 2, ders: 'Tarih', baslik: deneme2Baslik, soruSayisi: 20, sorular: deneme2 },
];
