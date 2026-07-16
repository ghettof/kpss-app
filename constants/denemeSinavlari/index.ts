import { deneme1, deneme1Baslik, DenemeSorusu } from './deneme1';
import { deneme2, deneme2Baslik } from './deneme2';
import { deneme3, deneme3Baslik } from './deneme3';
import { deneme4, deneme4Baslik } from './deneme4';
import { deneme5, deneme5Baslik } from './deneme5';
import { deneme6, deneme6Baslik } from './deneme6';
import { deneme7, deneme7Baslik } from './deneme7';
import { deneme8, deneme8Baslik } from './deneme8';
import { deneme9, deneme9Baslik } from './deneme9';
import { deneme10, deneme10Baslik } from './deneme10';
import { denemeGB1, denemeGB1Baslik } from './denemeGB1';
import { denemeGB2, denemeGB2Baslik } from './denemeGB2';
import { denemeGB3, denemeGB3Baslik } from './denemeGB3';
import { denemeGB4, denemeGB4Baslik } from './denemeGB4';
import { denemeGB5, denemeGB5Baslik } from './denemeGB5';
import { denemeCog1, denemeCog1Baslik } from './denemeCog1';
import { denemeCog2, denemeCog2Baslik } from './denemeCog2';
import { denemeCog3, denemeCog3Baslik } from './denemeCog3';
import { denemeCog4, denemeCog4Baslik } from './denemeCog4';
import { denemeCog5, denemeCog5Baslik } from './denemeCog5';
import { denemeCog6, denemeCog6Baslik } from './denemeCog6';
import { denemeCog7, denemeCog7Baslik } from './denemeCog7';
import { denemeCog8, denemeCog8Baslik } from './denemeCog8';
import { denemeCog9, denemeCog9Baslik } from './denemeCog9';
import { denemeCog10, denemeCog10Baslik } from './denemeCog10';

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
  { id: 3, ders: 'Tarih', baslik: deneme3Baslik, soruSayisi: 20, sorular: deneme3 },
  { id: 4, ders: 'Tarih', baslik: deneme4Baslik, soruSayisi: 20, sorular: deneme4 },
  { id: 5, ders: 'Tarih', baslik: deneme5Baslik, soruSayisi: 20, sorular: deneme5 },
  { id: 6, ders: 'Tarih', baslik: deneme6Baslik, soruSayisi: 20, sorular: deneme6 },
  { id: 7, ders: 'Tarih', baslik: deneme7Baslik, soruSayisi: 20, sorular: deneme7 },
  { id: 8, ders: 'Tarih', baslik: deneme8Baslik, soruSayisi: 20, sorular: deneme8 },
  { id: 9, ders: 'Tarih', baslik: deneme9Baslik, soruSayisi: 20, sorular: deneme9 },
  { id: 10, ders: 'Tarih', baslik: deneme10Baslik, soruSayisi: 20, sorular: deneme10 },
  { id: 11, ders: 'Güncel Bilgiler', baslik: denemeGB1Baslik, soruSayisi: 17, sorular: denemeGB1 },
  { id: 12, ders: 'Güncel Bilgiler', baslik: denemeGB2Baslik, soruSayisi: 17, sorular: denemeGB2 },
  { id: 13, ders: 'Güncel Bilgiler', baslik: denemeGB3Baslik, soruSayisi: 16, sorular: denemeGB3 },
  { id: 14, ders: 'Güncel Bilgiler', baslik: denemeGB4Baslik, soruSayisi: 18, sorular: denemeGB4 },
  { id: 15, ders: 'Güncel Bilgiler', baslik: denemeGB5Baslik, soruSayisi: 20, sorular: denemeGB5 },
  { id: 16, ders: 'Coğrafya', baslik: denemeCog1Baslik, soruSayisi: 15, sorular: denemeCog1 },
  { id: 17, ders: 'Coğrafya', baslik: denemeCog2Baslik, soruSayisi: 15, sorular: denemeCog2 },
  { id: 18, ders: 'Coğrafya', baslik: denemeCog3Baslik, soruSayisi: 15, sorular: denemeCog3 },
  { id: 19, ders: 'Coğrafya', baslik: denemeCog4Baslik, soruSayisi: 15, sorular: denemeCog4 },
  { id: 20, ders: 'Coğrafya', baslik: denemeCog5Baslik, soruSayisi: 15, sorular: denemeCog5 },
  { id: 21, ders: 'Coğrafya', baslik: denemeCog6Baslik, soruSayisi: 15, sorular: denemeCog6 },
  { id: 22, ders: 'Coğrafya', baslik: denemeCog7Baslik, soruSayisi: 15, sorular: denemeCog7 },
  { id: 23, ders: 'Coğrafya', baslik: denemeCog8Baslik, soruSayisi: 15, sorular: denemeCog8 },
  { id: 24, ders: 'Coğrafya', baslik: denemeCog9Baslik, soruSayisi: 15, sorular: denemeCog9 },
  { id: 25, ders: 'Coğrafya', baslik: denemeCog10Baslik, soruSayisi: 15, sorular: denemeCog10 },
];
