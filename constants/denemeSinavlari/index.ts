import { deneme1, deneme1Baslik, DenemeSorusu } from './deneme1';

export type { DenemeSorusu };

export interface DenemeSinavi {
  id: number;
  baslik: string;
  soruSayisi: number;
  sorular: DenemeSorusu[];
}

export const DENEME_LISTESI: DenemeSinavi[] = [
  { id: 1, baslik: deneme1Baslik, soruSayisi: deneme1.length, sorular: deneme1 },
];
